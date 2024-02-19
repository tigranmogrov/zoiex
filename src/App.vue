<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import { computed, reactive, shallowRef } from 'vue';
import { RouterView, useRoute } from 'vue-router';

const route = useRoute();

const layouts = reactive<{ [key: string]: any }>({
  default: shallowRef(DefaultLayout),
  empty: shallowRef(EmptyLayout)
});

const getLayout = computed(() => layouts[String(route.meta.layout)]);
</script>

<template>
  <component :is="getLayout">
    <router-view />
  </component>
</template>

<style scoped></style>
