<template>
	<BaseForm buttonText="Entrar" :onSubmit="() => console.log(value)">
		<Field labelText="Nome" v-model="value" :input="{ name: 'username', id: 'username', placeholder: 'Ex: gabriel123',
 title: 'Seu nome' }" :error="{ id: 'username_error', message: null }" />
	</BaseForm>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import Field from './components/common/Field.vue';
import BaseForm from './components/common/BaseForm.vue';
const value = ref("")
</script>

<style scoped></style>
