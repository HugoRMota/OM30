<template>
  <div class="hy-input">
    <div class="hy-input-container">
      <div class="hy-input-container-header">
        <label for="label">{{ label }}</label>
        <span v-if="required" class="text-red-500">*</span>
      </div>
      <div class="content">
        <input
          :value="inputValue"
          :class="classInput"
          v-maska="mask"
          v-bind="argsBind"
          @input="update"
          @blur="handleBlur"
          @keyup.enter="$emit('on-keyup-enter')"
        />
      </div>
    </div>
    <p class="text-red-500" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { maska } from "maska";
import { computed, defineEmits, defineProps, toRef, useAttrs } from "vue";
import { useVeeField } from "@/libs";

const vMaska = maska;

const attrs = useAttrs();

const emits = defineEmits(["update:modelValue", "on-keyup-enter"]);

const props = defineProps({
  name: {
    type: String,
  },

  modelValue: {
    type: [String, Number],
  },

  mask: {
    type: String,
    default: null,
  },

  label: {
    type: String,
    default: "",
  },

  rules: {
    type: String,
    default: undefined,
  },

  required: {
    type: Boolean,
    default: false,
  },
});

const name = toRef(props, "name");

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useVeeField({
  name,
  rules: props.rules,
  initialValue: props.modelValue,
});

const update = (el) => {
  handleChange(el.target.value);
  emits("update:modelValue", el.target.value);
};

const argsBind = computed(() => {
  return {
    ...attrs,
    name: props.name,
    id: props.name,
  };
});

const classInput = computed(() => {
  return [
    attrs.disabled ? "disabled" : "active",
    { password: attrs.type },
    { error: errorMessage.value },
  ];
});
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
