/**
 * @file app/models/User.js
 * @description user model
 * 251120 v1.0.0 BSong1 init
 */
import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'User'; // 모델명(JS 프로그래밍단 내부에서 사용)

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
  tableName: 'users', // 실제 DB 테이블명
  timestamps: true, // createdAt, updatedAt를 자동으로 관리해주는 옵션
  paranoid: true, // soft delete 설정 (deletedAt을 자동 관리해준다.)
}

const User = {  // sequelize 인스턴스 초기화 함수와 associate 함수등 넣어두는 곳(저장소). index.js에서 저장해서 "사용"할 예정.
  init: (Sequelize) => {
    const define = Sequelize.define(modelName, attributes, options);
    // json으로 serialise시, 제외할 컬럼을 지정.
    define.prototype.toJSON = function() {
      const attributes = this.get(); // column properties 다 들고 온다.
      delete attributes.password;
      delete attributes.refreshToken;

      return attributes;
    };

    return define;
  },
   associate: (db) => {
    // hasMany - 1:n 관계에서 설정하는 방법 (1명의 사원은 복수의 직급 정보를 가진다.)
    // hasOne - 1:1 관계
    db.User.hasMany(db.Post, {sourceKey: 'id', foreignKey: 'userId', as: 'uHasPosts' }); // sourceKey는 User에서 가져온 거고 foreinKey는 Post테이블에서 가져온 것.
    db.User.hasMany(db.Comment, {sourceKey: 'id', foreignKey: 'userId', as: 'uHasComts' }); // sourceKey는 User에서 가져온 거고 foreinKey는 Comment테이블에서 가져온 것.
    db.User.hasMany(db.Like, {sourceKey: 'id', foreignKey: 'userId', as: 'uHasLikes' }); // sourceKey는 User에서 가져온 거고 foreinKey는 Like테이블에서 가져온 것.
    db.User.hasMany(db.PushSubscription, {sourceKey: 'id', foreignKey: 'userId', as: 'uHasPsubs' }); // sourceKey는 User에서 가져온 거고 foreinKey는 PushSubscription테이블에서 가져온 것.
    db.User.hasMany(db.Notification, {sourceKey: 'id', foreignKey: 'userId', as: 'uHasNtfs' }); // sourceKey는 User에서 가져온 거고 foreinKey는 Notification테이블에서 가져온 것.
  }
}

export default User;
