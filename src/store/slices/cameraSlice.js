import { createSlice } from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    isPhotographing: false,
    isFlashing: false
  },
  reducers: {
    toggleCamera: (state) => {
      state.isPhotographing = !state.isPhotographing;
    },
    toggleFlashing: (state, action) => {
      state.isFlashing = !state.isFlashing;
    }
  }
});

export const  { toggleCamera, toggleFlashing } = cameraSlice.actions;

export default cameraSlice.reducer;