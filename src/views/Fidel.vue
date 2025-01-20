<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pb from '../composables/usePocketBase'
import { websiteTheme, fidel } from '../globalvariables';

const model = computed(() => pb.authStore.record);
const route = useRoute();
const router = useRouter();
const isAuthenticated = ref(pb.authStore.record !== null);



onMounted(() => {
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.record !== null;
  });
});
</script>

<!-- :class="`theme-${websiteTheme} bg-bgPrimary`" -->

<template>
  <div :class="`theme-${websiteTheme} h-[58.67px]`"></div>
  <div class="min-h-[100vh] flex flex-col items-center justify-center">
    <!-- <p :class="`theme-${websiteTheme} text-secondaryText italic mt-5`">Click on the letters to hear their sound.</p> -->
    <div class="grid grid-cols-7 my-3 px-2">
      <button :class="`theme-${websiteTheme} p-1 letterButton text-3xl`" v-for="e in fidel">{{ e.letter }}</button>
    </div>
  </div>
</template>

<style scoped>
    .letterButton {
        background-color: #00b37a48;
        color: var(--color-primaryText);
        border: 1px solid rgba(81, 132, 81, 0.658);

        transition: background-color 0.2s ease, transform 0.2s ease, border 0.2s ease;
    }

    .letterButton:hover {
      background-color: #b3740048;
      border: 1px solid #bb9645;
    }

    .letterButton:active {
      background-color: #b374006c;
        border: 1px solid #bb9645;
    }
</style>
