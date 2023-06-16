<template>
	<form @submit.prevent="props.onSubmit">
		<section>
			<slot></slot>
		</section>
		<BaseButton type="submit" :title="props.buttonText">{{ props.buttonText }}</BaseButton>
	</form>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue';
export type BaseFormProps = {
	buttonText: string;
	onSubmit: () => void;
}
const props = defineProps<BaseFormProps>();
</script>

<style scoped>

</style>
