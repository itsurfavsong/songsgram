/**
 * @file app/controllers/users.controller.js
 * @description 유저 관련 컨트롤러 the controller of users
 * 251205 v1.0.0 BSong1 init
 */

import { SUCCESS } from '../../configs/responseCode.config.js';
import usersService from '../services/users.service.js';
import { createBaseResponse } from '../utils/createBaseResponse.util.js';

// --------------------------------------------------------------------------------------
// public--------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

/**
 * 회원 가입 컨트롤러 (저장 - store)
 * @param {import("express").Request} req - Request 객체
 * @param {import("express").Response} res - Response 객체
 * @param {import("express").NextFunction} next - NextFuction 객체
 * @returns
 */
async function store(req, res, next) {
  try {
    const data = {
      email: req.body.email, // auth middleware에서 set up한 값
      password: req.body.password,
      nick: req.body.nick,
      image: req.body.image,
    };

    const result = await usersService.create(data);

    return res.status(SUCCESS.status).send(createBaseResponse(SUCCESS, result));
  } catch(error) {
    return next(error);
  }
}

export default {
  store
};
