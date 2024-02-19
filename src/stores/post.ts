import { API } from '@/api/axios';
import { DEFAULT_SEARCH_VALUE } from '@/constants';
import type { IPost, IPostData, IPostStore } from '@/types/post.types';
import { randomNumber } from '@/utils';
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
  },
  getters: {
    allPosts: (state): IPostData[] => state.posts
  },
  actions: {
    async fetchPosts(searchString?: string, offset: number = 0): Promise<void> {
      try {
        const {
          data: { data, pagination }
        }: { data: IPost } = await API.get('/search', {
          params: { q: searchString || DEFAULT_SEARCH_VALUE, limit: this.pagination.limit, offset }
        });
        this.isNotFoundPosts = false;
        this.posts = data;
        this.pagination.totalCount = pagination['total_count'];
        this.pagination.currentPage = 0;
        this.pagination.currentOffset = 0;
        if (pagination['total_count'] === 0) {
          this.isNotFoundPosts = true;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});
