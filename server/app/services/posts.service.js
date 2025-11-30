/**
 * @file app/services/posts.service.js
 * @description Posts Service
 * 251128 BSong1 init
 */

import postRepository from '../repositories/post.repository.js';

/**
 * 게시글 페이지네이션(최상위 댓글 포함)
 * @param {import("./posts.service.type.js").page} page - 페이지 번호
 * @returns {Promise<Array<import("../models/Post.js").Post>>}
 */
async function pagination(page) {
  const limit = 6;
  const offset = limit * (page - 1);

  return await postRepository.pagination(null, { limit, offset });
}

/**
 * 게시글 상세
 * @param {import("./posts.service.type.js").Id} id
 * @returns {Promise<import("../models/Post.js").Post>}
 */
async function show(id) {
  return await postRepository.findByPk(null, id);
}

/**
 * 게시글 작성
 * @param {import("./posts.service.type.js").PostStoreData} { content, image }
 * @returns {Promise<import("../models/Post.js").Post>}
 */
async function store({ content, image }) {
  return await postRepository.store({ content, image });
}

// 게시물 삭제
async function destroy(postId) {
  return await postRepository.destroyByPk(postId); // t 안 넘김
}


// /**
//  * 게시글 삭제
//  * @param {import("./posts.service.type.js").PostDestroyData} data 
//  * @returns {Promise<number>}
//  */
// async function destroy({ userId, postId }) {
//   // 트랜잭션 시작
//   return db.sequelize.transaction(async t => {
//     // (게시글 작성자 일치 확인용)
//     const post = await postRepository.findByPk(t, postId);

//     // 게시글 작성자 일치 확인
//     if(post.userId !== userId) {
//       throw myError('작성자 불일치', UNMATCHING_USER_ERROR);
//     }

//     // 코멘트 삭제
//     await commentRepository.destroy(t, postId);

//     // 좋아요 삭제
//     await likeRepository.destroy(t, postId);
    
//     // 게시글 삭제
//     await postRepository.destroy(t, postId);
//   });
  
// }


export default {
  pagination,
  show,
  store,
  destroy,
};
