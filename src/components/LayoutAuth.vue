<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app temporary>
      <NavigationMenu/>
      <template #append>
        <v-divider/>
        <v-btn
          color="primary"
          class="pa-4"
          @click="logout"
          block
        >
          Sair
        </v-btn>
      </template>
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>O Patusco</v-app-bar-title>
    </v-app-bar>
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
          >
              <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRouter} from 'vue-router';
import NavigationMenu from "@/components/NavigationMenu.vue";

const store = useStore();
const router = useRouter();
const drawer = ref(false)

const goToRoute = (route) => {
  router.push(route)
}

const logout = async () => {
  await store.dispatch('logout');
  await router.push('/login');
}

</script>

