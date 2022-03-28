import { configureStore } from '@reduxjs/toolkit';
import postersReducer from '../features/poster/postersSlice';

export default configureStore({
  reducer: {
    posters: postersReducer
  }
});
