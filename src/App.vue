<template>
  <v-app>
    <v-main>
      <LayoutAuth v-if="isAuthenticated"/>
      <LayoutLogin v-else/>
    </v-main>
  </v-app>
</template>

<script setup>
//
import LayoutLogin from "@/components/LayoutLogin.vue";
import {computed, onMounted} from "vue";
import {useStore} from 'vuex';
import LayoutAuth from "@/components/LayoutAuth.vue";

const store = useStore();

const isAuthenticated = computed(() => store.getters.isAuthenticated);

onMounted(() => {
  store.dispatch('initializeAuth');
});
</script>
