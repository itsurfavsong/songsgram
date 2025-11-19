/**
 * @file app/controllers/auth.controller.js
 * @description 인증 관련 컨트롤러 the controller of authorization
 * 251119 v1.0.0 BSong1 init
 */

import { SUCCESS } from "../../configs/responseCode.config.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";

// --------------------------------------------------------------------------------------
// public--------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// 주로 비동기라 동기처리를 해주겠다.

/**
 * 로그인 컨트롤러 처리
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFuction 객체
 * @returns
 */
async function login(req, res, next) {
  const body = req.body;

  return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, body));
}

// --------------------------------------------------------------------------------------
// export--------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
export const authController = {
  login,
};
// -> 지금 객체로 내보낸거다. 그래서 이 객체가 import된 곳에서 꼭 함수 login을 명시해줘야지 함수 login을 사용할 수 있다.

// 혹은 이렇게 써도 괜찮다.
// export default {
//   login,
// };
