import { createSlice } from '@reduxjs/toolkit';

export const timerSlice = createSlice({
  name: 'timer',
  initialState: {
    isRunning: false,
    hasRun: false,
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
      state.hasRun = true;
    },
    resetCountdown: state => {
      state.isRunning = false;
      state.hasRun = false;
      state.count = 0;
    }
  }
});

export const { startCountdown, decrementCount, stopCountdown, resetCountdown } = timerSlice.actions;

export default timerSlice.reducer;
