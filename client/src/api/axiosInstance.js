import axios from 'axios';

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: '', // 기본 URL (axios 호출 시, 가장 앞에 자동으로 연결하여 동작)
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  // 개발 환경에서 서버 도메인이 다르다.(크로스 도메인) 그렇지만 요청들을 주고 받을 수 있게, credential 정보를 담아서 보낼 수 있게 true로 설정. 기본은 false.
  // credential 정보: 1. 쿠키, 2. 헤더 authorization 항목
});

export default axiosInstance;
