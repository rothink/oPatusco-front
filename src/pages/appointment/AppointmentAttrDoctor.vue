<template>
  <v-dialog :model-value="isOpenInternal" max-width="500" @update:model-value="updateIsOpen">
    <v-card>
      <v-card-title>Atribuir a um Médico</v-card-title>
      <v-card-text>
        <p>Atribuir um médico ao agendamento do cliente: {{ appointment.clientName }}</p>
        <v-select
          :items="doctors"
          label="Médico"
          v-model="selectedDoctor"
        ></v-select>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="confirmAssignment">Atribuir</v-btn>
        <v-btn color="secondary" @click="close">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, onMounted } from 'vue';
import User from "@/api/User";
import AppointmentDoctor from "@/api/AppointmentDoctor";

const props = defineProps({
  appointment: Object,
  isOpen: Boolean,
});

const emit = defineEmits(['update:isOpen']);

const isOpenInternal = ref(props.isOpen);
const selectedDoctor = ref(null);
const doctors = ref([]);

watch(() => props.isOpen, (newVal) => {
  isOpenInternal.value = newVal;
});

const updateIsOpen = (value) => {
  emit('update:isOpen', value);
};

const close = () => {
  updateIsOpen(false);

};

const preRequisite = async () => {
  const data = await User.get('users/pre-requisite/medicos');
  doctors.value = data.medicos;
};

onMounted(preRequisite);

const confirmAssignment = async () => {
  const {ok} = await AppointmentDoctor.save({
    user_id: selectedDoctor.value,
    appointment_id: props.appointment.id
  });

  if (ok) {
    close()
  }

};
</script>
