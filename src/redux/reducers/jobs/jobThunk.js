import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';

export const jobApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers, { getState }) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Job'],
  reducerPath: 'jobApi',
  endpoints: build => ({
    
    getAllJobs: build.query({
      query: filters => `/jobs/getAll?${filters}`,
      providesTags: ['Job'],
    }),
    getJobDetails: build.query({
      query: id => `/jobs/getJobDetails/${id}`,
      providesTags: ['Job'],
    }),

  }),
});

export const {
useGetAllJobsQuery,
useGetJobDetailsQuery
} = jobApi;
