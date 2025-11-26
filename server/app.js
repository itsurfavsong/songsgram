/**
 * @file app.js
 * @description Entry Point
 * 251117 v1.0.0 BSong1
 */

import express from 'express';
import './configs/env.config.js';
import authRouter from './routes/auth.router.js';
import errorHandler from './app/errors/errorHandler.js';
import SwaggerParser from 'swagger-parser';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

const app = express();
app.use(express.json()); // JSON 요청 파싱 처리

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

// 에러 핸들러
app.use(errorHandler);

// -----------------------------------------------------------
// 해당 Port로 express 실행
// -----------------------------------------------------------
app.listen(parseInt(process.env.APP_PORT));

