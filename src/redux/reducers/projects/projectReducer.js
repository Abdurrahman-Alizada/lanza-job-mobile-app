import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: []
};

export const ProjectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    handleProjects: (state, action) => {
      state.projects = action.payload
    },
  },
});

export const { handleProjects } = ProjectSlice.actions;

export default ProjectSlice.reducer;
