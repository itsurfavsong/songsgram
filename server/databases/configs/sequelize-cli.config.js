
/**
 * @file databases/config/sequelize-cli.config.js
 * @description sequelize-cli 설정 파일
 * 251117 v1.0.0 BSong1 최초 작성
 */

import '../../configs/env.config.js';

// connection pool이 필요없는 상황.
export default {
  development: {
    username: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DB_NAME,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: process.env.DB_MYSQL_DIALECT,
    timezone: process.env.DB_MYSQL_TIMEZONE
  },
  test: {
    username: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DB_NAME,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: process.env.DB_MYSQL_DIALECT,
    timezone: process.env.DB_MYSQL_TIMEZONE
  },
  production: {
    username: process.env.DB_MYSQL_USER,
    password: process.env.DB_MYSQL_PASSWORD,
    database: process.env.DB_MYSQL_DB_NAME,
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    dialect: process.env.DB_MYSQL_DIALECT,
    timezone: process.env.DB_MYSQL_TIMEZONE
  }
}
