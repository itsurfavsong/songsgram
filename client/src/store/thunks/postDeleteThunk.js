import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postDeleteThunk = createAsyncThunk(
  'postShow/postDeleteThunk', // Thunk 고유명
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/posts/${id}`;

      const response = await axiosInstance.delete(url);

      return response.data;
    } catch(error) {
      return rejectWithValue(error);
    }
  }
);

export const clearPostDelete = createAsyncThunk(
  'postShow/clearPostDelete', // Thunk 고유명
  async (_, { rejectWithValue }) => {
    try {
      const url = '/api/posts/clearDelete';
      const response = await axiosInstance.delete(url);

      return response.data;
    } catch(error) {
      return rejectWithValue(error);
    }
  }
);