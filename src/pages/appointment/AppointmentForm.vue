<template>
  <v-container class="text-center d-flex justify-center">
    <v-card class="pa-5" max-width="600">
      <v-card-title>Agendamento de Consulta Veterinária</v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid">
          <v-text-field
            label="Nome da Pessoa"
            v-model="form.person_name"
            :rules="[rules.required]"
            outlined
            variant="outlined"
            density="compact"
            :disabled="form.user_id"
            name="person_name"
          ></v-text-field>
          <v-text-field
            label="Nome do Animal"
            v-model="form.animal_name"
            :rules="[rules.required]"
            outlined
            variant="outlined"
            density="compact"
            name="animal_name"
          ></v-text-field>
          <v-select
            label="Tipo de Animal"
            v-model="form.animal_type_id"
            :items="animalTypesSelect"
            :rules="[rules.required]"
            outlined
            variant="outlined"
            density="compact"
            name="animal_type_id"
          ></v-select>
          <v-text-field
            label="Idade do Animal (em anos)"
            v-model="form.animal_age"
            :rules="[rules.number]"
            type="number"
            outlined
            variant="outlined"
            density="compact"
            name="animal_age"
          ></v-text-field>
          <v-textarea
            label="Sintomas"
            v-model="form.symptoms"
            :rules="[rules.required]"
            outlined
            variant="outlined"
            density="compact"
            name="symptoms"
          ></v-textarea>
          <v-text-field
            label="Data da Consulta"
            v-model="form.appointment_date"
            :rules="[rules.required]"
            type="date"
            outlined
            variant="outlined"
            density="compact"
            name="appointment_date"
          ></v-text-field>
          <v-radio-group v-model="form.appointment_period" :rules="[rules.required]" row name="appointment_period">
            <v-radio label="Manhã" value="morning"></v-radio>
            <v-radio label="Tarde" value="afternoon"></v-radio>
          </v-radio-group>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="submitForm" :disabled="!isFormValid" variant="tonal" id="agendar-consulta">
          {{ id ? 'Atualizar agendamento de Consulta' : 'Agendar Consulta' }}
        </v-btn>
        <BackButtons/>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue';
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import Auth from "@/api/auth/Auth";
import AnimalType from "@/api/AnimalType";
import Appointment from "@/api/Appointment";
import {RoleEnum} from "@/enum/RoleEnum";
import BackButtons from "@/components/BackButtons.vue";

const store = useStore();
const router = useRouter();
const route = useRoute()
const user = ref({});
const id = ref(null);
const animalTypesSelect = ref([])
const isFormValid = ref(false);

const form = reactive({
  user_id: null,
  person_name: null,
  animal_name: null,
  animal_type_id: null,
  animal_age: null,
  symptoms: null,
  appointment_date: null,
  appointment_period: null,
});


const rules = {
  required: (value) => !!value || 'Campo obrigatório',
  email: (value) => /.+@.+\..+/.test(value) || 'E-mail inválido',
  number: (value) => !isNaN(value) || 'Deve ser um número válido',
};

const submitForm = async () => {

  if (!isFormValid) return;

  if (id.value) {
    await update()
    return;
  }
  await save();
};

const save = async () => {
  const {ok} = await Appointment.save(form);
  if (ok) {
    await router.push('/appointments')
  }
}


const update = async () => {
  const {ok} = await Appointment.update(id.value, form);
  if (ok) {
    await router.push('/appointments')
  }
}

const preRequisite = async () => {
  const {data} = await AnimalType.preRequisite();
  animalTypesSelect.value = data.preRequisite.animal_types
}

const findById = async () => {
  const {data} = await Appointment.find(id.value);
  Object.assign(form, {
    user_id: data.user_id,
    person_name: data.user.name,
    animal_name: data.animal_name,
    animal_type_id: data.animal_type_id,
    animal_age: data.animal_age,
    symptoms: data.symptoms,
    appointment_date: data.appointment_date,
    appointment_period: data.appointment_period,
  })
};

onMounted(async () => {
  await preRequisite();
  await loadPage();
})

const loadPage = async () => {
  id.value = route.params.id ? route.params.id : '';
  if (id.value) {
    await findById();
  }

  const data = await Auth.me();
  if (data && data.role === RoleEnum.CLIENTE) {
    Object.assign(form, {
      user_id: data.id,
      person_name: data.name,
    });
  }
}
</script>
