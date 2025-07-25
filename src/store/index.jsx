import { configureStore } from '@reduxjs/toolkit';
import settingReducer from './setting/reducers';
import authReducer from './auth/reducer';
export const store = configureStore({
  reducer: {
    setting: settingReducer,
    auth: authReducer
  }
});

