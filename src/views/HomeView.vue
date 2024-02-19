<script setup lang="ts">
import { usePostStore } from '@/stores/post';
import { storeToRefs } from 'pinia';

const postStore = usePostStore();

const { isLoading, isNotPosts, allPosts } = storeToRefs(postStore);
const shareGiphy = async (url: string, text: string) => {
  try {
    await navigator.share({ url, text });
  } catch (err) {
    console.error(`Error: ${err}`);
  }
};
const load = ({ done }: { done: any }): void => {
  if (!postStore.isLastPage) {
    postStore.fetchLoadMorePosts().then(() => done('ok'));
  } else {
    done('empty');
  }
};
const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>

<template>
  <v-container v-if="!isLoading">
    <v-infinite-scroll
      v-if="!isNotPosts"
      min-height="600px"
      direction="vertical"
      class="overflow-x-hidden"
      mode="intersect"
      :onLoad="load"
    >
      <transition-group class="v-row" name="list" tag="div">
        <v-col
          v-for="giphy in allPosts"
          :key="giphy.id"
          class="d-flex flex-column ga-3 item overflow-hidden"
          cols="6"
          md="4"
          lg="3"
        >
          <router-link class="d-block w-100" :to="{ name: 'giphy', params: { id: giphy.id } }">
            <v-img
              aspect-ratio="1"
              cover
              class="bg-grey-lighten-2 border"
              :src="giphy.images.fixed_height_downsampled.url"
              :lazy-src="`https://picsum.photos/10/6?image=${3 * 5 + 10}`"
              :alt="giphy.title || giphy.slug"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </router-link>
          <v-btn
            class="text-none text-subtitle-1 v-btn--size-large"
            color="#5865f2"
            size="small"
            variant="flat"
            @click="shareGiphy(giphy.url, giphy.title)"
          >
            <v-icon class="mr-2" icon="mdi-share-variant" />
            Share
          </v-btn>
        </v-col>
      </transition-group>
    </v-infinite-scroll>
    <v-img
      v-else
      aspect-ratio="1"
      cover
      width="300"
      height="340"
      src="https://media2.giphy.com/media/14uQ3cOFteDaU/200.gif?cid=854c71f0gb41h6nqgj53o2tfm0qe3z75p6tvof5t9lvc611b&ep=v1_gifs_search&rid=200.gif&ct=g"
      class="giphy-embed mx-auto mt-16"
    />
    <v-btn
      style="position: fixed; bottom: 20px; right: 20px"
      icon="mdi-arrow-up-bold"
      color="primary"
      aria-label="To top"
      @click="scrollTop"
    ></v-btn>
  </v-container>
</template>

<style scoped lang="css">
.list-enter-active,
.list-leave-active {
  transition: all 0.8s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
