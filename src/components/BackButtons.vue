<template>
  <v-row class="pa-3">
    <v-col cols="12">
      <div class="text-right">
        <v-btn class="me-2" color="info" @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
          Voltar
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import router from "@/router";

const goBack = () => {
  router.back();
};
</script>
