/**
 * @file app/middlewares/validations/fields/user.field.js
 * @description Validating User Input to a Field
 * 251119 v1.0.0 BSong1 init
*/

// 1. 객체 지향-----------------------------------------------------------------------------------
import { body } from "express-validator";

const email = body('email')
  .trim()
  .notEmpty().withMessage('이메일은 필수 항목 입니다.')
  .bail() // kind of 'break'
  .isEmail().withMessage('유효한 이메일을 입력해주세요.')
  ;

const password = body('password')
  .trim()
  .notEmpty().withMessage('비밀번호는 필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@#$]{8,20}$/).withMessage('영어대소문자·숫자·!·@·#·$ and 8~20자 허용') // 정규식
;

export default {
  email,
  password
};

// 2. 하나하나 따로 내보내는 것----------------------------------------------------------------------
// export const email = body('email')
//   .notEmpty()
//   .withMessage('이메일은 필수 항목 입니다.')
//   .bail() // kind of 'break'
//   .isEmail() // 간단하게 체크하는 방법
//   .withMessage('유효한 이메일을 입력해주세요.')
// ;

// export const password = body('password')
//   .notEmpty()
//   .withMessage('비밀번호는 필수 항목입니다.')
//   .bail()
//   .matches(/^[a-zA-Z0-9!@#$]{8,20}$/) // 정규식 쓸꼬양! 정규식 시작 - /^$/
//   .withMessage('영어대소문자·숫자·!·@·#·$ and 8~20자 허용')
// ;
