import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [],
};

export const JobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleJobs: (state, action) => {
      state.jobs = action.payload
    },

  },

});

export const { handleJobs } = JobSlice.actions;

export default JobSlice.reducer;
