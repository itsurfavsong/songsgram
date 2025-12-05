// db접속해서 쿼리를 만들고 접속하고 db에서 받은 데이터를 반환하는 파일
/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251120 v1.0.0 BSong1 init
 */

// ---------------------------------------------------------------------------이메일 검색----------------
import db from '../models/index.js';
const { User } = db;

/**
 * @param {import("sequelize").Transaction} t
 * @param {string} email
 * @returns {Promise<import("../models/User.js").User>}}
 */
async function findByEmail(t = null, email) {
  // SELECT * FROM users WHERE users.email = ? AND deleted_at IS NULL
  return await User.findOne({
    where: {
      email: email,
    },
    transaction: t, // transaction
  });
}

// -------------------------------------------------------------------------------닉네임 검색------------
/**
 * @param {import("sequelize").Transaction} t
 * @param {string} nick
 * @returns {Promise<import("../models/User.js").User>}}
 */
async function findByNick(t = null, nick) {
  // SELECT * FROM users WHERE users.nick = ? AND deleted_at IS NULL
  return await User.findOne({
    where: {
      nick: nick,
    },
    transaction: t, // transaction
  });
}

// -------------------------------------------------------------------------------------------
/**
 * 유저 모델 인스턴트로 save 처리
 * @param {import("sequelize").Transaction} t
 * @param {import("../models/index.js").User} user
 * @returns {Promise<import("../models/User.js").User>}
 */
async function save(t = null, user) {
  return await user.save({ transaction: t });
}

// -------------------------------------------------------------------------------------------
/**
 * 유저id로 조회하는 처리
 * @param {import("sequelize").Transaction} t
 * @param {number} id
 * @returns {Promise<import("../models/User.js").User>}
 */
async function findByPk(t = null, id) {
  return await User.findByPk(id, { transaction: t });
}

// -------------------------------------------------------------------------------------------
async function create(t = null, data) {
  return await User.create(data, { transaction: t });
}

// ------------------------------------------------------------------------------------------
async function logout(t = null, id) { // promise 객체를 반환하는데 rejected or fulfilled 를 안기다리고 걍 진행해버려서 await 필수.
  return await User.update(
    {
      refreshToken: null
    },
    {
      where: {
        id: id
      },
      transaction: t
    }
  );
  // 특정 유저 리프레시 토큰을 null로 갱신
  // UPDATE users SET refresh_token = null, updated_at = NOW() WHERE id = ?
}

export default {
  findByEmail,
  findByNick,
  save,
  findByPk,
  create,
  logout
};

// 2. 일반형
// import db from '../models/index.js';

// async function findByEmail(t = null, email) {
//   return await db.User
// }

