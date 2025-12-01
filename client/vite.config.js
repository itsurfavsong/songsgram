import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // 개발 서버 Proxy 정의
  server: {
    proxy: {
      // 경로가 `/api`로 시작하는 요청을 대상으로 proxy 설정
      '/api': {
        target: 'http://localhost:3000', // Request 대상 서버 주소
        changeOrigin: true, // Requset Header Host 필드의 값을 대상 서버 호스트로 변경
        secure: false, // SSL 인증서 검증 무시
        ws: true, // websocket 프로토콜 사용하는 처리
      }
    }
  }
})
