<template>
	<BaseForm buttonText="Pronto!" :onSubmit="() => console.log('Hello')">
		<Field
			labelText="Email"
			v-model="emailValue"
			:input="{
				type: 'email',
				name: 'email',
				id: 'email',
				placeholder: 'ex: your_name@domain.com',
			}"
			:error="{ id: 'email_error', message: null }"
		/>
		<Field
			labelText="Senha"
			v-model="passwordValue"
			:input="{
				type: 'password',
				name: 'password',
				id: 'password',
				placeholder: '8 ou mais caracteres',
			}"
			:error="{ id: 'password_error', message: null }"
		/>
	</BaseForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseForm from './common/BaseForm.vue';
import Field from './common/Field.vue';

const emailValue = ref("");
const passwordValue = ref("");

</script>

<style scoped>

</style>
