<template>
  <v-form ref="form" :disabled="isUpdating">
    <v-row>
      <v-col cols="6" md="6">
        <v-text-field
          label="Data da Consulta"
          v-model="props.formFilter.appointment_date"
          type="date"
          outlined
          variant="outlined"
          density="compact"
        ></v-text-field>
      </v-col>
      <v-col cols="6" md="6">
        <v-select
          v-model="props.formFilter.animal_type_id"
          :items="animalTypesSelect"
          variant="outlined"
          density="compact"
          label="Tipo de animais"
          required
        ></v-select>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import {ref, defineProps, onMounted,computed} from 'vue';
import AnimalType from "@/api/AnimalType";
import {useStore} from 'vuex';

const store = useStore();
const user = computed(() => store.getters.user);
const animalTypesSelect = ref([])
const props = defineProps({
  formFilter: {
    type: Object,
    required: true
  }
});

const preRequisite = async () => {
  try {
    const {data} = await AnimalType.preRequisite();
    animalTypesSelect.value = data.preRequisite.animal_types
  } catch (e) {

  }
}


onMounted(async () => {
  await preRequisite()
})

const isUpdating = ref(false);
</script>
