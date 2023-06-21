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
import BaseForm from '../common/BaseForm.vue';
import Field from '../common/Field.vue';

import { useAppForm, type useAppFormParams } from "./composables/use-app-form";

type AppFormProps = Pick<useAppFormParams, "handleSubmit">;

const props = defineProps<AppFormProps>();
const { fields, errors, onSubmit } = useAppForm({ handleSubmit: props.handleSubmit });
</script>

<style scoped>

</style>
