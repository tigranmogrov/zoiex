<script setup lang="ts">
import { usePostStore } from '@/stores/post';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const postStore = usePostStore();
const isLoaded = ref(true);
const { currentPost, trendingPosts } = storeToRefs(postStore);
postStore.getPostById(String(route.params.id)).finally(() => (isLoaded.value = false));
postStore.getTrendingPosts();
</script>

<template>
  <v-container v-if="!isLoaded">
    <div v-if="currentPost">
      <h1 class="text-xl-body-1">{{ currentPost.title || 'Title' }}</h1>
      <h3 class="mt-4">
        User:
        <router-link
          v-if="currentPost.username"
          :to="{ name: 'user', params: { id: `${currentPost.id}-${currentPost.username}` } }"
          class="text-blue-accent-2"
        >
          {{ currentPost.username }}
        </router-link>
        <span v-else>does not exist</span>
      </h3>
      <v-row class="mt-4">
        <v-col class="mx-md-auto" cols="12" sm="5">
          <v-img
            aspect-ratio="1"
            cover
            class="bg-grey-lighten-2 border"
            :src="currentPost.images.original.url"
            :lazy-src="`https://picsum.photos/10/6?image=${3 * 5 + 10}`"
            :alt="currentPost.title || currentPost.slug"
          />
        </v-col>
        <v-col cols="12" md="7">
          <v-slide-group class="py-4 py-md-0" show-arrows>
            <v-slide-group-item v-for="post in trendingPosts" :key="post.id">
              <v-card class="ma-2 ma-md-4" height="170" width="100">
                <v-img
                  aspect-ratio="1"
                  cover
                  width="100%"
                  height="100%"
                  class="bg-grey-lighten-2"
                  :src="post.images.fixed_height.url"
                  :lazy-src="`https://picsum.photos/10/6?image=${3 * 5 + 10}`"
                  :alt="post.title || post.slug"
                />
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </v-col>
      </v-row>
    </div>
    <v-alert v-else title="Oops..." text="Not found Giphy" class="bg-red-accent-3" />
  </v-container>
</template>

<style></style>
