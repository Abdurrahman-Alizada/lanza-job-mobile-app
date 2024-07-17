import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: "",
  currentLoginUser: {},
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    handleCurrentLoaginUser: (state, action) => {
      console.log("currentlogin", action.payload)
      state.currentLoginUser = action.payload
    },
    handleRole: (state, action) => {
      state.role = action.payload
    },
    handlePasswordResetSuccessfully: (state, action) => {
      state.passwordResetSuccessflly = action.payload
    },
  },

});

// Action creators are generated for each case reducer function
export const { handleCurrentLoaginUser, handlePasswordResetSuccessfully, handleRole } = UserSlice.actions;

export default UserSlice.reducer;
