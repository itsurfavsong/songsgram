import { createSlice } from '@reduxjs/toolkit';
import { postShowThunk } from '../thunks/postShowThunk.js';
import { postDeleteThunk } from '../thunks/postDeleteThunk.js';
import { postCommentDeleteThunk } from '../thunks/commentDeleteThunk.js';

const initialState = {
  show: null,
}

const slice = createSlice({
  name: 'postShow',
  initialState,
  reducers: {
    clearPostShow(state) {
      state.show = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postShowThunk.fulfilled, (state, action) => {
        state.show = action.payload.data;
      })
      .addCase(postDeleteThunk.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        if (state.show?.id === deletedId) {
          state.show = null;
        }   
      })
      .addCase(postCommentDeleteThunk.fulfilled, (state, action) => {
        const deletedId = action.meta.arg; // 삭제 요청할 때 넘긴 댓글 id
        if (!state.show?.comts) return;
        state.show.comts = state.show.comts.filter(
          (comment) => comment.id !== deletedId
        );
      });
  }
});

export const {
  clearPostShow,
} = slice.actions;

export default slice.reducer;
