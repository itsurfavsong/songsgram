import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postIndexThunk = createAsyncThunk(
  'postIndex/postIndexThunk', // Thunk 고유명
  async (page, { rejectWithValue }) =>  {
    try {
      const url = '/api/posts';
      const params = { page }; // 무조건 params라는 이름으로 선언해야함. **구조분해 문법**

      const response = await axiosInstance.get(url, { params });

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
