/**
 * @file configs/responseCode.config.js
 * @description 서비스 전역 응답 코드 설정 모듈(각 API 응답시 참조되는 표준 응답 코드 정의)
 * 251119 v1.0.0 BSong init
 */

// --------------------------------------------------------------------------------
// type import
// --------------------------------------------------------------------------------

/**
 * @typedef {import('./responseCode.config.type.js').ResponseCodeConfig} ResponseCodeConfig
 */

// ---------------------------------------------------------------------------------
/**
 * 로그인 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const SUCCESS = {
  code: '00',
  info: 'NORMAL_CODE',
  description: '정상 처리',
  status: 200
}

Object.freeze(SUCCESS); // object를 바꾸지 말도록 고정하는 것. 즉 각각의 데이터 타입을 변하지 않게 하려고.

/**
 * 아이디나 비밀번호 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const NOT_REGISTERED_ERROR = {
  code: 'E01',
  info: 'Unauthorized Error',
  description: '아이디나 비밀번호가 틀렸습니다.',
  status: 400 // 나쁜 request가 왔다라는 의미
}

Object.freeze(NOT_REGISTERED_ERROR);

/**
 * 파라미터 에러 응답 코드 설정
 * @type {ResponseCodeConfig}
 */
const BAD_REQUEST_ERROR = {
  code: 'E21',
  info: 'Bad Request Error',
  description: '요청 파라미터에 이상이 있습니다.',
  status: 400 // 나쁜 request가 왔다라는 의미
}

Object.freeze(BAD_REQUEST_ERROR);

export {
  SUCCESS,
  NOT_REGISTERED_ERROR,
  BAD_REQUEST_ERROR
}
