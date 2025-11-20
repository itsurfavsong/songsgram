/**
 * @file app/models/PushSubscription.js
 * @description push-subscription model
 * 251120 v1.0.0 BSong1 init
 */
import dayjs from 'dayjs';
import { DataTypes, Sequelize } from 'sequelize';

const modelName = 'PushSubscription'; // 모델명(JS 프로그래밍단 내부에서 사용)

const attributes = {
  id: {
    field: 'id',
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    comment: '푸시구독 PK'
  },
  userId: {
    field: 'user_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '유저 PK',
  },
  endpoint: {
    field: 'endpoint',
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    comment: '엔드포인트'
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
  tableName: 'push-subscriptions', // 실제 DB 테이블명
  timestamps: true, // createdAt, updatedAt를 자동으로 관리해주는 옵션
  paranoid: true, // soft delete 설정 (deletedAt을 자동 관리해준다.)
}

const PushSubscription = {  // sequelize 인스턴스 초기화 함수와 associate 함수등 넣어두는 곳(저장소). index.js에서 저장해서 "사용"할 예정.
  init: (Sequelize) => {
    const definePushSubscription = Sequelize.define(modelName, attributes, options);

    return definePushSubscription;
  },
  associate: (db) => {
  db.PushSubscription.belongsTo(db.User, { targetKey: 'id', foreignKey: 'userId', as: 'p-subs-belong-to-u' });
  }
}

export default PushSubscription;

