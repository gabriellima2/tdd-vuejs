<template>
	<button type="button" :class="`base-button ${$attrs.disabled && 'base-button--disabled'}`" v-bind="$attrs"><slot></slot></button>
</template>

<script setup lang="ts">

</script>

<style scoped>
.base-button {}
.base-button--disabled {}
</style>
