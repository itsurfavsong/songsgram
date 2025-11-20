// db접속해서 쿼리를 만들고 접속하고 db에서 받은 데이터를 반환하는 파일
/**
 * @file app/repositories/user.repository.js
 * @description User Repository
 * 251120 v1.0.0 BSong1 init
 */

// 1. 구조 분해형
import db from '../models/index.js';
const { User } = db;

async function findByEmail(t = null, email) {
  // SELECT * FROM users WHERE users.email = ? AND deleted_at IS NULL
  return await User.findOne(
    {
      where: {
        email: email
      }
    },
    {
      transaction: t
    }
  );
}

export default {
  findByEmail,
};

// 2. 일반형
// import db from '../models/index.js';

// async function findByEmail(t = null, email) {
//   return await db.User
// }

