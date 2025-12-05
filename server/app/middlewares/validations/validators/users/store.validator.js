/**
 * @file app/middlewares/validations/validators/users/store.validator.js
 * @description 회원가입 작성 검사기
 * 251205 v1.0.0 BSong init
 */

import { email, password, passwordCk, nick, profile } from "../../fields/user.field.js";

export default [email, password, passwordCk, nick, profile];
