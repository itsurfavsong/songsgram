/**
 * @file app/middlewares/validations/validators/users/store.validator.js
 * @description 회원가입 작성 검사기
 * 251205 v1.0.0 BSong init
 */

import userFields from "../../fields/user.field.js";

export default [userFields.email, userFields.password, userFields.passwordCk, userFields.nick, userFields.profile];
