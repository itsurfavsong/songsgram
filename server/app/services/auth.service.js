/**
 * @file app/services/auth.service.js
 * @description Auth Service
 * 251120 BSong1 init
 */

import bcrypt from 'bcrypt';
import userRepository from "../repositories/user.repository.js";
import myError from '../errors/customs/my.error.js';
import { NOT_REGISTERED_ERROR, REISSUE_ERROR } from '../../configs/responseCode.config.js';
import jwtUtil from '../utils/jwt/jwt.util.js';
import db from '../models/index.js';

/**
 * 로그인
 * @param {{emali: string, password: string}}} body
 * @returns {Promise<import("../models/User.js").User>}
 */
async function login(body) {
  // 트랜잭션 처리
  // async function login(body) {
    // return await db.sequelize.transaction(
    // async t =>
  //  {
    // 이 안에서 비즈니스 로직 작성해요
    // });

  return await db.sequelize.transaction(async t => {

    const { email, password } = body;

    // email로 유저 정보 획득
    const user = await userRepository.findByEmail(t, email);
    // 1-1. await가 없으면 pending 상태의 promise 객체 상태로 반환. 그래서 user가 담겨져있기 때문에 유저있음으로 통과됨.
    // 1-2. await가 있으면 await에서 response를 담고 기다리다가 reject인지 아닌지 확인하고 if절에 담긴다.

    // 유저 존재 여부 체크
    if(!user) {
      throw myError('유저 미존재', NOT_REGISTERED_ERROR); // 에러를 강제 발생
    }

    // 비밀번호 체크
    if(!bcrypt.compareSync(password, user.password)) {
      throw myError('비밀번호 틀림', NOT_REGISTERED_ERROR); // 에러를 강제 발생
    }

    // JWT 생성 (accessToken, refreshToken)
    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);

    // refreshToken 저장
    user.refreshToken = refreshToken;
    await userRepository.save(t, user);

    // controller로 리턴! 짜쟌~

    return {
      user,
      accessToken,
      refreshToken
    }

  }); // transaction - 이슈가 생기면 롤백해주는 기능
}

/**
 * 토큰 재발급 처리
 * @param {string} token
 */
async function reissue(token) {
  // 토큰 검증 및 유저id 획득
  const claims = jwtUtil.getClaimsWithVerifyToken(token);
  const userId = claims.sub; // generateAccessToken의 sub이다. 형변환 필요 없음. 숫자를 넣으면 숫자로 나온다.

  return await db.sequelize.transaction(async t => {
    // 유저 정보 획득
    const user = await userRepository.findByPk(t, userId);

    // 토큰 일치 검증, token과 userId가 같은 지...
    if(token !== user.refreshToken) {
      throw myError('리프레시 토큰 불일치', REISSUE_ERROR);
    }

    // JWT 생성
    const accessToken = jwtUtil.generateAccessToken(user);
    const refreshToken = jwtUtil.generateRefreshToken(user);

    // 리프레쉬 토큰 DB에 저장 처리
    user.refreshToken = refreshToken;
    await userRepository.save(t, user);

    return {
      accessToken,
      refreshToken,
      user
    }
  });
}

export default {
  login,
  reissue
};
