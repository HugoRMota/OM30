<template>
  <div @click="clickOnInput()">
    <img :src="avatarPhoto" class="rounded-sm shadown" />
    <div class="flex items-center mt-2 cursor-pointer">
      <AppButton>Imagem</AppButton>
      <p class="ml-3 text-hy-gray-200 text-xs font-normal">Adicionar foto</p>
      <input
        @change.stop="createFileByInput($event)"
        type="file"
        accept="image/*"
        capture
        class="sr-only"
        id="file-upload-avatar"
        hidden
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import AppButton from "../AppButton/AppButton.vue";
const props = defineProps({
  name: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "src/assets/images/jimmyRelease.jpg",
  },
});

const emit = defineEmits(["upload"]);

const avatarPhoto = ref("");

const clickOnInput = () => {
  const uploadInput = document.getElementById("file-upload-avatar");

  if (uploadInput) return uploadInput.click();
};

const toBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const dataURLtoFile = async (dataUrl, name) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], name, { type: "image/*" });
};

const createFileByInput = async (e) => {
  const target = e.target;
  if (target.files) {
    const file = target.files[0];

    if (file) {
      const toBase64Result = await toBase64(file);
      const fileResult = await dataURLtoFile(toBase64Result, file.name);
      console.log("🚀 ~ file: AppUpload.vue:67 ~ createFileByInput ~ fileResult:", fileResult)
      const url = URL.createObjectURL(fileResult);
      console.log("🚀 ~ file: AppUpload.vue:68 ~ createFileByInput ~ url:", url)

      emit("upload", { url, fileResult });
    }
  }
};
</script>
