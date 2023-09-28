import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './slices/cameraSlice';
import timerReducer from './slices/timerSlice';

const store = configureStore({
  reducer: {
    camera: cameraReducer,
    timer: timerReducer
  }
});

export default store;