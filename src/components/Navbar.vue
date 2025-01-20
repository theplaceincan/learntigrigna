<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pb from '../composables/usePocketBase'
import { darkTheme, websiteTheme, changeTheme } from '../globalvariables';

const model = computed(() => pb.authStore.record);
const route = useRoute();
const router = useRouter();

const isAuthenticated = ref(pb.authStore.record !== null);

// Toggle global dark/light theme
function toggleTheme() {
  darkTheme.value = !darkTheme.value
  changeTheme()
  if (darkTheme.value) {
  } else {
  }
  console.log(`New theme: ${websiteTheme.value}`);
}

// Unstick navbar from top if scrolling
const isScrolled = ref(false);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const isNotHomePage = computed(() => {
  return route.path !== '/';
});

onMounted(() => {
  window.addEventListener('scroll', handleScroll);

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
  <div :class="[`theme-${websiteTheme} bg-bgPrimary`, { 'shadow-md': isScrolled }]"
    class="w-full transition ease-in-out stick">
    <!-- justify-between px-2 py-1 -->
    <div class="flex justify-center items-center py-1">
      <div class="flex items-center justify-center">
        <a href="/">
          <img v-if="websiteTheme == 'light'" class="w-64" src="../assets/images/logos/textlogo.png">
          <img v-if="websiteTheme == 'dark'" class="w-64" src="../assets/images/logos/textlogodark.png">
        </a>
      </div>
      <div class="flex items-center justify-center">
        <button
          :class="`theme-${websiteTheme} text-primaryText bg-quaternary transition ease-in-out p-1 rounded-full hover:bg-tertiary active:bg-ltColorDark`"
          @click="toggleTheme()">
          <svg v-if="darkTheme" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
          <svg v-if="!darkTheme" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        </button>
      </div>
    </div>
    <div>
      
    </div>
  </div>
</template>

<style scoped>
.stick {
  position: fixed;
}
</style>
