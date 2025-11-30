/**
 * @file app/repositories/post.repository.js
 * @description Post Repository
 * 251128 v1.0.0 BSong1 init
 */
import { where } from 'sequelize';
import db from '../models/index.js';
const { Post, sequelize, Comment } = db;

// 게시물 페이징 조회
async function pagination(t = null, data) {
  return await Post.findAll({
    order: [
      ['createdAt', 'DESC'],
      ['updatedAt', 'DESC'],
      ['id', 'ASC'],
    ],
    limit: data.limit,
    offset: data.offset,
    Transaction: t,
  });
}

// 게시물 상세 조회
async function findByPk(t = null, id) {
  return await Post.findByPk(id, {
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
  });
}

// 게시물 작성
async function create(content, image) {
  return await Post.create({ content, image });
}

// 게시물 삭제
async function destroyByPk(id, t = null) {
  return await Post.destroy({
    where: { id: id },
    transaction: t,
  });
}

// // async function findByPk(t = null, id) {
//   return await Post.findByPk(id, {
//     include: [
//       {
//         model: Comment,
//         as: 'post-has-comts',
//         where: {
//           replyId: 0,
//         },
//         required: false, // Left Join 설정 & 댓글이 없는 posts도 있어서...그러면 left join 해야된다.
//       },
//     ],
//     transaction: t,
//   });
// }

export default {
  pagination,
  findByPk,
  create,
  destroyByPk,
};
