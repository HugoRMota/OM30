<template>
  <teleport to="body">
    <div class="drawer">
      <transition name="fade">
        <div v-if="modelValue" class="drawer-background" @click="close"></div>
      </transition>

      <div :class="{ fixed: modelValue }" class="drawer-body">
        <div class="drawer-container">
          <div class="drawer-space">
            <transition name="move">
              <div v-if="modelValue" :class="sizeDrawer" class="drawer-card">
                <div class="drawer-card-background">
                  <div class="drawer-card-header">
                    <slot name="header">
                      <h2>
                        {{ title }}
                      </h2>
                    </slot>
                    <div class="ml-6">
                      <button @click="close" type="button" class="">
                        <svg
                          fill="none"
                          class="h-5 w-5"
                          stroke="currentColor"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div class="drawer-card-body"><slot> </slot></div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits(["close", "update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "Edit",
  },

  size: {
    type: String,
    default: "3xl",
    validator: function (value: string) {
      return (
        ["sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"].indexOf(
          value
        ) !== -1
      );
    },
  },
});

const sizeDrawer = computed(() => {
  let styles = "";
  switch (props.size) {
    case "sm":
      styles = "small";
      break;
    case "md":
      styles = "medium";
      break;
    case "lg":
      styles = "large";
      break;
    case "xl":
      styles = "extra-large";
      break;
    case "2xl":
      styles = "two-extra-large";
      break;
    case "3xl":
      styles = "three-extra-large";
      break;
    case "4xl":
      styles = "four-extra-large";
      break;
    case "5xl":
      styles = "five-extra-large";
      break;
    case "6xl":
      styles = "six-extra-large";
      break;
    default:
      styles = "medium";
      break;
  }
  return styles;
});

const close = () => {
  emit("update:modelValue", false);
  emit("close");
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
