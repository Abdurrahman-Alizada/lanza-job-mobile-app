import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';

export const projectApi = createApi({
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
  tagTypes: ["Project"],
  reducerPath: 'projectApi',
  endpoints: build => ({
    
    createProject: build.mutation({
      query: newProject => ({
        url: `/project/create`,
        method: 'POST',
        body: newProject,
      }),
      invalidatesTags: ["Project"],
    }),
    updateUserBusiness: build.mutation({
      query: updatedBusiness => ({
        url: `/userBusiness/update/${updatedBusiness.id}`,
        method: 'PUT',
        body: updatedBusiness.business,
      }),
      invalidatesTags: ["Project"],
    }),
    getAllProjects: build.query({
      query: contractorId => `/project/getAll/${contractorId}`,
      providesTags: ["Project"],
    }),

    searhBusiness: build.query({
      query: name => `/business/search?name=${name}`,
      providesTags: ["Project"],
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useUpdateUserBusinessMutation,
  useGetAllProjectsQuery,
  useSearhBusinessQuery
} = projectApi;
