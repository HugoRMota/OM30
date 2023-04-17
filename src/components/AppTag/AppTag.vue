<template>
  <span class="tag" :class="active ? 'tag-active' : 'tag-disabled'"
    ><slot></slot
  ></span>
</template>
<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
});
</script>
<style scoped lang="scss">
.tag {
  @apply inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium;

  &-active {
    @apply bg-green-100 text-green-800;
  }
  &-disabled {
    @apply bg-yellow-100 text-yellow-800;
  }
}
</style>
