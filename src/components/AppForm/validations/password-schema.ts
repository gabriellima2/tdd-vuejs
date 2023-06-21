import * as z from 'zod';

export const passwordSchema = z
	.string()
	.trim()
	.nonempty({ message: "O campo senha é obrigatório" })
	.min(8, { message: "Inválido! A senha deve ter no minímo 8 caracteres" })
	.max(50, { message: "Inválido! A senha ultrapassou o limite de 50 caracteres!" });
