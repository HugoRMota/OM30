<template>
  <div>
    <Form
      @submit="save"
      class="px-6 py-6 space-y-6"
      :validation-schema="validationForm"
    >
      <div>
        <h2 class="text-xl font-semibold text-indigo-500 mb-3">
          Dados do Paciente
        </h2>
        <div class="grid grid-cols-2 gap-6">
          <AppInput
            v-model="formUser.name_patient"
            name="name_patient"
            rules="required"
            label="Nome completo Paciente"
            type="text"
            required
          ></AppInput>
          <AppInput
            v-model="formUser.name_mother"
            name="name_mother"
            rules="required"
            label="Nome completo Mãe"
            type="text"
            required
          ></AppInput>
          <AppInput
            v-model="formUser.birthday"
            name="birthday"
            label="Data Nascimento"
            type="date"
            required
          ></AppInput>
          <AppInput
            v-model="formUser.cpf"
            name="cpf"
            label="CPF"
            type="tel"
            mask="###.###.###-##"
            required
          ></AppInput>
          <AppInput
            v-model="formUser.cns"
            name="cns"
            label="CNS"
            type="text"
            required
          ></AppInput>
          <AppUpload @upload="uploadImage"></AppUpload>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-semibold text-indigo-500 mb-3">Endereço</h2>
        <div class="grid grid-cols-2 gap-6">
          <AppInput
            v-model="formUser.cep"
            name="cep"
            rules="required"
            label="Cep"
            type="text"
            mask="##.###.###"
            @change="getCep"
          ></AppInput>
          <AppInput
            v-model="formUser.street"
            name="street"
            rules="required"
            label="Rua"
            type="text"
          ></AppInput>
          <AppInput
            v-model="formUser.complement"
            name="complement"
            label="Complemento"
            type="text"
          ></AppInput>
          <AppInput
            v-model="formUser.neighborhood"
            name="neighborhood"
            label="Bairro"
            type="text"
          ></AppInput>
          <AppInput
            v-model="formUser.city"
            name="city"
            label="Cidade"
            type="text"
          ></AppInput>
          <AppInput
            v-model="formUser.state"
            name="state"
            label="UF"
            type="text"
          ></AppInput>
          <!-- <AppCheckbox name="ativo" title="Ativo" v-model="formUser.active" /> -->
        </div>
      </div>

      <div class="flex justify-end space-x-6 py-3">
        <AppButton @click="emit('close')" type="button">Fechar</AppButton>
        <AppButton type="submit">Salvar</AppButton>
      </div>
    </Form>
  </div>
</template>
<script setup>
import AppInput from "../AppInput/AppInput.vue";
import AppButton from "../AppButton/AppButton.vue";
import AppUpload from "../AppUpload/AppUpload.vue";

import { Form } from "vee-validate";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useSignupSchema } from "@/validations/register.js";

const validationForm = useSignupSchema();
const emit = defineEmits(["update", "close"]);
const props = defineProps({
  user: {
    type: Object,
    default: {},
  },
  create: {
    type: Boolean,
    default: true,
  },
});

const formUser = ref({});

onMounted(() => {
  formUser.value = props.user;
});

const uploadImage = (image) => {
  console.log("image", image);
};

const getCep = async (value) => {
  const cep = value.target.value.replace(/[^a-zA-Z0-9]/g, "");
  if (cep.length === 8) {
    try {
      const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      formUser.value.street = data.logradouro;
      formUser.value.neighborhood = data.bairro;
      formUser.value.city = data.localidade;
      formUser.value.state = data.uf;
    } catch (error) {
      console.error(error);
    }
  }
};

const save = () => {
  if (props.create) {
    emit("create", formUser.value);
  } else {
    emit("update", formUser.value);
  }
};
</script>
<style scoped lang="scss"></style>
