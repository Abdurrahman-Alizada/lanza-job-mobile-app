import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
  businesses: []
};

export const JobSlice = createSlice({
  name: 'job',
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

export const { handleJobs, handleBusiness } = JobSlice.actions;

export default JobSlice.reducer;
