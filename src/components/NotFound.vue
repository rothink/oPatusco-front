<template>
  <div class="custom-empty-state">
    <!-- Título do estado vazio -->
    <div class="text-subtitle-2">
      {{ title }}
    </div>

    <!-- Texto explicativo -->
    <div class="text-caption">
      {{ text }}
    </div>

    <!-- Botões de ação -->
    <div class="action-buttons">
      <v-btn
        class="text-none ma-3"
        color="primary"
        elevation="1"
        rounded="lg"
        size="small"
        text="Voltar à tela anterior"
        @click="goBack"
        width="160"
      ></v-btn>

      <v-btn
        color="#424242"
        class="text-none"
        elevation="1"
        rounded="lg"
        size="small"
        text="Ir para a tela principal"
        @click="goToMain"
        width="160"
      ></v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: '@/assets/not-found.png',
    },
    title: {
      type: String,
      default: 'Ops! Parece que você se perdeu por aqui...',
    },
    text: {
      type: String,
      default: 'Não se preocupe! Vamos te ajudar a voltar aos trilhos em um instante.',
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.custom-empty-state {

  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  text-align: center;

  height: 90vh;
  box-sizing: border-box;
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  overflow: hidden;
  margin-bottom: 16px;
}

.scaled-image {
  max-width: 100%;
  max-height: 100%;

  object-fit: contain;
}

.text-subtitle-2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 8px;
}

.text-caption {
  font-size: 1em;
  margin-bottom: 16px;
}
</style>
