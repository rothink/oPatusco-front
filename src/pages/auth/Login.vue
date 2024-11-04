<template>
  <v-card class="pa-6">
    <v-card-title>Login</v-card-title>
    <v-card-text>
      <v-form ref="loginForm" v-model="isFormValid" @submit.prevent="handleLogin">
        <div class="d-flex justify-center">
          <v-col align-self="center">
            <v-sheet class="pa-2 ma-2">
              <v-row>
                <v-col
                  col="2"
                >
                </v-col>
                <v-col
                  col="8"
                >
                  <v-text-field
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                    label="Email"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :rules="[rules.required]"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>

                  <v-btn
                    :disabled="!isFormValid"
                    @click="handleLogin"
                    color="primary"
                    class="mt-4"
                    block
                  >
                    Login
                  </v-btn>
                </v-col>
                <v-col
                  col="2"
                >

                </v-col>
              </v-row>


            </v-sheet>
          </v-col>
        </div>
      </v-form>
    </v-card-text>
    <v-dialog
      transition="dialog-bottom-transition"
      width="auto"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          class="float-right"
          color="primary"
          v-bind="props"
          size="small"
        >Opções
        </v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-toolbar
            color="primary"
            title="Escolha o perfil"
          ></v-toolbar>
          <v-card-text>
            <v-row
              class="mb-6"
              no-gutters
            >
              <v-col>
                <v-sheet class="pa-2 ma-2">
                  <v-btn
                    variant="outlined"
                    size="x-small"
                    @click="preencherLogin('C')"
                  >
                    Cliente
                  </v-btn>
                </v-sheet>
                <v-sheet class="pa-2 ma-2">
                  <v-btn
                    variant="outlined"
                    size="x-small"
                    @click="preencherLogin('R')"
                  >
                    Recepcionista
                  </v-btn>
                </v-sheet>
                <v-sheet class="pa-2 ma-2">
                  <v-btn
                    variant="outlined"
                    size="x-small"
                    @click="preencherLogin('M')"
                  >
                    Médico
                  </v-btn>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn
              variant="text"
              @click="isActive.value = false"
            >Fechar
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </v-card>
</template>

<script setup>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import Auth from '@/api/auth/Auth'

const store = useStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const isFormValid = ref(false);

const rules = {
  required: (value) => !!value || 'Este campo é obrigatório',
  email: (value) => /.+@.+\..+/.test(value) || 'E-mail deve ser válido'
};

const preencherLogin = (tipo) => {
  if (tipo === 'M') {
    email.value = 'medico@user.com';
  }
  if (tipo === 'R') {
    email.value = 'recepcionista@user.com';
  }
  if (tipo === 'C') {
    email.value = 'cliente@user.com';
  }
  password.value = 'password'
}

const handleLogin = async () => {
  if (!isFormValid.value) return;

  const data = await Auth.login({
    email: email.value,
    password: password.value
  })

  await store.dispatch('login', data.access_token);
  await store.dispatch('fetchUser');
  await router.push('/appointments');
};
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
