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
    allPosts: (state): IPostData[] => state.posts,
    totalPage: (state): number => Math.floor(state.pagination.totalCount / state.pagination.limit),
    currentPage: (state): number => state.pagination.currentPage,
    isLastPage(): boolean {
      return this.currentPage >= this.totalPage;
    },
    isNotPosts: (state): boolean => state.isNotFoundPosts
  },
  actions: {
    async fetchPosts(offset: number = 0): Promise<void> {
      try {
        const {
          data: { data, pagination }
        }: { data: IPost } = await API.get('/search', {
          params: {
            q: this.searchText || DEFAULT_SEARCH_VALUE,
            limit: this.pagination.limit,
            offset
          }
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
    },
    async getPostById(id: string): Promise<void> {
      try {
        const {
          data: { data }
        }: { data: { data: IPostData } } = await API.get(`/${id}`);
        this.currentPost = data;
      } catch (error) {
        console.error(error);
      }
    },
    async getTrendingPosts(): Promise<void> {
      try {
        const {
          data: { data }
        }: { data: IPost } = await API.get(`/trending`, {
          params: {
            offset: randomNumber(0, 200),
            rating: 'g',
            bundle: 'messaging_non_clips',
            limit: this.pagination.limit
          }
        });
        this.trendingPosts = data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchLoadMorePosts(): Promise<void> {
      try {
        const {
          data: { data }
        }: { data: IPost } = await API.get('/search', {
          params: {
            q: this.searchText || DEFAULT_SEARCH_VALUE,
            limit: this.pagination.limit,
            offset: this.pagination.currentOffset
          }
        });
        this.posts.push(...data);
        this.increasePage();
      } catch (error) {
        console.error(error);
      }
    },
    setSearchString(searchString: string) {
      this.searchText = searchString.length ? searchString : '';
    },
    increasePage() {
      this.pagination.currentPage += 1;
      this.pagination.currentOffset += this.pagination.limit;
    }
  }
});
