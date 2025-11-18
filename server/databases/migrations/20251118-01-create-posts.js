/**
 * @file databases/migrations/20251118-01-create-posts.js
 * @description posts migration file
 * 251118 v1.0.0 BSong1 init
 */

import { DataTypes } from 'sequelize';

// table명
const tableName = 'posts';

// 컬럼 정의 (모델이 아니다. 그래서 json으로 변환할 필요가 없다)
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '게시글 PK'
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK',
  },
  content: {
    field: 'content',
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '내용'
  },
  image: {
    field: 'image',
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: null,
    comment: '게시글 이미지'
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true
  }
};

// 옵션 설정
const options = {
  charset: 'utf8mb4', // 테이블 문자셋 설정(emoji 지원 有)
  collate: 'utf8mb4_0900_ai_ci', // 정렬 방식 설정 (영어 대소문자 구분 안함. 기본값)
  engine: 'InnoDB'  // 사용 엔진 설정. index 사용 가능하고 select 속도가 빠르다. 대량의 데이터에 특화됨.
};

/** @type {import('sequelize-cli').Migration} */ // up-down은 세트. 서로 상반된 역할.
export default {
  async up (queryInterface, Sequelize) { // up method는 스키마 생성과 관련. 마이그레이션 실행 시 호출되는 메소드 (스키마 생성, 수정)
    await queryInterface.createTable(tableName, attributes, options);
  },

  async down (queryInterface, Sequelize) { // undo 처리하고 싶을때 만들고 싶은 소스 코드와 관련 있는 곳. 마이그레이션을 롤백 시 호출되는 메소드
    await queryInterface.dropTable(tableName);
  }
};

