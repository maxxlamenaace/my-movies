import axios, { AxiosResponse } from 'axios';

import { API_URL } from '@/config';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  return {
    ...config,
    params: {
      ...config.params,
      api_key: '1dcd4c2083e3c167f1d359c938a2290b',
    },
  };
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    } else {
      throw error;
    }
  },
);

export default apiClient;
