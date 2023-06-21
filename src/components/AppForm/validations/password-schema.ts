import * as z from 'zod';

export const passwordSchema = z.string().nonempty({ message: "O campo senha é obrigatório" });
