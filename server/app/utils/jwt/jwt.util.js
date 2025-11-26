/**
 * @file /app/utils/jwt/jwt.util.js
 * @description jwt utils created
 * 251125 v1.0.0  BSong init
 */

import jwt from 'jsonwebtoken';

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
    expiresIn: ttl, // payload.exp 설정 (토큰 만료 시간) ms초단위
    issuer: process.env.JWT_ISSUER// payload.iss 설정 (토큰 발급자)
  }

  // 토큰 생성
  return jwt.sign(payload, process.env.JWT_SECRET, options);

}

// -------------------------------------------------------------------------------------
// public
// -------------------------------------------------------------------------------------
/**
 * 엑세스 토큰 생성
 * @param {import("../../models/index.js").User} user // 자바스크립트는 path를 잘 못 읽어온다.
 * @returns {string} JWT
 */
function generateAccessToken(user) {
  // 페이로드를 설정하자!
  const payload = {
    sub: user.id, // payload.sub가 user의 pk(value)를 set up된다.
    role: user.role // payload.role가 user의 pk(value)를 set up된다.
  }

  // 엑세스 토큰 생성
  return generateToken(payload, parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY));
};

/**
 * 리프레시 토큰 생성
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

export default {
  generateAccessToken,
  generateRefreshToken,
};
