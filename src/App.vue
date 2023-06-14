<template>
  <BaseButton type="button" @click="() => console.log(value)">Hello</BaseButton>
	<BaseLabel htmlFor="name">Nome</BaseLabel>
	<BaseInput type="text" title="Seu nome" name="name" id="name" v-model="value" placeholder="Ex: Gabriel"  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from './components/common/BaseButton.vue';
import BaseInput from './components/common/BaseInput.vue';
import BaseLabel from './components/common/BaseLabel.vue';
const value = ref("")
</script>

<style scoped></style>
