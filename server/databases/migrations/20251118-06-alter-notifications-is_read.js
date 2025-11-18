/**
 * @file databases/migrations/20251118-06-alter-notification-is_read.js
 * @description notifications-is_read chage
 * 251118 v1.0.0 BSong1 init
 */

import { DataTypes } from 'sequelize';

// table명
const tableName = 'notifications';

// key명 (컬럼명)
const key = 'is_read';

// 컬럼 정의 (모델이 아니다. 그래서 json으로 변환할 필요가 없다)
const upAttributes = {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false,
  comment: '읽음여부'
};

const downAttributes = {
  type: DataTypes.TINYINT(1),
  allowNull: false,
  defaultValue: 0,
  comment: '읽음여부'
};

/** @type {import('sequelize-cli').Migration} */ // up-down은 세트. 서로 상반된 역할.
export default {
  // 마이그레이션을 실행 시 호출되는 메소드(스키마 생성, 수정)
  async up (queryInterface, Sequelize) {
    // 컬럼 수정 시, queryInterface.changeColumn(tableName, key, attributes, options)
    await queryInterface.changeColumn(tableName, key, upAttributes);
  },

  // 마이그레이션을 롤백 시 호출되는 메소드(스키마 수정, 삭제)
  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn(tableName, key, downAttributes);
  }
};

