import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function translateOne(
  lang: string,
  title: string,
  summary: string,
  content: unknown,
  type: string,
  apiKey: string
): Promise<{ lang: string; translation?: unknown; error?: string }> {
  const langLabel = lang === 'zh-Hant' ? 'Traditional Chinese (繁體中文)' : 'Simplified Chinese (简体中文)';
  const charRule = lang === 'zh-Hant'
    ? 'Use Traditional Chinese characters only (NOT Simplified Chinese)'
    : 'Use Simplified Chinese characters only (NOT Traditional Chinese)';

  let contentDescription: string;
  if (type === "analysis" && typeof content === "object" && content !== null) {
    contentDescription = JSON.stringify(content);
  } else if (Array.isArray(content)) {
    contentDescription = content.join("\n\n");
  } else {
    contentDescription = String(content || "");
  }

  const systemPrompt = `You are a professional translator for a consulting firm. Your task is to translate English text into ${langLabel}.

Rules:
- ${charRule}
- Maintain the professional, institutional tone appropriate for C-level executives
- Preserve all formatting structure (paragraphs, bullet points, numbered lists)
- Keep proper nouns, company names, and widely-recognised English terms as-is or transliterate appropriately
- Do not add or remove any content — translate faithfully
- Return ONLY valid JSON, no markdown code fences or extra text`;

  let userPrompt: string;

  if (type === "analysis" && typeof content === "object" && content !== null) {
    userPrompt = `Translate the following content to ${langLabel}. Return a JSON object with this exact structure:

{
  "title_zh": "translated title",
  "summary_zh": "translated summary",
  "content_zh": {
    "introduction": "translated introduction",
    "sections": [{"heading": "translated heading", "paragraphs": ["translated paragraph 1", "translated paragraph 2"]}],
    "methodology": "translated methodology",
    "keyFindings": ["translated finding 1", "translated finding 2"],
    "implications": ["translated implication 1", "translated implication 2"]
  }
}

Only include fields that exist in the source content. If a field is empty or missing, omit it from the translation.

Title: ${title}
Summary: ${summary}
Content: ${contentDescription}`;
  } else {
    const paragraphCount = Array.isArray(content) ? content.length : 1;
    userPrompt = `Translate the following content to ${langLabel}. Return a JSON object with this exact structure:

{
  "title_zh": "translated title",
  "summary_zh": "translated summary",
  "content_zh": ["translated paragraph 1", "translated paragraph 2"]
}

IMPORTANT: There are exactly ${paragraphCount} content paragraphs below. Your content_zh array MUST contain exactly ${paragraphCount} translated paragraphs. Do NOT skip, merge, or omit any paragraphs.

Title: ${title}
Summary: ${summary}
Content paragraphs:
${Array.isArray(content) ? content.map((p: string, i: number) => `${i + 1}. ${p}`).join("\n") : contentDescription}`;
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      max_tokens: 8192,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`AI gateway error for ${lang}:`, response.status, errorText);
    return { lang, error: response.status === 429 ? "Rate limit exceeded" : response.status === 402 ? "AI credits exhausted" : "Failed to generate translation" };
  }

  const data = await response.json();
  let rawContent = data.choices?.[0]?.message?.content?.trim() || "";

  if (rawContent.startsWith("```")) {
    rawContent = rawContent.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
  }

  try {
    const translation = JSON.parse(rawContent);
    if (Array.isArray(content) && Array.isArray(translation.content_zh)) {
      if (translation.content_zh.length !== content.length) {
        console.warn(`${lang} paragraph mismatch: expected ${content.length}, got ${translation.content_zh.length}`);
      }
    }
    return { lang, translation };
  } catch (parseError) {
    console.error(`Failed to parse ${lang} response:`, rawContent);
    return { lang, error: "Translation format error" };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, summary, content, type, targetLang } = await req.json();

    if (!title || !summary) {
      return new Response(
        JSON.stringify({ error: "Title and summary are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const targets = targetLang ? [targetLang] : ['zh-Hant', 'zh-Hans'];

    // Run all translations in PARALLEL
    const promises = targets.map(lang => translateOne(lang, title, summary, content, type, LOVABLE_API_KEY));
    const outcomes = await Promise.all(promises);

    const results: Record<string, unknown> = {};
    for (const outcome of outcomes) {
      if (outcome.error) {
        console.error(`Translation failed for ${outcome.lang}: ${outcome.error}`);
        // Continue with other translations rather than failing entirely
      } else {
        results[outcome.lang] = outcome.translation;
      }
    }

    if (Object.keys(results).length === 0) {
      return new Response(
        JSON.stringify({ error: "All translations failed" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const responseBody = targets.length === 1 ? results[targets[0]] : results;

    return new Response(
      JSON.stringify(responseBody),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in translate-content:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
