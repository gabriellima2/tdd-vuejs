import * as z from 'zod';

export const emailSchema = z
	.string().nonempty({ message: "O campo email é obrigatório" })
	.email({ message: "Formato de e-mail inválido!" })
	.trim()
	.max(256, { message: "O e-mail ultrapassou o limite de 256 caracteres!" });;
