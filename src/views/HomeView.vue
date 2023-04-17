<script setup>
import AppHeader from "../components/AppHeader/AppHeader.vue";
import AppList from "../components/AppList/AppList.vue";
import AppDrawer from "../components/AppDrawer/AppDrawer.vue";
import FormClient from "../components/FormClient/FormClient.vue";

import { ref, onMounted } from "vue";
import axios from "axios";

const isPatients = ref(false);

const patientId = ref("");
const patients = ref([]);
const patientEdit = ref({});

const getPatient = async () => {
  try {
    const { data } = await axios.get("/api/patients");
    patients.value = data.patients;
  } catch (error) {
    console.error(error);
  }
};

const setPatient = async (form) => {
  try {
    await axios.post("/api/patients", form);
    getPatient();
    closePatient();
  } catch (error) {
    console.error(error);
  }
};

const updatePatient = async (form) => {
  try {
    await axios.put(`/api/patients/${patientId.value}`, form);
    getPatient();
    closePatient();
  } catch (error) {
    console.error(error);
  }
};

const deletePatient = async (id) => {
  try {
    await axios.delete(`/api/patients/${id}`);
    getPatient();
    closePatient();
  } catch (error) {
    console.error(error);
  }
};

const openPatient = () => {
  isPatients.value = true;
  patientEdit.value = {}
};

const closePatient = () => {
  isPatients.value = false;
  patientId.value = "";
  patientEdit.value = {};
};

const updateClient = (id) => {
  isPatients.value = true;
  patientId.value = id;

  const index = patients.value.findIndex((patient) => patient.id == id);

  if (index != -1) {
    patientEdit.value = patients.value[index];
  }
};



onMounted(() => {
  getPatient();
});
</script>

<template>
  <div class="space-y-6">
    <AppHeader @openClient="openPatient()" />
    <AppList
      :list="patients"
      title="Lista de Paciente"
      @edit="updateClient"
      @delete="deletePatient"
    />
  </div>
  <AppDrawer
    v-model="isPatients"
    :title="patientId ? 'Novo cliente' : 'Editar cliente'"
  >
    <FormClient
      v-if="isPatients"
      :create="patientId"
      :user="patientEdit"
      @update="updatePatient"
      @create="setPatient"
      @close="closePatient"
    />
  </AppDrawer>
</template>
