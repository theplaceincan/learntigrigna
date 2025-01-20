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
  <div class="px-5">
    <div class="min-h-[100vh] flex sm:flex-row flex-col items-center justify-center">
      <div class="my-5 flex flex-col items-center justify-center">
        <p @mouseover="toggleHelloMessage = true" @mouseleave="toggleHelloMessage = false"
          :class="`w-fit theme-${websiteTheme} text-3xl text-secondaryText font-semibold mb-2`">
          <span v-if="!toggleHelloMessage">ሰላም፦</span>
          <span v-if="toggleHelloMessage">Hello!</span>
        </p>
        <p :class="`theme-${websiteTheme} text-center font-bold text-3xl text-primaryText`">Start <span
            :class="`theme-${websiteTheme}`">Learning Tigrigna!</span></p>
        <p :class="`theme-${websiteTheme} text-tertiaryText font-semibold`">Read, listen, and speak on your own! </p>
        <a class="my-5" :href="isAuthenticated ? '/' : '/signin'">
          <button
            :class="`theme-${websiteTheme} w-72 greenButtonTheme largeBtn`">Start
            learning</button>
        </a>
      </div>
      <div class="flex items-center justify-center">
        <img class="w-60" src="../assets/images/landingpage/design.png">
      </div>
      <div class="p-2"></div>
    </div>
  </div>
  <div class="fadebg px-5">
    <div class="p-[8px]"></div>
    <div class="flex sm:flex-row flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center max-w-[600px]">
        <p :class="`mb-1 text-center text-3xl text-primaryText font-bold`">Interative Learning</p>
        <p :class="`theme-${websiteTheme} text-tertiaryText font-semibold text-center`">Get down Tigrigna with
          lessons, quizzes, and learning games</p>
      </div>
      <div class="p-2"></div>
      <div class="flex items-center justify-center">
        <img class="w-40 sm:w-60" src="../assets/images/landingpage/phoneimg.png">
      </div>
    </div>
    <div class="p-[8px]"></div>
    <div class="flex sm:flex-row flex-col items-center justify-center">
      <div class="flex items-center justify-center">
        <img class="w-60" src="../assets/images/landingpage/culturalimg.png">
      </div>
      <div class="p-2"></div>
      <div class="flex flex-col items-center justify-center max-w-[600px]">
        <p :class="`theme-${websiteTheme} mb-1 text-center text-3xl text-primaryText font-bold`">Explore the culture</p>
        <p :class="`theme-${websiteTheme} text-tertiaryText font-semibold text-center`">Learning Tigrigna also lets
          you learn about the rich culture of Tigray (Ethiopia) and Eritrea!</p>
      </div>
    </div>
    <div class="p-[8px]"></div>
    <div class="flex sm:flex-row flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center max-w-[600px]">
        <p :class="`theme-${websiteTheme} mb-1 text-center text-3xl text-primaryText font-bold`">Why learn Tigrigna?</p>
        <p :class="`theme-${websiteTheme} text-tertiaryText font-semibold text-center`">With Tigrigna, you can
          discover the rich cultural heritage of Ethiopia and Eritrea - a language spoken by 9.8 million people and
          with roots dating back to the 14th century.</p>
        <p :class="`theme-${websiteTheme} text-tertiaryText font-semibold text-center`">Learning Tigrigna open doors
          to opportunities in Ethiopia and Eritrea, new friendships, deeper cultural understanding, family
          connections, and a world of tradition and history.</p>
      </div>
      <div class="p-2"></div>
      <div class="flex items-center justify-center">
        <img class="w-[400px]" src="../assets/images/landingpage/hellohowareyou.png">
      </div>
    </div>
    <div class="p-[8px]"></div>
    <div class="flex sm:flex-row flex-col items-center justify-center">
      <div class="flex flex-col items-center justify-center">
        <img class="w-72" src="../assets/images/landingpage/devices.png">
      </div>
      <div class="p-2"></div>
      <div class="flex flex-col items-center justify-center max-w-[600px]">
        <p :class="`theme-${websiteTheme} mb-1 text-center text-3xl text-primaryText font-bold`">All ages, any time!</p>
        <p :class="`theme-${websiteTheme} text-tertiaryText font-semibold text-center`">Learn Tigrigna on any device,
          any age, anytime, with anyone!</p>
      </div>
    </div>
    <div class="p-[8px]"></div>
  </div>
  <div class="h-32">

  </div>
</template>

<style scoped>
.fadebg {
  background: linear-gradient(0deg, rgba(226, 147, 0, 0), rgba(0, 226, 185, 0.201), rgba(226, 147, 0, 0));
}
</style>
