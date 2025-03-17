<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { createApp } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { VApp, VMain } from 'vuetify/components';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';

const vuetify = createVuetify();

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp({
  components: {
    VApp,
    VMain,
  },
});

app.use(vuetify);
app.use(router);
app.mount('#app');
</script>

<style>
@import '~vuetify/styles';
</style>
