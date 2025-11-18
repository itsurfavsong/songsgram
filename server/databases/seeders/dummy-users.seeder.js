/**
 * @file databases/seeders/dummy-users.seeder.js
 * @description users table dummy data create
 * 25118 v1.0.0 BSong1 init
 */
import bcrypt from 'bcrypt';
// 테이블명
const tableName = 'users';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    // 레코드 정보
    const records = [
      {
        email: 'admin@admin.com',
        password: await bcrypt.hash('qwe1234@', 10), // saltRounds가 10이라는 뜻.
        nick: 'BSONG 관리자',
        provider: 'NONE',
        role: 'SUPER',
        profile: '',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: 'admin2@admin.com',
        password: await bcrypt.hash('qwe1234@', 10),
        nick: 'Bomi Song',
        provider: 'NONE',
        role: 'NORMAL',
        profile: '',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // 데이터 생성: queryInterface.bulkInsert(tableName, records, options)
    await queryInterface.bulkInsert(tableName, records, {});
  },
  async down (queryInterface, Sequelize) {
    // 데이터 삭제: queryInterface.bulkDelete(tableName, records, options)
    await queryInterface.bulkDelete(tableName, null, {});
  }
};
