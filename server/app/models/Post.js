/**
 * @file app/models/Post.js
 * @description post model
 * 251120 v1.0.0 BSong1 init
 */
import dayjs from 'dayjs';
import { DataTypes } from 'sequelize';

const modelName = 'Post'; // 모델명(JS 프로그래밍단 내부에서 사용)

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
  tableName: 'posts', // 실제 DB 테이블명
  timestamps: true, // createdAt, updatedAt를 자동으로 관리해주는 옵션
  paranoid: true, // soft delete 설정 (deletedAt을 자동 관리해준다.)
}

const Post = {  // sequelize 인스턴스 초기화 함수와 associate 함수등 넣어두는 곳(저장소). index.js에서 저장해서 "사용"할 예정.
  init: (Sequelize) => {
    const definePost = Sequelize.define(modelName, attributes, options);

    return definePost;
  },
   associate: (db) => {
    db.Post.hasMany(db.Like, {sourceKey: 'id', foreignKey: 'postId', as: 'postHasLikes' }); // sourceKey는 User에서 가져온 거고 foreinKey는 Post테이블에서 가져온 것.
    db.Post.hasMany(db.Comment, {sourceKey: 'id', foreignKey: 'postId', as: 'postHasComts' }); // sourceKey는 User에서 가져온 거고 foreinKey는 Post테이블에서 가져온 것.
    db.Post.belongsTo(db.User, { targetKey: 'id', foreignKey: 'userId', as: 'postsBelongToUser' });
  }
}

export default Post;
