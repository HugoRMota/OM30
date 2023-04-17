<template>
  <div class="header">
    <div class="header-title">
      <h2>Clinica de saúde</h2>
    </div>
    <div class="header-buttons">
      <AppButton @click="emit('openClient')">Novo Paciente</AppButton>
    </div>
  </div>
</template>
<script setup>
import AppButton from "../AppButton/AppButton.vue";

const emit = defineEmits(["openClient"]);
</script>
<style scoped lang="scss">
.header {
  @apply md:flex md:items-center md:justify-between bg-white px-6 py-6 rounded-lg shadow;
  &-title {
    @apply min-w-0 flex-1;
    h2 {
      @apply text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight;
    }
  }
  &-buttons {
    @apply mt-4 flex md:mt-0 md:ml-4 space-x-3;
  }
}
</style>
