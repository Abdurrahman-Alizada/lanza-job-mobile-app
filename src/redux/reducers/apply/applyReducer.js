import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applies: [],
};

export const ApplySlice = createSlice({
  name: 'apply',
  initialState,
  reducers: {
    handleApplies: (state, action) => {
      state.applies = action.payload
    },

  },

});

export const { handleApplies } = ApplySlice.actions;

export default ApplySlice.reducer;
