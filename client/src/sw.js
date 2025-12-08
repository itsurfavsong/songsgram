import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

const PREFIX = import.meta.env.VITE_APP_NAME;

// -------------------------------------------------------------------------------------------------
// 정적 파일 캐싱
// -------------------------------------------------------------------------------------------------

precacheAndRoute(self.__WB_MANIFEST); // 이미지 설정(정적파일)

// -------------------------------------------------------------------------------------------------
// HTML 오프라인 대응
// -------------------------------------------------------------------------------------------------
registerRoute(
  ({request}) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: `${PREFIX}-html-cache`,
    networkTimeoutSeconds: 3
  })
);

// -------------------------------------------------------------------------------------------------
// 이미지 캐싱(이미지 저장)
// -------------------------------------------------------------------------------------------------
registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: `${PREFIX}-image-cache`,
    networkTimeoutSeconds: 3
  })
);

// -------------------------------------------------------------------------------------------------
// API 요청 캐싱(최소 동작 보장, GET을 제외한 나머지는 제외)
// -------------------------------------------------------------------------------------------------
registerRoute( // 우리 도메인이 맞는지 먼저 확인함! (url.origin === import.meta.env.VITE_SERVER_URL)
  ({request, url}) => url.origin === import.meta.env.VITE_SERVER_URL && request.method === 'GET',
  new StaleWhileRevalidate({
    cacheName: `${PREFIX}-api-cache`,
    networkTimeoutSeconds: 3
  })
);
