/**
 * @file app/middlewares/validations/fields/post.field.js
 * @description 게시글 유효성 검사 필드
 * 251128 v1.0.0 BSong1 init
*/

import { body, param } from "express-validator";
import pathUtil from "../../../utils/path/path.util.js";

// 페이지 필드
export const page = body('page')
  .trim()
  .optional()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();

// 게시글 PK 필드
export const id = param('id')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .isNumeric()
  .withMessage('숫자만 허용합니다.')
  .toInt();

// 컨텐츠 필드
export const content = body('content') // Json
  .trim()
  .notEmpty()
  .withMessage('컨텐츠는 필수 항목입니다.')

// 이미지 URL 필드
export const image = body('image')
  .trim()
  .notEmpty()
  .withMessage('이미지는 필수 항목입니다.')
  .bail()
  .custom(val => {
    // 우리 앱의 파일에 접근하는 도메인 + path가 맞는지 확인. (도메인 관련 검증)
    if(!val.startsWith(`${process.env.APP_URL}${process.env.ACCESS_FILE_POST_IMAGE_PATH}`)) {
      return false;
    }

    return true; // true 던지 false 던지 boolean으로 반환해야함.
  })
  .withMessage('허용하지 않는 이미지 경로입니다.')
  .bail()
  .custom(val => {
    // 실제 이미지 파일이 있는지 검증 처리 (이미지 파일 유무에 관련 검증)
    const splitPath = val.split('/');
    const fullPath = path.join(pathUtil.getPostsImagePath(), splitPath[splitPath.length - 1]);

    if(!fs.existsSync(fullPath)) {
      return false;
    }

    return true;
  })
  .withMessage('존재하지 않는 이미지 경로입니다.');
