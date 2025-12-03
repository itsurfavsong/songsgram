import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { reissueThunk } from '../store/thunks/authThunk.js';

// store 저장용 변수
let store = null;

// store 주입용 함수
export function injectStoreInAxios(_store) {
  store = _store;
}

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: '', // 기본 URL (axios 호출 시, 가장 앞에 자동으로 연결하여 동작)
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  // 개발 환경에서 서버 도메인이 다르다.(크로스 도메인) 그렇지만 요청들을 주고 받을 수 있게, credential 정보를 담아서 보낼 수 있게 true로 설정. 기본은 false.
  // credential 정보: 1. 쿠키, 2. 헤더 authorization 항목
});

axiosInstance.interceptors.request.use(async (config) => { // 이걸 하는 이유가 로그인이 자꾸 풀린다. 그래서 하는 거다.
  const noRetry = /^\/api\/auth\/reissue$/;
  let { accessToken } = store.getState().auth; // axiosInstance는 컴포넌트가 아니라서 Hook을 못써서 일부러 이런 설정을 해둔다.

  try {
    // 엑세스 토큰 있음 && retry 제외 URL 아님
    if(accessToken && !noRetry.test(config.url)) {
      // 액세스 토큰 만료 확인
      const claims = jwtDecode(accessToken);
      const now = dayjs().unix();
      const expTime = dayjs.unix(claims.exp).add(-5, 'minute').unix();

      if(now >= expTime) {
        const response = await store.dispatch(reissueThunk()).unwrap();
        accessToken = response.data.accessToken;
      }
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  } catch (error) {
    console.log('axios intercepter', error)
    return Promise.reject(error);
  }
});

export default axiosInstance;
