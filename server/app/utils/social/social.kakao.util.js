/**
 * @file app/utils/social/social.kakao.util.js
 * @description 카카오 소셜 로그인 관련 유틸리티
 * 251204 v1.0.0 BSong1 init
 */

// --------------------------------------------------------------------------------------
/**
 * 카카오 인가 코드 발급 URL 생성
 * @returns {string} URL
 */
function getAuthorizeURL() {
  const params = {
    client_id: process.env.SOCIAL_KAKAO_REST_API_KEY,
    redirect_uri: `${process.env.APP_URL}${process.env.SOCIAL_KAKAO_CALLBACK_URL}`, // uri = url + urn
    response_type: 'code',
    // prompt: 'login', // TODO LIST 나중에 다시 살릴 것. (테이트 용이성을 위해 잠시 지워둠. 지워두게 된다면 로그인을 계속 안해도 됨.)
  };

  // 객체 형태에서 쿼리 파라미터로
  const queryParams = new URLSearchParams(params).toString(); // 얘는 객체인데 객체 형태에서 쿼리 파라미터로 바꿔준다. 먼저 객체 생성 후 toString으로 문자열로 ㄱ

  return `${process.env.SOCIAL_KAKAO_API_URL_AUTHORIZE}?${queryParams}`;
}

// --------------------------------------------------------------------------------------
/**
 * 카카오 토큰 생성 관련
 * @returns
 */
function getTokenRequest(code) {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const params = {
    grant_type: 'authorization_code',
    client_id: process.env.SOCIAL_KAKAO_REST_API_KEY,
    redirect_uri: `${process.env.APP_URL}${process.env.SOCIAL_KAKAO_CALLBACK_URL}`,
    code: code
  };

  const searchParams = new URLSearchParams(params);

  return { headers, searchParams };
}

// --------------------------------------------------------------------------------------
/**
 * 유저 req
 * @returns
 */
function getUserRequest(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const params = {
    secure_resource: true
  };

  const searchParams = new URLSearchParams(params);

  return { headers, searchParams };
}

// --------------------------------------------------------------------------------------
/**
 * 카카오 유저 req
 * @returns
 */
function getLogoutRequest(id, token) {
 const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  };

  const params = {
    target_id_type: 'user_id',
    target_id: id
  };

  const searchParams = new URLSearchParams(params);

  return { headers, searchParams };
}

export default {
  getAuthorizeURL,
  getTokenRequest,
  getUserRequest,
  getLogoutRequest
}

