/**
 * @file app/middlewares/validations/fields/post.field.js
 * @description 게시글 유효성 검사 필드
 * 251128 v1.0.0 BSong1 init
*/

import { body, param } from "express-validator";

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

export const content = body('content')
  .notEmpty()
  .withMessage('컨텐츠는 필수 항목입니다.')
  .isString()
  .withMessage('글자만 허용합니다.');
