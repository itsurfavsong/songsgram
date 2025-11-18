/**
 * @file databases/migrations/20251118-07-fk-posts-user_id.js
 * @description Add a fk on posts.user_id
 * 251118 v1.0.0 BSong1 init
 */

// 테이블명
const tableName = 'posts';

// Constraint 명
const constraintName = 'fk_posts_user_id';

/** @type {import('sequelize-cli').Migration} */ // up-down은 세트. 서로 상반된 역할.
export default {
  // 마이그레이션을 실행 시 호출되는 메소드(스키마 생성, 수정)
  async up (queryInterface, Sequelize) {
    // 컬럼 수정 시, queryInterface.changeColumn(tableName, key, attributes, options)
    await queryInterface.addConstraint(
      'posts', // fk 생성할 테이블명
      {
        fields: ['user_id'], // fk 부여할 컬럼을 지정
        type: 'foreign key', // constraint 명
        name: constraintName, // constraint 명 지정
        references: { // 참조 설정
          table: 'users', // 참조할 테이블
          field: 'id', // 참조 테이블의 컬럼을 지정해준다.
        },
        onDelete: 'CASCADE', // 참조 레코드가 삭제 시, posts의 레코드도 같이 삭제
      }
    );
  },

  // 마이그레이션을 롤백 시 호출되는 메소드(스키마 수정, 삭제)
  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint(tableName, constraintName);
  }
};

