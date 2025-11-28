/**
 * @file app/repositories/post.repository.js
 * @description Post Repository
 * 251128 v1.0.0 BSong1 init
 */
import db from '../models/index.js';
const { Post, sequelize, Comment } = db;

async function pagination(t = null, data) {
  return await Post.findAll(
    {
      order: [
        ['createdAt', 'DESC'],
        ['updatedAt', 'DESC'],
        ['id', 'ASC']
      ],
      limit: data.limit,
      offset: data.offset
    },
    {
      Transaction: t,
    }
  );
}

async function findByPk(t = null, id) {
  return await Post.findByPk(
    id,
    {
      include: [
        {
        model: Comment,
        as: 'post-has-comts',
        where: {
          replyId: 0
        },
        required: false, // Left Join 설정 & 댓글이 없는 posts도 있어서...그러면 left join 해야된다.
      }
      ],
      transaction: t
    }
  );
}

async function store(t = null, data) {
  return await Post.save(
    {
      transaction: t
    }
  );
};

/**
 * 게시물 삭제
 * @param {import("sequelize").Transaction} t
 * @param {import("../models/index.js").Post} post
 * @returns
 */
async function detroyByPk(t = null, id) {
  return await Post.findByPk(
    id,
    {

    }
  );
}

export default {
  pagination,
  findByPk,
  detroyByPk
}
