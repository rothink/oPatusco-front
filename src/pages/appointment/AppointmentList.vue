<template>
  <v-data-table-server
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="serverItems"
    :items-length="totalItems"
    :loading="loading"
    :search="searchQuery"
    item-value="name"
    @update:options="loadItems"
  >
    <template v-slot:item.doctor="{item}">
      <v-chip
        v-if="item?.appointment_doctor?.user?.name"
        class="ma-2"
        label
        size="small"
        color="blue"
        @click="deleteAssingAppointmentAndDoctor(item)"
      >
        {{ item.appointment_doctor.user.name }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-row class="d-flex align-center">
        <v-icon
          color="info"
          class="me-2"
          @click="edit(item.id)"
          v-tooltip="'Editar'"
          v-if="userLogged.role !== RoleEnum.CLIENTE"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          color="error"
          class="me-2"
          @click="remover(item.id)"
          v-tooltip="'Excluir'"
          v-if="userLogged.role === RoleEnum.RECEPCIONISTA"
        >
          mdi-delete
        </v-icon>
        <v-icon
          color="primary"
          class="me-2"
          @click="attrDoctorModal(item)"
          v-tooltip="'Atribuir a um médico'"
          v-if="userLogged.role === RoleEnum.RECEPCIONISTA"
        >
          mdi-account-search
        </v-icon>
        <AppointmentAttrDoctor
          :isOpen="isModalOpen"
          :appointment="AppointmentModal"
          @update:isOpen="isModalOpen = $event"
          @confirmAssignment="handleAssignment"
        />
      </v-row>
    </template>
  </v-data-table-server>
</template>

<script setup>
import Appointment from "@/api/Appointment";
import {computed, defineProps, ref} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {RoleEnum} from "@/enum/RoleEnum";
import filters from "@/helpers/filters";
import AppointmentAttrDoctor from "@/pages/appointment/AppointmentAttrDoctor.vue";
import AppointmentDoctor from "@/api/AppointmentDoctor";

const store = useStore();
const router = useRouter();
const userLogged = computed(() => store.getters.user);

const props = defineProps({
  formFilter: {
    type: Object,
    required: true
  }
})

const headers = ref([
  {title: 'Nome do Cliente', key: 'user.name', align: 'center'},
  {title: 'Nome do Animal', key: 'animal_name', align: 'center'},
  {title: 'Tipo de animal', key: 'animal_type.name', align: 'center'},
  {title: 'Idade do animal', key: 'animal_age', align: 'center'},
  {title: 'Data agendamento', key: 'appointment_date_formated', align: 'center'},
  {title: 'Médico vinculado', key: 'doctor', align: 'center'},
  {title: 'Ação', key: 'actions', align: 'start', sortable: false},
])
const itemsPerPage = ref(10)
const searchQuery = ref('')
const serverItems = ref([])
const loading = ref(true)
const totalItems = ref(0)
const isModalOpen = ref(false);
const AppointmentModal = ref({});

const addFilterByUserLoggedIfDoctorOrClient = async (params) => {
  if (userLogged?.value?.role !== RoleEnum.RECEPCIONISTA) {
    return {
      ...params,
      doctor_id: userLogged?.value?.id
    }
  }
  return params;
}

const loadItems = async (params = {page: 1, itemsPerPage: itemsPerPage, sortBy: []}) => {
  loading.value = true;
  props.formFilter = await addFilterByUserLoggedIfDoctorOrClient(params)
  try {
    const requestParams = await filters.formatFilterAndOrderBy(params, props.formFilter)
    const {data} = await Appointment.getAll(requestParams);
    serverItems.value = data.data;
    totalItems.value = 10;
  } catch (error) {
  } finally {
    loading.value = false;
  }
}

const attrDoctorModal = (item) => {
  AppointmentModal.value = item;
  isModalOpen.value = true;
}

const handleAssignment = async () => {
  isModalOpen.value = false
  await loadItems()
};

const edit = (id) => {
  router.push('/appointments/' + id)
}

const remover = async (id) => {
  const {ok} = await Appointment.destroy(id)
  if (ok) {
    await loadItems()
  }
}

const deleteAssingAppointmentAndDoctor = async (item) => {
  if (userLogged.value.role !== RoleEnum.RECEPCIONISTA) {
    return;
  }
  const {ok} = await AppointmentDoctor.destroy(item.appointment_doctor.id)
  if (ok) {
    await loadItems()
  }
}

defineExpose({
  loadItems
})

</script>


