import { contactSchema } from '@/lib/contact-schema';
import { clientIp, deliver } from '@/lib/mailer';
import { createRateLimiter } from '@/lib/rate-limit';

const isAllowed = createRateLimiter(5, 10 * 60 * 1000);

export async function POST(request: Request) {
  if (!isAllowed(clientIp(request))) {
    return Response.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const json: unknown = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? 'Invalid request.';
    return Response.json({ success: false, error }, { status: 400 });
  }

  const { name, email, message } = parsed.data;
  return deliver(
    {
      replyTo: email,
      subject: `New message from allr-energy.com contact form${name ? `: ${name}` : ''}`,
      text: `Name: ${name || '(not given)'}\nEmail: ${email}\n\n${message}`,
    },
    'Contact form',
  );
}
