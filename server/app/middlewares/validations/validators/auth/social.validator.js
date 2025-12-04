/**
 * @file app/middlewares/validations/validators/auth/social.validator.js
 * @description social 유효성 체크
 * 251204 v1.0.0 BSong1 init 최초생성
 */

// 1. 객체 지향-----------------------------------------------------------------------------------
import userField from "../../fields/user.field.js"

export default [userField.provider];

// 2. 하나하나 따로 내보내는 것 (VSCODE 자동완성 문제 생김)--------------------------------------------
// import { email, password } from "../../fields/user.field.js";
// export default [email, password];
