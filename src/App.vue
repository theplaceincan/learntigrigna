<script setup lang="ts">
import Footer from '../src/components/Footer.vue'
import Navbar from '../src/components/Navbar.vue'

import { websiteTheme } from './globalvariables.ts';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<template>
  <div :class="`theme-${websiteTheme} bg-bgPrimary`">
    <Navbar v-if="route.path !== '/welcome'"></Navbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
