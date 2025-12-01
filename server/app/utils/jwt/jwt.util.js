/**
 * @file /app/utils/jwt/jwt.util.js
 * @description jwt utils created
 * 251125 v1.0.0  BSong init
 */

import jwt from 'jsonwebtoken';
import { EXPIRED_TOKEN_ERROR, INVALID_TOKEN_ERROR, UNAUTHORIZED_ERROR } from '../../../configs/responseCode.config.js';
import myError from '../../errors/customs/my.error.js';

// -------------------------------------------------------------------------------------
// private
// -------------------------------------------------------------------------------------
/**
 * @param {{}} payload
 * @param {number} ttl
 * @returns {string} JWT
 */
function generateToken(payload, ttl) {
  // 토큰 만들 때의 옵션 설정 그리고 .env에서 설정을 한다.
  const options = {
    algorithm: process.env.JWT_ALGORITHM, // 설정값
    noTimestamp: false, // payload.iat 설정 (토큰 발급 시간)
    expiresIn: ttl, // payload.exp 설정 (토큰 만료 시간) 초단위
    issuer: process.env.JWT_ISSUER// payload.iss 설정 (토큰 발급자)
  }

  // 토큰 생성
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

// -------------------------------------------------------------------------------------
// public
// -------------------------------------------------------------------------------------
/**
 * -----------------------------------------------------------------------Access 토큰 생성
 * @param {import("../../models/index.js").User} user // 자바스크립트는 path를 잘 못 읽어온다.
 * @returns {string} JWT
 */
function generateAccessToken(user) {
  // 페이로드를 설정하자!
  const payload = {
    sub: user.id, // payload.sub가 user의 pk(value)를 set up된다.
    role: user.role // payload.role가 user의 pk(value)를 set up된다.
  }
  return generateToken(payload, parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY));
};

/**
 * -----------------------------------------------------------------------Refresh 토큰 생성
 * @param {import("../../models/index.js").User} user // 자바스크립트는 path를 잘 못 읽어온다.
 * @returns {string} JWT
 */
function generateRefreshToken(user) {
  // 페이로드를 설정하자!
  const payload = {
    sub: user.id, // payload.sub가 user의 pk(value)를 set up된다.
  }

  // 리프레시 토큰 생성
  return generateToken(payload, parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRY));
};

/**
 * ----------------------------------------------------------------헤더에서 Bearer token 획득
 * @param {import("express").Request} req
 * @returns {string} token
 */
function getBearerToken(req) {
  // 베어러 토큰 획득
  const bearerToken = req.headers[process.env.JWT_HEADER_KEY]; // headers라는 프로퍼티

  // 베어러 토큰 미존재
  if(!bearerToken) {
    throw myError('베어러 토큰 없음', UNAUTHORIZED_ERROR);
  }

  // 베어러토큰 형식 검증 (if문은 issue가 날 때 관해서)
  const tokenParts = bearerToken.split(' ');
  if(tokenParts.length !== 2 || tokenParts[0] !== process.env.JWT_SCHEME) {
    throw myError('베어러 토큰 형식 이상', INVALID_TOKEN_ERROR);
  }

  return tokenParts[1]; // tokenParts의 1번 인덱스 값(string)만 반환
}

/**
 * --------------------------------------------------------------------토큰 Auth 및 claims 반환
 * @param {string} token
 * @returns {jwt.Jwt} claims
 */
function getClaimsWithVerifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch(error) {
    if(error instanceof jwt.TokenExpiredError) {
      throw myError('토큰 만료', EXPIRED_TOKEN_ERROR);
    } else if(error instanceof jwt.JsonWebTokenError) {
      throw myError('토큰 이상', INVALID_TOKEN_ERROR);
    } else {
      throw error;
    }
  }
}

export default {
  generateAccessToken,
  generateRefreshToken,
  getBearerToken,
  getClaimsWithVerifyToken
};
