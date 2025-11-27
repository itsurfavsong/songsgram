/**
 * @file routes/files.router.js
 * @description 파일관련 라우터 the router of files
 * 251127 v1.0.0 BSong1 init
 */

import express from 'express';
import multerMiddleware from '../app/middlewares/multer/multer.middleware.js';
import filesController from '../app/controllers/files.controller.js';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';

const filesRouter = express.Router();

filesRouter.post('/posts', authMiddleware, multerMiddleware.postUploader, filesController.storePost); // TODO: 컨트롤러 입력 필요하다.
filesRouter.post('/profiles',authMiddleware, multerMiddleware.profileUploader, filesController.storeProfile); // TODO: 컨트롤러 입력 필요하다.

export default filesRouter;
