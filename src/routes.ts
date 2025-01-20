import { computed } from 'vue';
import Home from "./views/Home.vue";
import pb from './composables/usePocketBase';
const isAuthenticated = computed(() => pb.authStore.record !== null);

import LandingPage from "./views/LandingPage.vue";
import Welcome from "./views/Welcome.vue";
import SignIn from "./views/SignIn.vue";
import Settings from "./views/Settings.vue";
import Fidel from "./views/Fidel.vue";
import PhrasesAndWords from './views/PhrasesAndWords.vue';

const routes = [
  {
    path: '/',
    component: () => {
      return isAuthenticated.value
        ? import('./views/Home.vue')
        : import('./views/LandingPage.vue');
    },
  },
  { path: '/signin', component: SignIn },
  { path: '/phrases-and-words', component: PhrasesAndWords },
  { path: '/settings', component: Settings,  meta: { requiresAuth: true } },
  { path: '/welcome', component: Welcome,  meta: { requiresNoAuth: true } },
  { path: '/fidel', component: Fidel },
];

export default routes;
// meta: { requiresAuth: true }
// meta: { requiresNoAuth: true }
