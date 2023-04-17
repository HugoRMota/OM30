<template>
  <div class="checkbox">
    <div v-if="title" class="checkbox-title">
      <h3>{{ title }}</h3>
    </div>
    <div class="checkbox-content">
      <div class="checkbox-content-item">
        <input
          :class="
            modelValue
              ? 'checkbox-content-item-active'
              : 'checkbox-content-item-disabled'
          "
          v-bind="attrs"
          type="checkbox"
          :value="modelValue"
          :checked="modelValue"
          @change="selected"
        />
      </div>
    </div>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
<script setup>
import { useField } from "vee-validate";
import { toRefs, useAttrs } from "vue";

const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "default",
  },
  rules: {
    type: String,
    default: undefined,
  },
});

const { name } = toRefs(props);

const { checked, handleChange, errorMessage } = useField({
  name: name.value,
  rules: props.rules,
  initialValue: props.modelValue,
  type: "checkbox",
  checkedValue: props.modelValue,
});

const selected = (event) => {
  handleChange(props.modelValue);
  emit("update:modelValue", event.target.checked);
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
