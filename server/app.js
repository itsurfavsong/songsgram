/**
 * @file app.js
 * @description Entry Point
 * 251117 v1.0.0 BSong1
 */

import express from 'express';
import './configs/env.config.js';

const app = express();
// app.use('/', express.static());

app.get('/', (req, res, next) => {
  res.status(200).send('테스트');
});

// 해당 port로 express 실행
app.listen(3000);
