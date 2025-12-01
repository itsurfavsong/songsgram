/**
 * @file app/repositories/post.repository.js
 * @description Post Repository
 * 251128 v1.0.0 BSong1 init
 */

import { where } from 'sequelize';
import db from '../models/index.js';
const { Post, sequelize, Comment } = db;

/**
 * 게시글 페이지네이션
 * @param {import("sequelize").Transaction|null} t
 * @param {{limit: number, offset: number}} data
 * @returns {Promise<Array<import("../models/Post.js").Post>>}
 */
async function pagination(t = null, data) {
  return await Post.findAndCountAll({
    order: [
      ['createdAt', 'DESC'],
      ['updatedAt', 'DESC'],
      ['id', 'ASC']
    ],
    limit: data.limit,
    offset: data.offset,
    transaction: t,
  });

  // return await Post.findAll(
  //   {
  //     order: [
  //       ['createdAt', 'DESC'],
  //       ['updatedAt', 'DESC'],
  //       ['id', 'ASC']
  //     ],
  //     limit: data.limit,
  //     offset: data.offset
  //   },
  //   {
  //     transaction: t,
  //   }
  // );
}

/**
 * 게시글 ID로 조회(최상위 댓글 포함)
 * @param {import("sequelize").Transaction|null} t
 * @param {import("../services/posts.service.type.js").Id} id
 * @returns {Promise<import("../models/Post.js").Post>}
 */
async function findByPkWithComments(t = null, id) {
  return await Post.findByPk(
    id,
    {
    include: [
      {
        model: Comment,
        as: 'post-has-comts',
        where: {
          replyId: 0,
        },
        required: false, // Left Join 설정 & 댓글이 없는 posts도 있어서...그러면 left join 해야된다.
      },
    ],
    transaction: t,
    }
  );
}

/**
 * 게시글 ID로 조회(최상위 댓글 포함)
 * @param {import("sequelize").Transaction|null} t
 * @param {import("../services/posts.service.type.js").Id} id
 * @returns {Promise<import("../models/Post.js").Post>}
 */
async function findByPk(t = null, id) {
  return await Post.findByPk(
    id,
    {
      transaction: t
    }
  );
}

/**
 * 게시글 작성
 * @param {import("sequelize").Transaction|null} t
 * @param {import("../services/posts.service.type.js").PostStoreData} data
 * @returns {Promise<import("../models/Post.js").Post>}
 */
async function create(t = null, data) {
  return await Post.create(data);
}

// 게시물 삭제
async function destroy(t = null, id) {
  return await Post.destroy({
    where: { id: id },
    transaction: t,
  });
}

export default {
  pagination,
  findByPkWithComments,
  create,
  destroy,
  findByPk
};
