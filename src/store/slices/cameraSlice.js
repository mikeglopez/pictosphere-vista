import { createSlice } from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
  name: 'camera',
  initialState: {
    isPhotographing: false
  },
  reducers: {
    toggleCamera: (state) => {
      state.isPhotographing = !state.isPhotographing;
    }
  }
});

export const  { toggleCamera } = cameraSlice.actions;

export default cameraSlice.reducer;