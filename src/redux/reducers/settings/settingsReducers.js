import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentLanguage: 'en',
};

export const SettingSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    handleCurrentLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {handleCurrentLanguage} = SettingSlice.actions;

export default SettingSlice.reducer;
