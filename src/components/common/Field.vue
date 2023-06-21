<template>
	<div>
		<BaseLabel :htmlFor="props.input.id">{{ props.labelText }}</BaseLabel>
		<BaseInput
			type="text"
			v-bind="props.input"
			:aria-invalid="!!props.error.message"
			:aria-errormessage="props.error.id"
			:model-value="props.modelValue"
			@change="($event: Event) => emits('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
		<BaseError :id="props.error.id" :message="props.error.message" />
	</div>
</template>

<script setup lang="ts">
import { type InputHTMLAttributes } from 'vue';
import BaseInput from './BaseInput.vue';
import BaseLabel from './BaseLabel.vue';
import BaseError from './BaseError.vue';

export type FieldProps = {
	input: Omit<InputHTMLAttributes, "v-model">;
	error: {
		id: string;
		message: string | null;
	};
	labelText: string;
	modelValue: string;
};
type FieldEmits = { (e: "update:modelValue", value: string): void };

const props = defineProps<FieldProps>();
const emits = defineEmits<FieldEmits>();
</script>

<style scoped>

</style>
