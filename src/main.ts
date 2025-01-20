import './assets/main.css'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import pb from './composables/usePocketBase'
import App from './App.vue'
import routes from './routes.ts'

let router = createRouter({
  routes,
  history: createWebHistory()
})

// blocks websites that require sign-in
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !pb.authStore.isValid) {
      router.push("/");
      return false;
  } else if( to.meta.requiresNoAuth && pb.authStore.isValid) {
    router.push("/");
    return false;
  } else {
    next();
  }
  return true;
})

let app = createApp(App)

app.use(router)
app.mount('#app')
