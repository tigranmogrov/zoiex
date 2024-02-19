import { API_KEY, API_URL } from '@/constants';
import axios from 'axios';

export const API = axios.create({
  baseURL: `${API_URL}`,
  params: {
    api_key: API_KEY
  }
});
