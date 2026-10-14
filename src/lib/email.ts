import { Resend } from 'resend';
import { ContactLead } from '@/models/types';

function getFromEmail(): string {
  let envFrom = process.env.FROM_EMAIL?.trim();
  if (envFrom) {
    envFrom = envFrom.replace(/^["']|["']$/g, '').trim();
    if (envFrom.includes('<') && envFrom.includes('>')) {
      return envFrom;
    }
    return `Zenith Web Works <${envFrom}>`;
  }
  return 'Zenith Web Works <onboarding@resend.dev>';
}

function getRecipientEmails(): string[] {
  const envRecipients = process.env.RECIPIENT_EMAILS?.trim();
  if (envRecipients) {
    const list = envRecipients
      .split(',')
      .map((e) => e.trim())
      .filter((e) => e.length > 0 && e.includes('@'));
    if (list.length > 0) return list;
  }
  return ['dhaniramsingh711@gmail.com', 'mohitporwal596@gmail.com'];
}

function generateEmailHtml(lead: ContactLead): string {
  const submittedAt = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0b1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b1120; padding: 30px 15px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #2563eb, #7c3aed); padding: 28px 24px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                🚀 New Inquiry Received
              </h1>
              <p style="margin: 6px 0 0; color: #e0e7ff; font-size: 14px;">
                Zenith Digital &amp; IT Solutions
              </p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 28px 24px;">
              <p style="margin: 0 0 20px; font-size: 15px; color: #94a3b8; line-height: 1.5;">
                A new client has submitted an inquiry form on the Zenith website. Here are the full details:
              </p>

              <!-- Lead Info Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 10px 12px; background-color: #1e293b; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 600; color: #94a3b8; width: 35%;">
                    Client Name
                  </td>
                  <td style="padding: 10px 12px; background-color: #1e293b; border-bottom: 1px solid #334155; font-size: 14px; font-weight: 600; color: #ffffff;">
                    ${lead.fullName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #1f2937; font-size: 13px; font-weight: 600; color: #94a3b8;">
                    Email Address
                  </td>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #1f2937; font-size: 14px; color: #38bdf8;">
                    <a href="mailto:${lead.email}" style="color: #38bdf8; text-decoration: none;">${lead.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; background-color: #1e293b; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 600; color: #94a3b8;">
                    Phone Number
                  </td>
                  <td style="padding: 10px 12px; background-color: #1e293b; border-bottom: 1px solid #334155; font-size: 14px; color: #ffffff;">
                    ${lead.phoneNumber ? `<a href="tel:${lead.phoneNumber}" style="color: #38bdf8; text-decoration: none;">${lead.phoneNumber}</a>` : '<span style="color: #64748b;">Not provided</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #1f2937; font-size: 13px; font-weight: 600; color: #94a3b8;">
                    Company / Organization
                  </td>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #1f2937; font-size: 14px; color: #ffffff;">
                    ${lead.companyName || '<span style="color: #64748b;">Not specified</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; background-color: #1e293b; border-bottom: 1px solid #334155; font-size: 13px; font-weight: 600; color: #94a3b8;">
                    Service Required
                  </td>
                  <td style="padding: 10px 12px; background-color: #1e293b; border-bottom: 1px solid #334155; font-size: 14px; font-weight: 600; color: #a78bfa;">
                    ${lead.serviceRequired}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #1f2937; font-size: 13px; font-weight: 600; color: #94a3b8;">
                    Estimated Budget
                  </td>
                  <td style="padding: 10px 12px; border-bottom: 1px solid #1f2937; font-size: 14px; color: #34d399; font-weight: 600;">
                    ${lead.budgetRange || 'Flexible'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 12px; background-color: #1e293b; font-size: 13px; font-weight: 600; color: #94a3b8;">
                    Submission Time
                  </td>
                  <td style="padding: 10px 12px; background-color: #1e293b; font-size: 13px; color: #cbd5e1;">
                    ${submittedAt} (IST)
                  </td>
                </tr>
              </table>

              <!-- Project Description Box -->
              <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 10px; padding: 18px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 10px; font-size: 14px; font-weight: 600; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.5px;">
                  Project Brief &amp; Requirements:
                </h3>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #f1f5f9; white-space: pre-wrap;">${escapeHtml(lead.projectDetails)}</p>
              </div>

              <!-- Action Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${lead.email}?subject=${encodeURIComponent('Re: Your inquiry on Zenith - ' + lead.serviceRequired)}"
                       style="display: inline-block; background: linear-gradient(135deg, #2563eb, #7c3aed); color: #ffffff; text-decoration: none; font-size: 15px; font-weight: 600; padding: 12px 28px; border-radius: 8px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);">
                      ✉️ Reply to ${lead.fullName}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; border-top: 1px solid #1f2937; padding: 18px 24px; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #64748b;">
                This notification was automatically sent by Zenith IT Lead Dispatcher via Resend.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendLeadNotificationEmail(lead: ContactLead): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    console.warn('[Resend] RESEND_API_KEY is not configured in environment variables.');
    return {
      success: false,
      error: 'RESEND_API_KEY not found in environment.',
    };
  }

  const resend = new Resend(apiKey);
  const from = getFromEmail();
  const to = getRecipientEmails();
  const subject = `🚀 New Lead: ${lead.fullName} - ${lead.serviceRequired}`;
  const html = generateEmailHtml(lead);

  const textContent = `
New Inquiry Received from Zenith Website
----------------------------------------
Name: ${lead.fullName}
Email: ${lead.email}
Phone: ${lead.phoneNumber || 'Not provided'}
Company: ${lead.companyName || 'Not specified'}
Service: ${lead.serviceRequired}
Budget: ${lead.budgetRange || 'Flexible'}

Project Details:
${lead.projectDetails}
----------------------------------------
Received via Zenith Lead Dispatcher
`.trim();

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: lead.email,
      subject,
      html,
      text: textContent,
    });

    if (error) {
      console.error('[Resend] Failed to send lead notification email:', error);
      return {
        success: false,
        error: error.message || 'Resend API returned an error',
      };
    }

    console.log('[Resend] Lead notification email sent successfully:', data?.id);
    return {
      success: true,
      messageId: data?.id,
    };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('[Resend] Exception sending lead notification email:', errorMsg);
    return {
      success: false,
      error: errorMsg,
    };
  }
}
