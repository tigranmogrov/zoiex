import type { IPostStore } from '@/types/post.types';
import { defineStore } from 'pinia';

export const usePostStore = defineStore('post', {
  state(): IPostStore {
    return {
      posts: [],
      currentPost: null,
      trendingPosts: [],
      searchText: '',
      isNotFoundPosts: false,
      isLoading: true,
      pagination: {
        totalCount: 0,
        limit: 20,
        currentOffset: 0,
        currentPage: 0
      }
    };
  }
});
