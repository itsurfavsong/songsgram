/**
 * @file app/services/auth.service.js
 * @description Auth Service
 * 251120 BSong1 init
 */

import bcrypt from 'bcrypt';
import userRepository from "../repositories/user.repository.js";
import myError from '../errors/customs/my.error.js';
import { NOT_REGISTERED_ERROR } from '../../configs/responseCode.config.js';
import jwtUtil from '../utils/jwt/jwt.util.js';
import db from '../models/index.js';

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
    };

  }); // transaction - 이슈가 생기면 롤백해주는 기능
}

export default {
  login,
};
