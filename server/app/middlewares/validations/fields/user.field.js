/**
 * @file app/middlewares/validations/fields/user.field.js
 * @description Validating User Input to a Field
 * 251119 v1.0.0 BSong1 init
*/

import { body, param } from "express-validator";
import PROVIDER from "../../auth/configs/provider.enunm.js";
import path from "path";
import pathUtil from "../../../utils/path/path.util.js";
import fs from 'fs';

// 1. 객체 지향-----------------------------------------------------------------------------------
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

const passwordCk = body('passwordCk')
  .trim()
  .custom((val, {req}) => {
    if(val !== req.body.password) {
      return false;
    }
    return true;
  })
  .withMessage('비밀번호와 비밀번호 체크가 다릅니다.')
;

const nick = body('nick')
  .trim()
  .notEmpty().withMessage('이름은 필수 항목 입니다.')
  .bail() // kind of 'break'
  .matches(/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,15}$/)
  .withMessage('한글, 영어, 숫자만 허용하며 1~15자 허용') // 정규식
  ;

const profile = body('profile')
  .trim()
  .notEmpty()
  .withMessage('이미지는 필수 항목입니다.')
  .bail()
  .custom(val => {
    // 우리 앱의 게시글 이미지에 접근하는 `도메인 + path`가 맞는지 확인
    if(!val.startsWith(`${process.env.APP_URL}${process.env.ACCESS_FILE_POST_IMAGE_PATH}`)) {
      return false;
    }
    return true;
  })
  .withMessage('허용하지 않는 이미지 경로입니다.')
  .bail()
  .custom(val => { // **path 혹은 fs 외부에서 import 해야되는데 안하면 validation 오류가 난다.**
    // 실제 이미지 파일이 있는지 검증 처리
    const splitPath = val.split('/');
    const fullPath = path.join(pathUtil.getPostsImagePath(), splitPath[splitPath.length - 1]);

    if(!fs.existsSync(fullPath)) {
      return false;
    }

    return true;
  })
  .withMessage('존재하지 않는 이미지 경로입니다.');

const provider = param('provider')
  .trim()
  .notEmpty()
  .withMessage('필수 항목입니다.')
  .bail()
  .custom(val => {
    return PROVIDER[val.toUpperCase()] ? true : false; // /api/auth/social/kakao 의 kakao 부분 확인 절차
  })
  .withMessage('허용하지 않는 값입니다.')
;

export default {
  email,
  password,
  passwordCk,
  nick,
  profile,
  provider
};

// 2. 하나하나 따로 내보내는 것 (VSCODE 자동완성 문제 생김)----------------------------------------------
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
