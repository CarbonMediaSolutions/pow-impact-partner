import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, summary, content, type } = await req.json();

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

    // Build the content description based on type
    let contentDescription: string;
    if (type === "analysis" && typeof content === "object" && content !== null) {
      contentDescription = JSON.stringify(content);
    } else if (Array.isArray(content)) {
      contentDescription = content.join("\n\n");
    } else {
      contentDescription = String(content || "");
    }

    const systemPrompt = `You are a professional translator for a consulting firm. Your task is to translate English text into Traditional Chinese (繁體中文).

Rules:
- Use Traditional Chinese characters only (NOT Simplified Chinese)
- Maintain the professional, institutional tone appropriate for C-level executives
- Preserve all formatting structure (paragraphs, bullet points, numbered lists)
- Keep proper nouns, company names, and widely-recognised English terms as-is or transliterate appropriately
- Do not add or remove any content — translate faithfully
- Return ONLY valid JSON, no markdown code fences or extra text`;

    let userPrompt: string;

    if (type === "analysis" && typeof content === "object" && content !== null) {
      userPrompt = `Translate the following content to Traditional Chinese. Return a JSON object with this exact structure:

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
      userPrompt = `Translate the following content to Traditional Chinese. Return a JSON object with this exact structure:

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
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        max_tokens: 8192,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate translation" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    let rawContent = data.choices?.[0]?.message?.content?.trim() || "";

    // Strip markdown code fences if present
    if (rawContent.startsWith("```")) {
      rawContent = rawContent.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
    }

    let translation;
    try {
      translation = JSON.parse(rawContent);
    } catch (parseError) {
      console.error("Failed to parse AI response as JSON:", rawContent);
      return new Response(
        JSON.stringify({ error: "Translation format error. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validation: check paragraph count matches for array content
    if (Array.isArray(content) && Array.isArray(translation.content_zh)) {
      if (translation.content_zh.length !== content.length) {
        console.warn(`Translation paragraph mismatch: expected ${content.length}, got ${translation.content_zh.length}`);
      }
    }

    return new Response(
      JSON.stringify(translation),
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
