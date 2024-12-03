import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from './budgetSlice';

const store = configureStore({
  reducer: {
    budget: budgetReducer,
  },
});

export default store;
