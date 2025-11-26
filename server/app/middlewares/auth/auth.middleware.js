/**
 * @file /app/middlewares/auth/auth.middleware.js
 * @description 인증 및 인가 처리 미들웨어
 * 251126 v1.0.0 BSong1 init
 */

import { FORBIDDEN_ERROR } from "../../../configs/responseCode.config.js";
import myError from "../../errors/customs/my.error.js";
import jwtUtil from "../../utils/jwt/jwt.util.js";
import ROLE_PERMISSIONS from "./configs/role.permissions.js";

// --------------------------------------------------------------------------------
// private
// --------------------------------------------------------------------------------
/**
 * ---------------------------------------토큰 검증 및 Request에 유저 정보를 추가하는 처리
 * @param {import("expres").Request} req
 */
function authenticate(req) {
  // 토큰 획득
  const token = jwtUtil.getBearerToken(req);

  // 토큰 검증 및 페이로드 획득
  const claims = jwtUtil.getClaimsWithVerifyToken(token);

  // Request 객체에 사용자 정보를 추가
  req.user = {
    id: parseInt(claims.sub),
    role: claims.role
  }
}

/**
 * -----------------------------------------------------------------인증 및 권한 체크
 * @param {import("expres").Request} req
 */
function authorize(req) {
 // 요청에 맞는 권한 규칙을 조회한다.
  const matchRole = ROLE_PERMISSIONS[req.method].find(item => { // item = 해당 배열에서 순서대로 꺼내오는 “각 요소(객체)” / find는 조건에 맞는 요소 ‘1개’를 반환
    // console.log(
    //   req.originalUrl, // 유저가 보내온 전체 ex) Path + Queries /api/auth/login?id=1
    //   req.baseUrl,    // 프리픽스로 묶음 Path ex) /api/auth
    //   req.path        // `baseUrl`을 제외한 Path ex) /login
    // );
    return item.path.test(`${req.baseUrl}${req.path}`); // true or false가 됨. true가 되면 true 배열을 반환한다.
  });

// function authorize(req) {
//  // 요청에 맞는 권한 규칙을 조회한다.
//   const matchRole = ROLE_PERMISSIONS
//    [{
//      path: /^\/api\/posts\/[0-9]+$/, roles: [NORMAL, SUPER]
//    },
//    {
//      ...
//     }......].find
    // (
//    {
//      path: /^\/api\/posts\/[0-9]+$/, roles: [NORMAL, SUPER]
//    }
//      => {return /^\/api\/posts\/[0-9]+$/.test(/reissue 유저가 보내온 request)}; // true or false가 됨.
//     );

 // 일치하는 규칙이 있을 시, 인증 및 권한 체크를 실시
  if(matchRole) {
 // 인증 체크 및 인증 정보를 Request set up
    authenticate(req);

    // 권한 체크
    const userRole = req.user?.role;
    if(!userRole || !matchRole.roles.includes(userRole)) {
      throw myError('권한 부족', FORBIDDEN_ERROR);
    }

  }
}

// --------------------------------------------------------------------------------
// public
// --------------------------------------------------------------------------------
export default function(req, res, next) {
  try {
    authorize(req);
    return next();
  } catch (error) {
    return next(error);
  }
}
