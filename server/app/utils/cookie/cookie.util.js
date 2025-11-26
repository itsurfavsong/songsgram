/**
 * @file app/utils/cookie/coockie.util.js
 * @description Cookie 유틸리티
 * 251125 v1.0.0 BSong1 init
 */
import dayjs from "dayjs";

// -----------------------------------------------------------------------
// Private
// -----------------------------------------------------------------------
/**
 *
 * @param {*import("express").Response} res
 * @param {string} cookieName
 * @param {string} cookieValue
 * @param {number} ttl
 * @param {boolean} httpOnlyFlg
 * @param {boolean} secureFlg
 */
function setCookie(res, cookieName, cookieValue, ttl, httpOnlyFlg = true, secureFlg = false) { // 전체 쿠키 관여
  res.cookie(
    cookieName,
    cookieValue,
    {
      expires: dayjs().add(ttl, 'millisecond').toDate(),
      httpOnly: httpOnlyFlg,
      secure: secureFlg,
      sameSite: 'none', // 광고성 쿠키 접근 가능할 때 none, 아니야! 싫어 그러면 strict
    }
  )
};

// -----------------------------------------------------------------------
// Public
// -----------------------------------------------------------------------

/**
 *
 * @param {import("express").Response} res
 * @param {string} refreshToken
 */
function setCookieRefreshToken(res, refreshToken) { // 맵핑을 해서 책임을 덜하게 만든다. 얘는 리프레시 토큰에 관여하는 쿠키! (유지보수성UP)
  setCookie(
    res,
    process.env.JWT_REFRESH_TOKEN_COOKIE_NAME,
    refreshToken,
    parseInt(process.env.JWT_REFRESH_TOKEN_COOKIE_EXPIRY),
    true,
    true
  );
}


export default {
  setCookieRefreshToken,

}
