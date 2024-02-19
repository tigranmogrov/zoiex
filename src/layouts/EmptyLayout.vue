<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <app-header :is-search-visible="false" />
  <v-layout>
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
