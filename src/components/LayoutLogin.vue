<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-row>
          <v-col
            cols="12"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
              class="center text-center"
            >
              <router-view></router-view>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
</script>

