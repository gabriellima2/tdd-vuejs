<template>
	<input
		type="text"
		class="base-input"
		@change="($event) => emits('update:modelValue', ($event.target as HTMLInputElement).value)"
	/>
</template>

<script setup lang="ts">
type BaseInputProps = { modelValue: string };
type BaseInputEmits = { (e: "update:modelValue", value: string): void };

defineProps<BaseInputProps>();
const emits = defineEmits<BaseInputEmits>();
</script>

<style scoped>
.base-input {
	width: 100%;
	height: 48px;
	border-radius: 8px;
	border: none;
	padding: 0px 16px;
	font-weight: 400;
	font-size: 1rem;
	color: var(--font-color);
	background-color: var(--util-color);
}
.base-input::placeholder {
	font-weight: 400;
	font-size: 1rem;
	color: var(--font-color);
	opacity: 0.5;
}
</style>
