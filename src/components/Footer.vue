<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pb from '../composables/usePocketBase'
import { darkTheme, websiteTheme, changeTheme } from '../globalvariables';

const model = computed(() => pb.authStore.record);
const route = useRoute();
const router = useRouter();
const isAuthenticated = ref(pb.authStore.record !== null);

let links_help = ref([
  { name: "Settings", url: "/settings" },
])

let links_social = ref([
  { name: "Instagram", url: "https://www.instagram.com/learntigrigna/" },
])


onMounted(() => {
  // Updates isAuthenticated automatically
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.record !== null;
  });
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<!-- :class="`theme-${websiteTheme} bg-bgPrimary`" -->

<template>
  <div :class="`theme-${websiteTheme} border-tertiary`"
    class="border-t-2 p-3 flex flex-col items-center justify-center space-y-1">
    <div class="space-x-2">
      <a :href="link.url" v-for="link in links_help" :class="`theme-${websiteTheme} transition ease-in-out font-semibold text-quaternaryText hover:text-ltColor1 active:text-ltColorDark`">{{ link.name }}</a>
    </div>
    <div class="space-x-2">
      <a target="_blank" :href="link.url" v-for="link in links_social" :class="`theme-${websiteTheme} transition ease-in-out font-semibold text-quaternaryText hover:text-ltColor1 active:text-ltColorDark`">{{ link.name }}</a>
    </div>
  </div>
</template>

<style scoped></style>
