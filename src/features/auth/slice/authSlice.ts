import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

import { loginApi, logoutApi, signupApi,} from '../api/authApi';

import {setToken, removeToken, getToken,} from '../../../services/mmkv';

import { UserState } from '../types/authTypes';

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isLoggedIn: !!getToken(),
};

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await signupApi(
        email,
        password,
      );

      const token =
        await response.user.getIdToken();

      setToken(token);

      const user = response.user;

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };

    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message,
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    thunkAPI,
  ) => {
    try {
      const response = await loginApi(
        email,
        password,
      );

      const token =
        await response.user.getIdToken();

      setToken(token);

      const user = response.user;

      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message,
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await logoutApi();

      removeToken();

      return true;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message,
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder

      // Signup
      .addCase(signupUser.pending, state => {
        state.loading = true;
      })

      .addCase(
        signupUser.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isLoggedIn = true;
        },
      )

      .addCase(
        signupUser.rejected,
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      // Login
      .addCase(loginUser.pending, state => {
        state.loading = true;
      })

      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isLoggedIn = true;
        },
      )

      .addCase(
        loginUser.rejected,
        (state, action: any) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      // Logout
      .addCase(
        logoutUser.fulfilled,
        state => {
          state.user = null;
          state.isLoggedIn = false;
        },
      );
  },
});

export default authSlice.reducer;