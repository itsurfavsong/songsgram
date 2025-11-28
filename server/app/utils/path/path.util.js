/**
 * @file app/utils/path/path.util.js
 * @description path 유틸
 * 251128 v1.0.0 BSong1 init
 */

import path from 'path';

function getViewDirPath () {
  const __dirname =
    process.env.APP_MODE !== 'dev'
      ? process.env.APP_DIST_PATH
        : path.resolve(process.env.APP_DIST_PATH); // 예약어, 그리고 __ 쓰는 이유는 우리가 만들었어! 자체 제작이라는 걸 명시

  return path.join(__dirname, 'index.html');
}

export default {
  getViewDirPath,
}

