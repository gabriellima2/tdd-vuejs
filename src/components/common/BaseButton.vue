<template>
	<button
		type="button"
		:class="`base-button ${props.disabled && 'base-button--disabled'}`"
		v-bind="$attrs"
		:disabled="props.disabled"
		>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
export type BaseButtonProps = { disabled?: boolean };
const props = defineProps<BaseButtonProps>();
</script>

<style scoped>
.base-button {
	width: 100%;
	height: 64px;
	border-radius: 8px;
	font-size: 1rem;
	color: var(--font-color);
	background-color: var(--brand-color);
	cursor: pointer;
	transition: opacity 0.2s ease;
}
.base-button:hover, .base-button:focus {
	opacity: 0.9;
}
.base-button--disabled {
	opacity: 0.5;
	cursor: default;
}
.base-button--disabled:hover, .base-button--disabled:focus {
	opacity: 0.5;
}
</style>
