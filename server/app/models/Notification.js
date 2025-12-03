/**
 * @file app/models/Notification.js
 * @description notification model
 * 251120 v1.0.0 BSong1 init
 */
import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'Notification'; // 모델명(JS 프로그래밍단 내부에서 사용)

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '알림 PK'
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK',
  },
  title: {
    field: 'title',
    type: DataTypes.STRING(200),
    allowNull: false,
    comment: '제목'
  },
  content: {
    field: 'content',
    type: DataTypes.STRING(1000),
    allowNull: false,
    comment: '내용'
  },
  isRead: {
    field: 'is_read',
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: 0,
    comment: '읽음여부'
  },
  createdAt: {
    field: 'created_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('createdAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    field: 'updated_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('updatedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  deletedAt: {
    field: 'deleted_at',
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const val = this.getDataValue('deletedAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss');
    }
  }
};

const options = {
  tableName: 'notifications', // 실제 DB 테이블명
  timestamps: true, // createdAt, updatedAt를 자동으로 관리해주는 옵션
  paranoid: true, // soft delete 설정 (deletedAt을 자동 관리해준다.)
}

const Notification = {  // sequelize 인스턴스 초기화 함수와 associate 함수등 넣어두는 곳(저장소). index.js에서 저장해서 "사용"할 예정.
  init: (Sequelize) => {
    const defineNotification = Sequelize.define(modelName, attributes, options);

    return defineNotification;
  },
  associate: (db) => {
  db.Notification.belongsTo(db.User, { targetKey: 'id', foreignKey: 'userId', as: 'ntfsBelongToUser' });
  }
}

export default Notification;
