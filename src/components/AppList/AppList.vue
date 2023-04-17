<template>
  <div class="list">
    <h3 v-show="title">{{ title }}</h3>
    <ul role="list">
      <li v-for="item in list">
        <div class="flex items-center space-x-3">
          <h2>{{ item.name_patient }}</h2>
          <!-- <AppTag :active="item.active">{{
            item.active ? "Ativo" : "Desabilitado"
          }}</AppTag> -->
        </div>
        <div class="space-x-2">
          <AppButton @click="emit('edit', item.id)">Editar</AppButton>
          <AppButton @click="emit('delete', item.id)">Excluir</AppButton>
        </div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import AppButton from "../AppButton/AppButton.vue";
import AppTag from "../AppTag/AppTag.vue";

const emit = defineEmits(["edit", "delete"]);
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },

  title: {
    type: String,
    default: "",
  },
});
</script>
<style scoped lang="scss">
.list {
  @apply overflow-hidden rounded-md bg-white shadow;
  h3 {
    @apply text-xl text-gray-800 font-semibold px-6 py-4;
  }
  ul {
    @apply divide-y divide-gray-200;
    li {
      @apply px-6 py-4 flex items-center justify-between;
    }
  }
}
</style>
