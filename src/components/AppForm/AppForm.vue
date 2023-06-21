<template>
	<BaseForm button-text="Pronto!" :on-submit="onSubmit">
		<Field
			label-text="Email"
			v-model="fields.email"
			:input="{
				type: 'email',
				name: 'email',
				id: 'email',
				placeholder: 'ex: your_name@domain.com',
			}"
			:error="{ id: 'email_error', message: errors.email || null }"
		/>
		<Field
			label-text="Senha"
			v-model="fields.password"
			:input="{
				type: 'password',
				name: 'password',
				id: 'password',
				placeholder: '8 ou mais caracteres',
			}"
			:error="{ id: 'password_error', message: errors.password || null }"
		/>
	</BaseForm>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';

import BaseForm from '../common/BaseForm.vue';
import Field from '../common/Field.vue';

import { getFieldError } from "../../helpers/get-field-error";
import { emailSchema, passwordSchema } from "./validations";

export type Fields = { email: string; password: string };
type FieldErrors = { email: string | null; password: string | null };
type AppFormProps = { handleSubmit: (data: Fields) => void };

const props = defineProps<AppFormProps>();
const fields = reactive<Fields>({ email: "", password: "" });

function validate(): FieldErrors {
	return {
		email: getFieldError(emailSchema, fields.email),
		password: getFieldError(passwordSchema, fields.password)
	}
}

const errors = computed<FieldErrors>(() => validate())

function onSubmit() {
	const errors = validate();
	if (!!errors.email || !!errors.password) return;
	props.handleSubmit(fields);
}
</script>

<style scoped>

</style>
