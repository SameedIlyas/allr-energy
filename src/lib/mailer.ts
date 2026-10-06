import nodemailer from 'nodemailer';
import { FALLBACK_EMAIL } from './mailer-constants';

interface MailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
  to: string;
  from: string;
}

export interface OutgoingMail {
  subject: string;
  text: string;
  replyTo: string;
}

function readMailConfig(): MailConfig | null {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return {
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    user: SMTP_USER,
    pass: SMTP_PASS,
    to: CONTACT_TO ?? FALLBACK_EMAIL,
    from: CONTACT_FROM ?? SMTP_USER,
  };
}

export function clientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

/**
 * Sends a form submission to the site inbox and maps every outcome to a JSON response,
 * so each form route only has to validate its input and format the mail.
 */
export async function deliver(mail: OutgoingMail, source: string): Promise<Response> {
  const config = readMailConfig();
  if (!config) {
    console.error(`${source}: SMTP_HOST / SMTP_USER / SMTP_PASS are not configured`);
    return Response.json(
      { success: false, error: `The form is temporarily unavailable. Please email ${FALLBACK_EMAIL}.` },
      { status: 503 },
    );
  }

  try {
    const transport = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: { user: config.user, pass: config.pass },
    });
    await transport.sendMail({ from: config.from, to: config.to, ...mail });
    return Response.json({ success: true });
  } catch (err: unknown) {
    console.error(`${source}: failed to send mail`, err);
    return Response.json(
      { success: false, error: `Your message could not be sent. Please email us at ${FALLBACK_EMAIL}.` },
      { status: 502 },
    );
  }
}
