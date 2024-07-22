import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';

export const businessApi = createApi({
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
  tagTypes: ['Project', "UserBusiness","Business"],
  reducerPath: 'businessApi',
  endpoints: build => ({
    
    createUserBusiness: build.mutation({
      query: newBusiness => ({
        url: `/userBusiness/create`,
        method: 'POST',
        body: newBusiness,
      }),
      invalidatesTags: ['UserBusiness'],
    }),
    updateUserBusiness: build.mutation({
      query: updatedBusiness => ({
        url: `/userBusiness/update/${updatedBusiness.id}`,
        method: 'PUT',
        body: updatedBusiness.business,
      }),
      invalidatesTags: ['UserBusiness'],
    }),
    getAllUserBusinesses: build.query({
      query: contractorId => `/userBusiness/getAll/${contractorId}`,
      providesTags: ['UserBusiness'],
    }),
    getCurrentLoginUser: build.query({
      query: () => `/user/currentLoginUser`,
      providesTags: ['Business'],
    }),
    searhBusiness: build.query({
      query: name => `/business/search?name=${name}`,
      providesTags: ['Business'],
    }),
  }),
});

export const {
  useCreateUserBusinessMutation,
  useUpdateUserBusinessMutation,
  useGetAllUserBusinessesQuery,
  useSearhBusinessQuery,
  useGetCurrentLoginUserQuery
} = businessApi;
