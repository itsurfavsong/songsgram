import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const loginThunk = createAsyncThunk(
  'auth/loginThunk',
  async (args, { rejectWithValue }) => {
    try {
      const url = '/api/auth/login';
      const { email, password } = args;

      const response = await axiosInstance.post(url, { email, password });

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// 토큰 재발급
export const reissueThunk = createAsyncThunk(
  'auth/reissueThunk',
  async (_, { rejectWithValue }) => { // 쿠키에 실려있는 토큰이 파미로 올거니까 파미 없음.
    try {
      const url = '/api/auth/reissue';
      const response = await axiosInstance.post(url);

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
