<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pb from '../composables/usePocketBase'
import { darkTheme, websiteTheme, changeTheme } from '../globalvariables';

const model = computed(() => pb.authStore.record);
const route = useRoute();
const router = useRouter();
const isAuthenticated = ref(pb.authStore.record !== null);

onMounted(() => {
  // Updates isAuthenticated automatically
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.model !== null;
  });
});
let toggleHelloMessage = ref(false)
</script>

<!-- :class="`theme-${websiteTheme} bg-bgPrimary`" -->

<!-- class="border border-red-500 bg-red-300" -->
<!-- class="border border-blue-500 bg-blue-300" -->

<template>
  <!-- <div :class="`theme-${websiteTheme} h-[58.67px]`"></div> -->

  <div :class="`bgImg min-h-[100vh] flex flex-col items-center pt-[58.67px]`">
    <div class="mt-40">
      <p :class="`theme-${websiteTheme} text-center text-5xl font-bold text-ltColor1`">Learn Tigrigna <br> on your own
      </p>
    </div>
    <div class="my-10">
      <a :href="isAuthenticated ? '/' : '/signin'">
        <button :class="`theme-${websiteTheme} w-72 greenButtonTheme largeBtn`">Start
          learning</button>
      </a>
    </div>
  </div>
</template>

<style scoped>
.bgImg {
  background-image: url('/src/assets/images/landingpage/bg.png');
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
}

.fadebg {
  background: linear-gradient(0deg, rgba(226, 147, 0, 0), rgba(226, 169, 0, 0.201), rgba(226, 147, 0, 0));
}
</style>
