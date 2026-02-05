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
     const { content } = await req.json();
     
     if (!content || content.trim().length === 0) {
       return new Response(
         JSON.stringify({ error: "Content is required" }),
         { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
     if (!LOVABLE_API_KEY) {
       throw new Error("LOVABLE_API_KEY is not configured");
     }
 
     const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
       method: "POST",
       headers: {
         Authorization: `Bearer ${LOVABLE_API_KEY}`,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         model: "google/gemini-3-flash-preview",
         messages: [
           {
             role: "system",
             content: "You are a professional editor for a consulting firm. Your task is to create concise, compelling summaries. Write in a sophisticated, professional tone appropriate for C-level executives and board members."
           },
           {
             role: "user",
             content: `Please summarize the following article content in 1-2 sentences. The summary should be compelling, professional, and capture the key insight or argument. Do not use first person. Keep it under 200 characters.\n\nContent:\n${content}`
           }
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
         JSON.stringify({ error: "Failed to generate summary" }),
         { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
       );
     }
 
     const data = await response.json();
     const summary = data.choices?.[0]?.message?.content?.trim() || "";
 
     return new Response(
       JSON.stringify({ summary }),
       { headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   } catch (error) {
     console.error("Error in summarize-perspective:", error);
     return new Response(
       JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
       { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
     );
   }
 });