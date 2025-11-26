/**
 * @file app/middlewares/loggers/winston.logger.js
 * @description Winston Logger
 * 251124 v1.0.0 BSong1 init
 */

import winston from 'winston';
import dayjs from 'dayjs';
// ----------------------------------------------------------------------------------------
// private 함수
// ----------------------------------------------------------------------------------------
// 커스텀 포맷 작성 - 스트링으로 반환 / 우리는 message랑 level만 출력할 것이다.
const customFormat = winston.format.printf(({message, level}) => {
  // ex) [2025-11-24 10:12:50] level - message
  const now = dayjs().locale(process.env.APP_TZ).format('YYYY-MM-DD HH:mm:ss');
  return `[${now}] ${level} - ${message}`;
});

// ----------------------------------------------------------------------------------------
// public 함수
// ----------------------------------------------------------------------------------------
// 범용 로거 인스턴스
export const logger = winston.createLogger(
  {
    level: process.env.LOG_LEVEL, // 로그 레벨 제한
    format: winston.format.combine( // customFormat와 같은 함수들 많이 넣어줄때, winston을 이용해서 다량으로 넣어준다.
      customFormat
    ),
    transports: [ // 로그를 출력하는 관리 설정 (파일로 출력할래? 콘솔로 출력할래?)
      new winston.transports.File(
        {
          filename: `${process.env.LOG_BASE_PATH}/${dayjs().locale(process.env.APP_TZ).format('YYYYMMDD')}_${process.env.LOG_FILE_NAME}`, // 파일명
          // level: 'error' // 파일 작성 로그 레벨 제한
        },

   // new winston.transports.File(
    // {filename: `${dayjs().locale(process.env.APP_TZ).format('YYYYMMDD')}_log.log`, // 파일명
       // level: 'debug' // 파일 작성 로그 레벨 제한
     // }
      // ),
      )
    ]
  }
);

logger.debug('요요요요'); // 디버그 관련
logger.error('야야야야'); // 에러 관련

