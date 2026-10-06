import { clientIp, deliver } from '@/lib/mailer';
import { labelFor, PROJECT_AREAS, PROJECT_TIMELINES, projectSchema } from '@/lib/project-schema';
import { createRateLimiter } from '@/lib/rate-limit';

const isAllowed = createRateLimiter(5, 10 * 60 * 1000);

export async function POST(request: Request) {
  if (!isAllowed(clientIp(request))) {
    return Response.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  const json: unknown = await request.json().catch(() => null);
  const parsed = projectSchema.safeParse(json);
  if (!parsed.success) {
    const error = parsed.error.issues[0]?.message ?? 'Invalid request.';
    return Response.json({ success: false, error }, { status: 400 });
  }

  const { name, company, email, area, region, timeline, description } = parsed.data;
  const text = [
    `Name: ${name}`,
    `Company: ${company || '(not given)'}`,
    `Email: ${email}`,
    `Project area: ${labelFor(PROJECT_AREAS, area)}`,
    `Target region: ${region || '(not given)'}`,
    `Timeline: ${labelFor(PROJECT_TIMELINES, timeline)}`,
    '',
    description,
  ].join('\n');

  return deliver(
    {
      replyTo: email,
      subject: `New project brief from allr-energy.com: ${company || name}`,
      text,
    },
    'Project brief',
  );
}
