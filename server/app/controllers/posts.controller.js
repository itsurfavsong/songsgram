/**
 * @file app/controllers/posts.controller.js
 * @description 게시글 관련 컨트롤러 the controller of posts
 * 251128 v1.0.0 BSong1 init
 */

import { SUCCESS } from '../../configs/responseCode.config.js';
import postsService from '../services/posts.service.js';
import { createBaseResponse } from '../utils/createBaseResponse.util.js';

// --------------------------------------------------------------------------------------
// public--------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

/**
 * 게시글 리스트 조회 컨트롤러 처리
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFuction 객체
 * @returns
 */
async function index(req, res, next) {
  try {
    const page = req.body.page || 1;
    const result = await postsService.pagination(page);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

/**
 * 게시글 상세 조회 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFuction 객체
 * @returns
 */
async function show(req, res, next) {
  try {
    const result = await postsService.show(req.params.id);
    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

/**
 * 게시글 작성 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFuction 객체
 * @returns
 */
async function store(req, res, next) {
  try {
    const { content, image } = req.body;

    const post = await postsService.store({ content, image });

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch (error) {
    return next(error);
  }
}

/**
 * 게시글 삭제 컨트롤러
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFuction 객체
 * @returns
 */
async function destroy(req, res, next) {
  try {
    const postId = req.params.id; // 이미 validator에서 숫자로 검증 & toInt
    const result = await postsService.destroy(postId);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
    // => { code: '00', info: 'NORMAL_CODE', description: '정상 처리', data: result }
  } catch (error) {
    return next(error);
  }
}

export default {
  index,
  show,
  store,
  destroy,
};
