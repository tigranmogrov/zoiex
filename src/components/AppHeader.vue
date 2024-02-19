<script setup lang="ts">
import LogoImg from '@/assets/logo.png';
import { usePostStore } from '@/stores/post';
import { debounce } from '@/utils';
import { ref, watch } from 'vue';

withDefaults(defineProps<{ isSearchVisible?: boolean }>(), {
  isSearchVisible: true
});

const postStore = usePostStore();
const searchText = ref(postStore.searchText || '');
const fetchNewData = debounce(() => {
  postStore.fetchPosts(searchText.value);
  postStore.setSearchString(searchText.value);
}, 400);

watch(searchText, () => {
  fetchNewData();
});
</script>

<template>
  <header class="py-4">
    <v-container>
      <v-row align="center">
        <v-col cols="3">
          <v-responsive class="overflow-visible" max-width="80">
            <router-link class="pa-2 border d-block w-100" :to="{ name: 'home' }">
              <v-img
                class="flex-shrink-0 flex-grow-0"
                width="100%"
                height="100%"
                aspect-ratio="1"
                cover
                :src="LogoImg"
                alt="Logo"
              ></v-img>
            </router-link>
          </v-responsive>
        </v-col>
        <v-col v-if="isSearchVisible">
          <v-responsive class="ml-auto overflow-visible" max-width="444">
            <v-text-field
              v-model="searchText"
              rounded
              variant="solo"
              placeholder="Search"
              title="Search"
              class="flex-full-width"
              prepend-inner-icon="mdi-magnify"
              hide-details
              density="comfortable"
              type="text"
            >
            </v-text-field>
          </v-responsive>
        </v-col>
      </v-row>
    </v-container>
  </header>
</template>

<style scoped></style>
