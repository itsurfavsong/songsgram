/**
 * @file routes/auth.router.js
 * @description 인증 관련 라우터 the router of authorization
 */

import express from 'express';
import authController from '../app/controllers/auth.controller.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import loginValidator from '../app/middlewares/validations/validators/auth/login.validator.js';

const authRouter = express.Router();

authRouter.post('/login', loginValidator, validationHandler, authController.login); // login할때 get이 아니고 post인 이유? 인증 정보를 생성. token 생성

export default authRouter;
