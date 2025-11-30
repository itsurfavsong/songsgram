/**
 * @file routes/posts.router.js
 * @description 게시글 관련 라우터 the router of posts
 * 251128 v1.0.0 BSong1 init
 */

import express from 'express';
import postsController from '../app/controllers/posts.controller.js';
import indexValidator from '../app/middlewares/validations/validators/posts/index.validator.js';
import validationHandler from '../app/middlewares/validations/validationHandler.js';
import authMiddleware from '../app/middlewares/auth/auth.middleware.js';
import showValidator from '../app/middlewares/validations/validators/posts/show.validator.js';
import storeValidator from '../app/middlewares/validations/validators/posts/store.validator.js';
import deleteValidator from '../app/middlewares/validations/validators/posts/delete.validator.js';
import multerMiddleware from '../app/middlewares/multer/multer.middleware.js';

const postsRouter = express.Router();

postsRouter.get('/', indexValidator, validationHandler, postsController.index);
postsRouter.get('/:id', authMiddleware, showValidator, validationHandler, postsController.show);
postsRouter.post('/', authMiddleware, multerMiddleware.postUploader, storeValidator, validationHandler, postsController.store);
postsRouter.delete('/:id', authMiddleware, deleteValidator, validationHandler, postsController.destroy);

export default postsRouter;
