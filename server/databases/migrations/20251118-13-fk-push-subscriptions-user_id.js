/**
 * @file databases/migrations/20251118-13-fk-push-subscriptions-user_id.js
 * @description Add a fk on push-subscriptions.user_id
 * 251118 v1.0.0 BSong1 init
 */

// 테이블名
const tableName = 'push-subscriptions';

// Constraint 명
const constraintName = 'fk_push-subscriptions_user_id';

// Constraint 정의
const options =  {
  fields: ['user_id'], // fk 부여할 컬럼을 지정
  type: 'foreign key', // constraint 명
  name: constraintName, // constraint 명 지정
  references: { // 참조 설정
    table: 'users', // 참조할 테이블
    field: 'id', // 참조 테이블의 컬럼을 지정해준다.
  },
  onDelete: 'CASCADE', // 참조 레코드가 삭제 시, posts의 레코드도 같이 삭제
      };

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint(tableName, options);
  },

  // 마이그레이션을 롤백 시 호출되는 메소드(스키마 수정, 삭제)
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(tableName, options);
  }
};

