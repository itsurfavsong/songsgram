/**
 * @file app/middlewares/validations/validators/auth/login.validator.js
 * @description 로그인용 유효성 체크
 * 251119 v1.0.0 BSong1 init 최초생성
 */

// 1. 객체 지향-----------------------------------------------------------------------------------
import userField from "../../fields/user.field.js"

export default [userField.email, userField.password];

// 2. 하나하나 따로 내보내는 것 (VSCODE 자동완성 문제 생김)--------------------------------------------
// import { email, password } from "../../fields/user.field.js";
// export default [email, password];
