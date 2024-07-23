import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseURL } from '../../baseURL';
// register new user

export const userApi = createApi({
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
  tagTypes: ['User', 'CurrentLoginUser'],
  reducerPath: 'userApi',
  endpoints: build => ({
    registerUser: build.mutation({
      query: user => ({
        url: `/user/freeflexer/register`,
        method: 'POST',
        body: {
          email: user.email,
          addressLine1: user.addressLine1,
          addressLine2: user.addressLine2,
          addressLine3: user.addressLine3,
          postCode: user.postCode,
          city: user.city,
          firstName: user.firstName,
          surName: user.surName,
        },
      }),
      invalidatesTags: ['User'],
    }),

    registerContractor: build.mutation({
      query: user => ({
        url: `/user/contractor/register`,
        method: 'POST',
        body: {
          email: user.email,
          password:user.password,
          firstName: user.firstName,
          surName: user.surName,
        },
      }),
      invalidatesTags: ['User'],
    }),

    loginUser: build.mutation({
      query: user => ({
        url: `/user/login`,
        method: 'POST',
        body: {
          email: user.email,
          password: user.password,
        },
      }),
      invalidatesTags: ['User'],
    }),
    // getCurrentLoginUser: build.query({
    //   query: () => `/user/currentLoginUser`,
    //   providesTags: ['CurrentLoginUser'],
    // }),

    // update user information - start
    addPassword: build.mutation({
      query: user => ({
        url: `/user/freeflexer/${user.id}/addPassword`,
        method: 'PUT',
        body: {
          password: user.password,
        },
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: build.mutation({
      query: user => ({
        url: `/user/freeflexer/updateFreeflexer/${user.id}`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: ['User'],
    }),

    generateSdkToken: build.mutation({
      query: (applicantId) => ({
        url: `/user/freeflexer/generateOnfidoSdkToken`,
        method: "POST",
        body: {
          applicant_id: applicantId,
        },
      }),
      invalidatesTags: ["User"],
    }),


    updateName: build.mutation({
      query: user => ({
        url: `/api/account/users/${user.id}/updateName`,
        method: 'PATCH',
        body: {
          name: user.name,
        },
      }),
      invalidatesTags: ['User', 'Groups'],
    }),
    updateEmail: build.mutation({
      query: user => ({
        url: `/api/account/users/${user.id}/updateEmail`,
        method: 'PATCH',
        body: {
          email: user.email,
        },
      }),
      invalidatesTags: ['User', 'Groups'],
    }),
    updatePassword: build.mutation({
      query: user => ({
        url: `/user/freeflexer/${user.id}`,
        method: 'PATCH',
        body: {
          oldPassword: user.oldPassword,
          newPassword: user.newPassword,
        },
      }),
      invalidatesTags: ['User', 'Groups'],
    }),
    resetPassword: build.mutation({
      query: user => ({
        url: `/api/account/user/${user.id}/resetPassword`,
        method: 'PATCH',
        body: {
          newPassword: user.newPassword,
        },
      }),
      invalidatesTags: ['User', 'Groups'],
    }),
    updateImageURL: build.mutation({
      query: user => ({
        url: `/api/account/users/${user.id}/updateImageURL`,
        method: 'PATCH',
        body: {
          imageURL: user.imageURL,
        },
      }),
      invalidatesTags: ['User'],
    }),
    // delete user by itself
    deleteUserByItself: build.mutation({
      query: id => ({
        url: `/api/account/users/${id}/deleleUserByItSelf`,
        method: 'DELETE',
        body: {
          reson: 'Reason will be here',
        },
      }),
      invalidatesTags: ['User'],
    }),
    // forgot password
    forgotPassword: build.mutation({
      query: email => ({
        url: `/user/forgotPassword`,
        method: 'POST',
        body: {
          email: email,
        },
      }),
      invalidatesTags: ['User'],
    }),
    // Verification of OTP For Password Recovery
    VerifyOTPForPasswordRecovery: build.mutation({
      query: ({ email, OTP }) => ({
        url: `/api/account/user/VerifyOTPForPasswordRecovery`,
        method: 'POST',
        body: {
          email: email,
          OTP: OTP,
        },
      }),
      invalidatesTags: ['User'],
    }),
    // Resend email for registering new user
    resendEmailForUserRegistration: build.mutation({
      query: ({ email }) => ({
        url: `/api/account/user/register/resendEmailForUserRegistration`,
        method: 'POST',
        body: {
          email: email,
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useRegisterContractorMutation,
  useAddPasswordMutation,
  useUpdateNameMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
  useUpdateImageURLMutation,
  useDeleteUserByItselfMutation,
  useForgotPasswordMutation,
  useVerifyOTPForPasswordRecoveryMutation,
  useResetPasswordMutation,
  useResendEmailForUserRegistrationMutation,
  useUpdateUserMutation,
  useGenerateSdkTokenMutation
} = userApi;
