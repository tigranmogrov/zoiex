export interface IOnclick {
  url: string;
}

export interface IAnalytics {
  onload: IOnclick;
  onclick: IOnclick;
  onsent: IOnclick;
}

export interface IDefaultImage {
  height: string;
  width: string;
  size: string;
  url: string;
}

export interface IDownsizedSmall {
  height: string;
  width: string;
  mp4_size: string;
  mp4: string;
}

export interface IFixedHeight extends IDefaultImage {
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
  frames: string;
  hash: string;
}

export interface ILooping {
  mp4_size: string;
  mp4: string;
}

export interface IImages {
  original: IFixedHeight;
  downsized: IDefaultImage;
  downsized_large: IDefaultImage;
  downsized_medium: IDefaultImage;
  downsized_small: IDownsizedSmall;
  downsized_still: IDefaultImage;
  fixed_height: IFixedHeight;
  fixed_height_downsampled: IFixedHeight;
  fixed_height_small: IFixedHeight;
  fixed_height_small_still: IDefaultImage;
  fixed_height_still: IDefaultImage;
  fixed_width: IFixedHeight;
  fixed_width_downsampled: IFixedHeight;
  fixed_width_small: IFixedHeight;
  fixed_width_small_still: IDefaultImage;
  fixed_width_still: IDefaultImage;
  looping: ILooping;
  original_still: IDefaultImage;
  original_mp4: IDownsizedSmall;
  preview: IDownsizedSmall;
  preview_gif: IDefaultImage;
  preview_webp: IDefaultImage;
  '480w_still': IDefaultImage;
  hd: IDownsizedSmall;
}

export interface IUser {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

export interface IMeta {
  status: number;
  msg: string;
  response_id: string;
}

export interface IPagination {
  total_count: number;
  count: number;
  offset: number;
}
export interface IPostData {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: IImages;
  user: IUser;
  analytics_response_payload: string;
  analytics: IAnalytics;
}

export interface IPost {
  data: IPostData[];
  meta: IMeta;
  pagination: IPagination;
}
export interface IPostStore {
  posts: IPostData[];
  currentPost: IPostData | null;
  trendingPosts: IPostData[];
  searchText: string;
  isNotFoundPosts: boolean;
  isLoading: boolean;
  pagination: {
    limit: number;
    currentPage: number;
    totalCount: number;
    currentOffset: number;
  };
}
