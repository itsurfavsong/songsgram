/**
 * @file databases/migrations/20251117-01-create-users.js
 * @description users migration file
 * 251117 v1.0.0 BSong1 init
 */

import { DataTypes } from 'sequelize';

// table명
const tableName = 'users';

// 컬럼 정의
const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '유저 PK'
  },
  email: {
    field: 'email',
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: '이메일(로그인 account)'
  },
  password: {
    field: 'password',
    type: DataTypes.STRING(255),
    allowNull: false, // 소셜로그인 한 회원들 상대로 랜덤으로 pw준다.
    comment: '비밀번호'
  },
  nick: {
    field: 'nick',
    type: DataTypes.STRING(15), // varchar로 DB저장. 가변 길이 문자열 vs 길이가 고장되어있다 -> char
    allowNull: false,
    unique: true
  },
  provider: {
    field: 'provider',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '로그인 제공자(NONE, KAKAO, GOOGLE...)'
  },
  role: {
    field: 'role',
    type: DataTypes.STRING(10),
    allowNull: false,
    comment: '유저 권한(NORMAL, SUPER...)'
  },
  profile: {
    field: 'profile',
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '유저 프로필',
  },
  refreshToken: {
    field: 'refresh_token',
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: '리프레쉬 토큰'
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
  collate: 'utf8mb4_bin', // 정렬 방식 설정 (영어 대소문자 구분 정렬)
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
