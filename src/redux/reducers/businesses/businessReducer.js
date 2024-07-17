import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  businesses: []
};

export const BusinessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    handleJobs: (state, action) => {
      state.jobs = action.payload
    },
    handleBusiness: (state, action) => {
      state.businesses = action.payload
    },
  },

});

export const { handleJobs, handleBusiness } = BusinessSlice.actions;

export default BusinessSlice.reducer;
