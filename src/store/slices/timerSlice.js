import { createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    isRunning: false,
    count: 0
  },
  reducers: {
    startCountdown: state => {
      state.count = 5; // Start countdown at 5 seconds
      state.isRunning = true;
    },
    decrementCount: state => {
      if (state.count > 0) {
        state.count -= 1;
      } else {
        state.isRunning = false;
      }
    },
    stopCountdown: state => {
      state.isRunning = false;
    }
  }
});

export const { startCountdown, decrementCount, stopCountdown } = timerSlice.actions;

export default timerSlice.reducer;
