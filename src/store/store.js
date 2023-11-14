import { configureStore } from '@reduxjs/toolkit';
import cameraReducer from './slices/cameraSlice';
import timerReducer from './slices/timerSlice';
import errorReducer from './slices/errorSlice';

const store = configureStore({
  reducer: {
    camera: cameraReducer,
    timer: timerReducer,
    error: errorReducer
  }
});

export default store;