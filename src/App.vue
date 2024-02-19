<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';
import { computed, reactive, ref, shallowRef } from 'vue';
import { RouterView, useRouter } from 'vue-router';

const router = useRouter();

const layoutName = ref('');

const layouts = reactive<{ [key: string]: any }>({
  default: shallowRef(DefaultLayout),
  empty: shallowRef(EmptyLayout)
});

router.beforeEach((to) => {
  to.meta.layout ? (layoutName.value = String(to.meta.layout)) : (layoutName.value = 'default');
});
const getLayout = computed(() => layouts[String(layoutName.value)]);
</script>

<template>
  <component :is="getLayout">
    <router-view />
  </component>
</template>

<style scoped></style>
