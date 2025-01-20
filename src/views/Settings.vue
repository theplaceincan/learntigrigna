<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import pb from '../composables/usePocketBase'
import { darkTheme, websiteTheme, changeTheme } from '../globalvariables';

const model = computed(() => pb.authStore.record);
const route = useRoute();
const router = useRouter();
const isAuthenticated = ref(pb.authStore.record !== null);

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function logOut() {
    pb.authStore.clear()
    router.push('/')
    open = false
}

onMounted(() => {
  // Updates isAuthenticated automatically
  pb.authStore.onChange(() => {
    isAuthenticated.value = pb.authStore.record !== null;
  });
});
</script>

<!-- :class="`theme-${websiteTheme} bg-bgPrimary`" -->

<template>
  <div class="min-h-[100vh] flex items-center justify-center">
    <div :class="`theme-${websiteTheme} bg-secondary p-2`">
      <div>
        <p :class="`theme-${websiteTheme} text-primaryText`" class="font-semibold mb-1 underline pointer-events-none">Account Information</p>
        <p :class="`theme-${websiteTheme} text-secondaryText font-semibold`"><span>Username: </span><span :class="`theme-${websiteTheme}`">{{ model.username }}</span></p>
        <p :class="`theme-${websiteTheme} text-secondaryText font-semibold`"><span>Email: </span><span :class="`theme-${websiteTheme}`">{{ model.email }}</span></p>
        <p :class="`theme-${websiteTheme} text-secondaryText font-semibold`"><span>Joined on </span><span :class="`theme-${websiteTheme}`">{{ formatDate(model.created) }}</span></p>
      </div>
      <div :class="`theme-${websiteTheme} p-[1px] bg-tertiary my-2`"></div>
      <div>
        <p :class="`theme-${websiteTheme} text-primaryText`" class="font-semibold mb-1 underline pointer-events-none">Edit account</p>
        <button :class="`theme-${websiteTheme} editSettingsButtonTheme p-[2px] px-3 rounded-md text-white font-semibold`">Edit</button>
      </div>
      <div :class="`theme-${websiteTheme} p-[1px] bg-tertiary my-2`"></div>
      <div>
        <p :class="`theme-${websiteTheme} text-primaryText`" class="font-semibold mb-1 underline pointer-events-none">Log out</p>
        <button @click="logOut()" :class="`theme-${websiteTheme} redButtonTheme p-[2px] px-3 rounded-md text-white font-semibold`">Log out</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.editSettingsButtonTheme {
  background-color: rgb(113, 113, 113);
  transition: background-color 0.2s ease;
}
.editSettingsButtonTheme:hover {
  background-color: rgb(1, 123, 194);
}
.editSettingsButtonTheme:active {
  background-color: rgb(0, 80, 114);
}

</style>
