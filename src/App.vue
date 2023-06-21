<template>
	<AppForm :handle-submit="(data) => console.log(data)" />
</template>

<script setup lang="ts">
import AppForm from './components/AppForm/AppForm.vue';
</script>

<style scoped></style>
