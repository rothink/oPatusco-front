<template>
  <v-sheet class="py-4 px-6">
    <h2 class="text-h6 text-center mb-4">Olá, {{user?.name}}</h2>
    <h6 class="text-center text-uppercase">{{ user?.role }}</h6>
  </v-sheet>

  <v-divider />
  <v-list dense nav class="text-center">
    <v-list-item
      to="/appointments"
      link
    >
      <v-list-item-content>
        <v-list-item-title>{{ 'MARCAÇÕES' }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>

  <!-- Botão Salvar no final do Drawer -->
  <v-spacer/>

</template>
<script setup>
import {useStore} from 'vuex';
import {RoleEnum} from "@/enum/RoleEnum";
import {useRouter} from "vue-router";
import {computed, ref} from "vue";

const store = useStore();
const router = useRouter();
const user = computed(() => store.getters.user);
</script>
