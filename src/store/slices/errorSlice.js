import { createSlice } from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    hasError: false
  },
  reducers: {
    setError: (state) => {
      state.hasError = true;
    }
  }
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;