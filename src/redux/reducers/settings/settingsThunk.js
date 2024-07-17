import AsyncStorage from '@react-native-async-storage/async-storage';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseURL} from '../../baseURL';

export const settingApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: async (headers, {getState}) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Groups', 'CurrentLoginUser'],
  reducerPath: 'settingsApi',
  endpoints: build => ({
    registerrUser: build.mutation({
      query: user => ({
        url: `/api/account/user/register`,
        method: 'POST',
        body: {
          name: user.name,
          email: user.email,
          password: user.password,
          passwordConfirmation: user.passwordConfirmation,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {useRegisterrUserMutation} = settingApi;
