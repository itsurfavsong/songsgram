// db접속해서 쿼리를 만들고 접속하고 db에서 받은 데이터를 반환하는 파일
/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251120 v1.0.0 BSong1 init
 */

// 1. 구조 분해형
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

/**
 * 유저 모델 인스턴트로 save 처리
 * @param {import("sequelize").Transaction} t
 * @param {import("../models/index.js").User} user
 * @returns {Promise<import("../models/User.js").User>}
 */
async function save(t = null, user) {
  return await user.save({ transaction: t });
}

export default {
  findByEmail,
  save,
};

// 2. 일반형
// import db from '../models/index.js';

// async function findByEmail(t = null, email) {
//   return await db.User
// }
