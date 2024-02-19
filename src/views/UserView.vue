<script setup lang="ts">
import { usePostStore } from '@/stores/post';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const route = useRoute();
const postStore = usePostStore();
const routeId = String(route.params.id).split('-');
postStore.getPostById(routeId[0]);
const { currentPost: post } = storeToRefs(postStore);
</script>
<template>
  <v-container>
    <div v-if="post">
      <v-list>
        <v-list-item class="mt-2" :title="post.user?.username">
          <template #prepend>
            <v-avatar class="mt-2" rounded :image="post.user?.avatar_url" size="80"></v-avatar>
          </template>
          <template #default>
            <a
              class="d-flex mt-2 text-blue-accent-2"
              :href="post.user?.profile_url"
              target="_blank"
            >
              Link Giphy
            </a>
          </template>
        </v-list-item>
        <v-list-item>
          <v-btn class="bg-primary" @click="$router.go(-1)"> Back to Giphy? </v-btn>
        </v-list-item>
      </v-list>
    </div>
  </v-container>
</template>

<style></style>
