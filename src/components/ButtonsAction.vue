<template>
  <v-row class="pa-3">
    <v-col cols="12">
      <div class="text-right">
        <v-btn class="me-2" color="default" @click="clear">
          Limpar Filtros
        </v-btn>
        <v-btn
          :loading="isUpdating"
          color="primary"
          @click="onSearch"
        >
          Pesquisar
        </v-btn>

      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    isUpdating: {
      type: Boolean,
      required: true,
    },
    onSearch: {
      type: Function,
      required: true,
    },
    clear: {
      type: Function,
      required: true,
    }
  }
};
</script>
