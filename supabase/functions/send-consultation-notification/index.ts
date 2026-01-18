import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ConsultationNotificationRequest {
  name: string;
  email: string;
  organisation?: string;
  role?: string;
  website_linkedin?: string;
  problem_statement: string;
  desired_outcome?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ConsultationNotificationRequest = await req.json();
    
    console.log("Sending consultation notification for:", data.name);

    // Truncate the challenge for the email preview
    const challengeExcerpt = data.problem_statement.length > 200 
      ? data.problem_statement.substring(0, 200) + "..."
      : data.problem_statement;

    const emailResponse = await resend.emails.send({
      from: "Plexa Partners <notifications@plexapartners.com>",
      to: ["paddi@plexapartners.com"],
      subject: `New Consultation Request – Review Required`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; }
            .container { max-width: 600px; margin: 0 auto; padding: 24px; }
            .header { border-bottom: 1px solid #e5e5e5; padding-bottom: 16px; margin-bottom: 24px; }
            .label { font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
            .value { font-size: 16px; margin-bottom: 20px; }
            .section { margin-bottom: 24px; }
            .footer { border-top: 1px solid #e5e5e5; padding-top: 16px; margin-top: 24px; font-size: 14px; color: #666; }
            .btn { display: inline-block; padding: 12px 24px; background: #1a1a1a; color: #fff; text-decoration: none; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 20px; font-weight: 500;">New Consultation Request</h1>
            </div>
            
            <div class="section">
              <div class="label">Applicant</div>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="section">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
            </div>
            
            ${data.organisation ? `
            <div class="section">
              <div class="label">Organisation</div>
              <div class="value">${data.organisation}</div>
            </div>
            ` : ''}
            
            ${data.role ? `
            <div class="section">
              <div class="label">Role</div>
              <div class="value">${data.role}</div>
            </div>
            ` : ''}
            
            ${data.website_linkedin ? `
            <div class="section">
              <div class="label">Website / LinkedIn</div>
              <div class="value"><a href="${data.website_linkedin.startsWith('http') ? data.website_linkedin : 'https://' + data.website_linkedin}">${data.website_linkedin}</a></div>
            </div>
            ` : ''}
            
            <div class="section">
              <div class="label">Challenge</div>
              <div class="value">${challengeExcerpt}</div>
            </div>
            
            ${data.desired_outcome ? `
            <div class="section">
              <div class="label">Desired Outcome</div>
              <div class="value">${data.desired_outcome}</div>
            </div>
            ` : ''}
            
            <div class="footer">
              <p>Review this request in the <a href="https://pow-impact-partner.lovable.app/admin">Admin Dashboard</a></p>
              <p style="font-size: 12px; color: #999;">Status: Reviewing</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-consultation-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
