import * as z from 'zod';

export const emailSchema = z.string().nonempty({ message: "O campo email é obrigatório" });
