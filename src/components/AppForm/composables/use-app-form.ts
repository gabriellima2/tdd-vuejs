import { ComputedRef, computed, reactive } from "vue";
import { getFieldError } from "../../../helpers/get-field-error";
import { emailSchema, passwordSchema } from "../validations";

export type Fields = { email: string; password: string };
export type FieldErrors = { [K in keyof Fields]: string | null };

export type useAppFormParams = {
	handleSubmit: (data: Fields) => void;
}

type useAppFormReturn = {
	fields: Fields;
	errors: ComputedRef<FieldErrors>;
	onSubmit: () => void;
}

export function useAppForm(params: useAppFormParams): useAppFormReturn {
	const { handleSubmit } = params;

	const fields = reactive<Fields>({ email: "", password: "" });
	const errors = computed<FieldErrors>(() => validateFields())

	function validateFields(): FieldErrors {
		return {
			email: getFieldError(emailSchema, fields.email),
			password: getFieldError(passwordSchema, fields.password)
		};
	};

	function onSubmit() {
		const hasValidationErrors = validateFields();
		if (!!hasValidationErrors.email || !!hasValidationErrors.password) return;
		handleSubmit(fields);
	}

	return { fields, errors, onSubmit }
}
