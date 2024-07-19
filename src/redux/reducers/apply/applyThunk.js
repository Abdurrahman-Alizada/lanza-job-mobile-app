import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';

export const applyApi = createApi({
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
  tagTypes: ['Apply'],
  reducerPath: 'applyApi',
  endpoints: build => ({

    createApply: build.mutation({
      query: newApply => ({
        url: `/apply/create`,
        method: 'POST',
        body: newApply,
      }),
      invalidatesTags: ["Apply"],
    }),
    getAllJobs: build.query({
      query: filters => `/jobs/getAll?${filters}`,
      providesTags: ['Apply'],
    }),
    getJobDetails: build.query({
      query: id => `/jobs/getJobDetails/${id}`,
      providesTags: ['Apply'],
    }),

  }),
});


export const {
  useCreateApplyMutation,
  useGetAllJobsQuery,
  useGetJobDetailsQuery
} = applyApi;
