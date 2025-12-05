/**
 * @file routes/auth.router.js
 * @description 인증 관련 라우터 the router of authorization
 */

import express from 'express';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import { authController } from '../app/controllers/auth.controller.js';
import loginValidator from '../app/middlewares/validations/validators/auth/login.validator.js';
import socialValidator from '../app/middlewares/validations/validators/auth/social.validator.js';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/login', loginValidator, validationHandler, authController.login); // login할때 get이 아니고 post인 이유? 인증 정보를 생성. token 생성
authRouter.post('/logout', authMiddleware, authController.logout);
authRouter.post('/reissue', authController.reissue);
authRouter.get('/social/:provider', socialValidator, validationHandler, authController.social);
authRouter.get('/callback/:provider', authController.socialCallback);

export default authRouter;

// reissue 때는 유저의 인증 조건 X
