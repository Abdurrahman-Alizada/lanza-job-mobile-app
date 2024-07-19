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
  tagTypes: ['Job', "JobDetails"],
  reducerPath: 'jobApi',
  endpoints: build => ({

    createJob: build.mutation({
      query: newJob => ({
        url: `/jobs/create`,
        method: 'POST',
        body: newJob,
      }),
      invalidatesTags: ["Job"],
    }),
    getAllJobs: build.query({
      query: data => `/jobs/getAll/${data.freeflexerId}?${data.filters}`,
      providesTags: ['Job'],
    }),
    getJobDetails: build.query({
      query: data => `/jobs/getJobDetails/${data.id}/${data.freeflexerId}`,
      providesTags: ['Job',"JobDetails"],
    }),

  }),
});


export const {
  useCreateJobMutation,
  useGetAllJobsQuery,
  useGetJobDetailsQuery
} = jobApi;
