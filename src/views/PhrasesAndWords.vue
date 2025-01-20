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
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.record !== null;
  });
});
</script>

<!-- :class="`theme-${websiteTheme} bg-bgPrimary`" -->

<template>
<div class="min-h-[100vh] flex items-center justify-center">
  <p :class="`theme-${websiteTheme} text-primaryText`">Phrases and Words</p>
</div>
</template>

<style scoped>
</style>
