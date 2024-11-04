<template>
  <v-card
    class="pa-4"
    :loading="isLoading"
    v-if="user?.role === RoleEnum.RECEPCIONISTA || user?.role === RoleEnum.MEDICO"
  >
    <AppointmentFilter
      :formFilter="formFilter"
      @search="performSearch"
    />
  </v-card>
  <ButtonsAction
    :isUpdating="isUpdating"
    :onSearch="performSearch"
    :clear="clear"
  />
  <v-card>
    <AppointmentList
      :formFilter="formFilter"
      ref="refSearch"
    />
  </v-card>
  <v-container>
    <v-row justify="end">
      <v-btn
        color="secondary"
        @click="gotToForm"
        v-if="user?.role !== RoleEnum.MEDICO"
      >
        Novo
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import {useStore} from 'vuex';

import AppointmentFilter from "./AppointmentFilter.vue";
import AppointmentList from "@/pages/appointment/AppointmentList.vue";
import ButtonsAction from "@/components/ButtonsAction.vue";
import {RoleEnum} from "@/enum/RoleEnum";
import {useRouter} from "vue-router";

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters.user);

const isLoading = ref(false);
const isUpdating = ref(false);
const itemsPerPage = ref(10);
const refSearch = ref(null);

const formFilter = reactive({
  appointment_date: null,
  animal_type_id: null,
  doctor_id: null
})

const performSearch = async () => {
  isUpdating.value = true;
  isLoading.value = true;
  await refSearch.value.loadItems({
    page: 1,
    itemsPerPage: itemsPerPage.value,
  });
  isUpdating.value = false;
  isLoading.value = false;
}

const clear = async () => {
  Object.assign(formFilter, {
    appointment_date: null,
    animal_type_id: null,
    doctor_id: null
  })
  await performSearch();
}

const gotToForm = () => {
  router.push({name: 'appointments-new'})
}

</script>
