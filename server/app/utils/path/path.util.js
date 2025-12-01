/**
 * @file app/utils/path/path.util.js
 * @description path 유틸
 * 251128 v1.0.0 BSong1 init
 */

import path from 'path';

function getViewDirPath() {
  const __dirname = process.env.APP_MODE !== 'dev' ? process.env.APP_DIST_PATH : path.resolve(process.env.APP_DIST_PATH);

  return path.join(__dirname, 'index.html'); // 예약어, 그리고 __ 쓰는 이유는 우리가 만들었어! 자체 제작이라는 걸 명시
}

function getPostsImagePath() {
  return process.env.APP_MODE !== 'dev' ? process.env.FILE_POST_IMAGE_PATH : path.resolve(process.env.FILE_POST_IMAGE_PATH);
}

function getProfilesImagePath() {
  return process.env.APP_MODE !== 'dev' ? process.env.FILE_USER_PROFILE_PATH : path.resolve(process.env.FILE_USER_PROFILE_PATH);
}

export default {
  getViewDirPath,
  getPostsImagePath,
  getProfilesImagePath,
}

