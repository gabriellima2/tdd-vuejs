import * as z from 'zod';

export function getFieldError(schema: z.ZodString, value: string) {
	const validated = schema.safeParse(value);
	if (validated.success) return null;
	return validated.error.issues[0].message;
}
