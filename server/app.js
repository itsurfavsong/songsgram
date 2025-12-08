/**
 * @file app.js
 * @description Entry Point
 * 251117 v1.0.0 BSong1
 */

import express from 'express';
import './configs/env.config.js';
import authRouter from './routes/auth.router.js';
import usersRouter from './routes/users.router.js';
import filesRouter from './routes/files.router.js';
import errorHandler from './app/errors/errorHandler.js';
import postsRouter from './routes/posts.router.js';
import SwaggerParser from 'swagger-parser';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import notFoundRouter from './routes/notFound.router.js';
import pathUtil from './app/utils/path/path.util.js';
import cookieParser from 'cookie-parser';
import commentsRouter from './routes/comments.router.js';
import subscriptionsRouter from './routes/subscriptions.router.js';

const app = express();
app.use(express.json()); // JSON 요청 파싱 처리
app.use(cookieParser());

// -----------------------------------------------------------
// 정적 파일 제공 등록
// -----------------------------------------------------------
app.use(process.env.ACCESS_FILE_POST_IMAGE_PATH, express.static(process.env.FILE_POST_IMAGE_PATH));
app.use(process.env.ACCESS_FILE_USER_PROFILE_PATH, express.static(process.env.FILE_USER_PROFILE_PATH));

// -----------------------------------------------------------
// Swagger 등록
// -----------------------------------------------------------
// swagger yaml file bundling
const swaggerDoc = await SwaggerParser.bundle(path.join(path.resolve(), 'swagger/swagger.yaml')); // path에 join메소드 - str으로 된 params들을 다 문자열로 합쳐준다.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc)); // api는 아니고 화면 관련이다.

// -----------------------------------------------------------
// 라우터 정의
// -----------------------------------------------------------
app.use('/api/auth', authRouter);
app.use('/api/files', filesRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users', usersRouter);
app.use('/api/subscriptions', subscriptionsRouter);

// -----------------------------------------------------------
// 404 처리
// -----------------------------------------------------------
app.use(notFoundRouter);

// -----------------------------------------------------------
// 뷰 반환 처리 (프론트 & 백엔드 서버 1개로만 쓰는 옵션)
// -----------------------------------------------------------
// 퍼블릭 정적파일을 제공 할 수 있게 활성화 한 것이다.
app.use('/', express.static(process.env.APP_DIST_PATH));
// React 뷰 반환
app.get(/^(?!\/files).*/, (req, res) => {
  return res.sendFile(pathUtil.getViewDirPath())
}); // ?!라는 뜻은 files를 제외하고 라는 뜻이다.

// -----------------------------------------------------------
// 에러 핸들러
// -----------------------------------------------------------
app.use(errorHandler);

// -----------------------------------------------------------
// 해당 Port로 express 실행
// -----------------------------------------------------------
app.listen(parseInt(process.env.APP_PORT));

