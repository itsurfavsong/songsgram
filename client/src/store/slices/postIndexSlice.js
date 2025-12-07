import { createSlice } from '@reduxjs/toolkit';
import { postIndexThunk } from '../thunks/postIndexThunk.js';
import { postDeleteThunk } from '../thunks/postDeleteThunk.js';

const initialState = {
  list: null,
  page: 0,
  isLasted: false,
};

const slice = createSlice ({
  name: 'postIndex',
  initialState,
  reducers: {
    clearPostIndex(state) {
      state.list = null;
      state.page = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postIndexThunk.fulfilled, (state, action) => {
        const { posts, page, count, limit } = action.payload.data; // 구조 분해

        // 리스트가 비어있는 지 체크
        if(state.list) {
          state.list = [...state.list, ...posts];
        } else {
          state.list = posts;
        }

        // 현재 페이지 저장
        state.page = page;

        // 마지막 페이지 여부 플래그 저장
        state.isLasted = (page * limit) >= count;
      })
      .addCase(postDeleteThunk.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;

        if (!state.list) return;

        state.list = state.list.filter((post) => post.id !== deletedId);
      });
  }
});

export const {
  clearPostIndex
} = slice.actions;

export default slice.reducer;

