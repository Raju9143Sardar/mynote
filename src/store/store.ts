import { configureStore } from '@reduxjs/toolkit';
import appbarReducer from '../components/app_bar/slice/appbarSlice';
import authReducer from '../features/auth/slice/authSlice';
import { appbarMiddleware } from '../components/app_bar/middleware/appbarMiddleware';

export const store = configureStore({
  reducer: {
    appbar: appbarReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appbarMiddleware),
});

//Infer RootState type from store itself
export type RootState = ReturnType<typeof store.getState>;

//Infer AppDispatch type from store itself
export type AppDispatch = typeof store.dispatch;
