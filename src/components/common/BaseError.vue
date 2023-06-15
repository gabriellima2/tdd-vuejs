<template>
	<div aria-atomic="true" aria-live="polite" class="container">
		<span role="alert" :id="props.id" class="base-error" v-if="props.message">{{ props.message }}</span>
	</div>
</template>

<script setup lang="ts">
export type BaseErrorProps = {
	message: string | null;
	id?: string;
};
const props = defineProps<BaseErrorProps>();
</script>

<style scoped>
.container {
	min-height: 18px;
}
.base-error {
	color: var(--error-color);
	font-size: 0.9rem;
}
</style>
