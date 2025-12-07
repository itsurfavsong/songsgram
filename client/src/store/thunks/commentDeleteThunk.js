import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const postCommentDeleteThunk = createAsyncThunk(
  'postComment/postCommentDeleteThunk', // Thunk 고유명
  async (id, { rejectWithValue }) => {
    try {
      const url = `/api/comments/${id}`;

      const response = await axiosInstance.delete(url);

      return response.data;
    } catch(error) {
      return rejectWithValue(error);
    }
  }
);

// export const clearPostCommentDelete = createAsyncThunk(
//   'postComment/clearPostCommentDelete', 
//   async (_, { rejectWithValue }) => {
//     try {
//       const url = '/api/posts/clearDelete';
//       const response = await axiosInstance.delete(url);

//       return response.data;
//     } catch(error) {
//       return rejectWithValue(error);
//     }
//   }
// );