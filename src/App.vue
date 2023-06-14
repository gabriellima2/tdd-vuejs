<template>
  <BaseButton type="button" @click="() => console.log(value)">Hello</BaseButton>
	<BaseInput type="email" title="Hello" v-model="value" class="hello" placeholder="Hello"  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './components/common/BaseButton.vue';
import BaseInput from './components/common/BaseInput.vue';
const value = ref("")
</script>

<style scoped></style>
