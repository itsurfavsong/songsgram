/**
 * @file app/services/users.service.js
 * @description Users Service
 * 251205 BSong1 init
 */
import PROVIDER from '../middlewares/auth/configs/provider.enunm.js';
import db from '../models/index.js';
import userRepository from '../repositories/user.repository.js';

/**
 * 회원가입
 * @param {{emali: string, password: string}}} data
 * @returns {Promise<import("../models/User.js").User>}
 */
async function store(data) {
  const { email, nick, password, profile } = data;
  return await db.sequelize.transaction(async t => {

    // email로 유저 정보 획득
    const user = await userRepository.findByEmail(t, email);

    // 이메일 중복 여부 체크
    if(user) {
      throw myError('!이메일 중복!', CONFLICT_ERROR);
    }

    const createDate = {
      email,
      nick,
      password: bcrypt.hashSync(password, 10),
      profile,
      role: ROLE.NORMAL,
      provider: PROVIDER.NONE
    }

    return await userRepository.create(t, createDate);
  });
}

export default {
  store
};

// // nick으로 유저 정보 획득
// const userNick = await userRepository.findByNick(t, nick);

// // nick 중복 여부 체크
// if(user.nick === nick) {
//   throw myError('!닉네임 중복!', CONFLICT_ERROR);
// }

// // controller로 리턴! 짜쟌~
// await userRepository.create(t, body);

// return {
//   userEmail,
//   userNick
// }
