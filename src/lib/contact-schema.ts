import { z } from 'zod';

export const MESSAGE_MAX_LENGTH = 5000;
export const NAME_MAX_LENGTH = 120;

export const contactSchema = z.object({
  name: z.string().trim().max(NAME_MAX_LENGTH, 'Please shorten your name.').optional().default(''),
  email: z.string().trim().email('Please enter a valid email address.').max(254),
  message: z
    .string()
    .trim()
    .min(1, 'Please enter a message.')
    .max(MESSAGE_MAX_LENGTH, `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`),
});

export type ContactInput = z.infer<typeof contactSchema>;
