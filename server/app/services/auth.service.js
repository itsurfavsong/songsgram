/**
 * @file app/services/auth.service.js
 * @description Auth Service
 * 251120 BSong1 init
 */
import bcrypt, { compareSync } from 'bcrypt';
import userRepository from "../repositories/user.repository.js";
import myError from '../errors/customs/my.error.js';
import { NOT_REGISTERED_ERROR, SYSTEM_ERROR } from '../../configs/responseCode.config.js';

async function login(body) {
  const { email, password } = body;

  // email로 유저 정보 획득
  const result = await userRepository.findByEmail(null, email);
  // 1-1. await가 없으면 pending 상태의 promise 객체 상태로 반환. 그래서 result가 담겨져있기 때문에 유저있음으로 통과됨.
  // 1-2. await가 있으면 await에서 response를 담고 기다리다가 reject인지 아닌지 확인하고 if절에 담긴다.

  // 유저 존재 여부 체크
  if(!result) {
    throw myError('유저 미존재', NOT_REGISTERED_ERROR); // 에러를 강제 발생
  }

  // 비밀번호 체크
  if(!bcrypt.compareSync(password, result.password)) {
    throw myError('비밀번호 틀림', NOT_REGISTERED_ERROR); // 에러를 강제 발생
  }

  return result;
}

export default {
  login,
};
