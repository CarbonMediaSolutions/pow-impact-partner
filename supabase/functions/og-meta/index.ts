import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SITE_URL = "https://plexapartners.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_TITLE = "Plexa Partners | From Strategy to Impact";
const DEFAULT_DESC =
  "Plexa Partners helps mission-driven businesses master financial complexity.";

function html(meta: {
  title: string;
  description: string;
  image: string;
  url: string;
}) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:image" content="${meta.image}" />
  <meta property="og:url" content="${meta.url}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description}" />
  <meta name="twitter:image" content="${meta.image}" />
  <script>window.location.replace("${meta.url}");</script>
</head>
<body>
  <p>Redirecting to <a href="${meta.url}">${meta.title}</a>...</p>
</body>
</html>`;
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const path = url.searchParams.get("path") || "";

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!
  );

  let title = DEFAULT_TITLE;
  let description = DEFAULT_DESC;
  let image = DEFAULT_OG_IMAGE;
  let canonicalUrl = SITE_URL;

  const perspMatch = path.match(/^\/perspectives\/(.+)$/);
  const analysisMatch = path.match(/^\/analysis\/(.+)$/);

  if (perspMatch) {
    const id = perspMatch[1];
    const { data } = await supabase
      .from("perspectives")
      .select("title, summary, image")
      .eq("id", id)
      .maybeSingle();
    if (data) {
      title = esc(data.title);
      description = esc(data.summary);
      if (data.image) image = data.image;
      canonicalUrl = `${SITE_URL}/perspectives/${id}`;
    }
  } else if (analysisMatch) {
    const id = analysisMatch[1];
    const { data } = await supabase
      .from("analyses")
      .select("title, summary")
      .eq("id", id)
      .maybeSingle();
    if (data) {
      title = esc(data.title);
      description = esc(data.summary);
      canonicalUrl = `${SITE_URL}/analysis/${id}`;
    }
  }

  const body = html({ title, description, image, url: canonicalUrl });

  return new Response(body, {
    headers: {
      ...corsHeaders,
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
});
