/**
 * @file app/services/posts.service.js
 * @description Posts Service
 * 251128 BSong1 init
 */

import postRepository from "../repositories/post.repository.js";

async function pagination(page) {
  const limit = 6;
  const offset = limit * (page - 1);

  return await postRepository.pagination(null, { limit, offset });
}

async function show(id) {
  return await postRepository.findByPk(null, id);
}

async function store(id) {
  return await postRepository.findByPk(null, id);
}

async function destroy(id) {
  return await postRepository.destroyByPk(null, id);
}

export default {
  pagination,
  show,
  store,
  destroy
}
