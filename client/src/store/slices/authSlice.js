import { createSlice } from '@reduxjs/toolkit';
import { loginThunk, reissueThunk } from '../thunks/authThunk.js';

const initialState = {
  accessToken: null,
  user: null,
  isLoggedIn: false
};

const slice = createSlice ({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth(state) {
      state.accessToken = null; // 메모리에 저장된 accessToken
      state.user = null;
      state.isLoggedIn = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload.data;
        state.accessToken = accessToken;
        state.user = user;
        state.isLoggedIn = true;
      })
    builder
      .addCase(reissueThunk.fulfilled, (state, action) => {
        const { accessToken, user } = action.payload.data;
        state.accessToken = accessToken;
        state.user = user;
        state.isLoggedIn = true;
      })
  },
});

export const {
  clearAuth
} = slice.actions;

export default slice.reducer;

