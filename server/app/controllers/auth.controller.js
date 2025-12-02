/**
 * @file app/controllers/auth.controller.js
 * @description 인증 관련 컨트롤러 the controller of authorization
 * 251119 v1.0.0 BSong1 init
 */

import { REISSUE_ERROR, SUCCESS } from "../../configs/responseCode.config.js";
import authService from "../services/auth.service.js";
import { createBaseResponse } from "../utils/createBaseResponse.util.js";
import cookieUtil from "../utils/cookie/cookie.util.js";
import myError from "../errors/customs/my.error.js";

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

  // todo: logger.debug() 지우기
  try {
    // logger.debug('------------------로그인 컨트롤러 시작--------------------')
    const body = req.body; // 파라미터 획득

    // 로그인 서비스 호출
    const { accessToken, refreshToken, user } = await authService.login(body);

    // Cookie에 RefreshToken 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);

    // logger.debug('------------------로그인 컨트롤러 끝--------------------')
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, {accessToken, user}));
  }
  catch(error) {
    next(error);
  }
}

/**
 * 토큰 재 발급 컨트롤러 처리
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFuction 객체
 * @returns
 */
async function reissue(req, res, next) {
  try {
    const token = cookieUtil.getCookieRefreshToken(req);

    // 토큰 존재 여부 확인
    if(!token) {
      throw myError('no refresh token', REISSUE_ERROR);
    }

    // 토큰 재발급 처리
    const { accessToken, refreshToken, user } = await authService.reissue(token);

    // 쿠키에 리프레시 토큰 설정
    cookieUtil.setCookieRefreshToken(res, refreshToken);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, { accessToken, user }))
  } catch (error) {
    next(error);
  }
}

// --------------------------------------------------------------------------------------
// export--------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
export const authController = {
  login,
  reissue
};
