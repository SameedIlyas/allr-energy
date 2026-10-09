import { z } from 'zod';
import { AI_INDUSTRIES } from '@/content/ai-industries';
import { MESSAGE_MAX_LENGTH, NAME_MAX_LENGTH } from './contact-schema';

export const DESCRIPTION_MIN_LENGTH = 20;
export const SHORT_FIELD_MAX_LENGTH = 120;

export const PROJECT_AREAS = [
  ...AI_INDUSTRIES.map((i) => ({ value: i.id, label: i.title })),
  { value: 'other', label: 'Other industry' },
] as const;

const areaValues = PROJECT_AREAS.map((a) => a.value) as [string, ...string[]];

const optionalShort = (message: string) =>
  z.string().trim().max(SHORT_FIELD_MAX_LENGTH, message).optional().default('');

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Please enter your name.')
    .max(NAME_MAX_LENGTH, 'Please shorten your name.'),
  company: optionalShort('Please shorten the company name.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  area: z.enum(areaValues, { message: 'Please choose an industry.' }),
  description: z
    .string()
    .trim()
    .min(DESCRIPTION_MIN_LENGTH, `Please describe your project in at least ${DESCRIPTION_MIN_LENGTH} characters.`)
    .max(MESSAGE_MAX_LENGTH, `Please keep your description under ${MESSAGE_MAX_LENGTH} characters.`),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export function labelFor(options: readonly { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}
