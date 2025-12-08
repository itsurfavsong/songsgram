import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance.js";

export default function usePushNotifications() {
  // 권한 플래그
  // NotificationPermission: "default" | "denied" | "granted"
  // 유저가 권한 거부를 한 경우, 코드상으로는 재설정 불가능
  // 크롬의 경우 `chrome://settings/content/notifications`로 접속하여 직접 허용 설정 필요
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isInit, setIsInit] = useState(false); // 모달 추가시에 초기화를 해줘야해서
  const [isCheckedSubscribe, setIsCheckedSubscribe] = useState(false);

  useEffect(() => {
    // usePushNotifications 초기화
    async function init() {
      try {
        // 서비스 워커(비동기) 준비
        const registration = await navigator.serviceWorker.ready;

        // 등록 중인 구독 정보 획득
        const subscribing = await registration.pushManager.getSubscription();
        if(subscribing) {
          setIsSubscribing(true);
        }
      } catch(error) {
        console.log(error);
      } finally {
        setIsInit(true);
      }
    }
    init();
  }, []);

  // 권한 요청
  async function requestPermission() {
    try {
      if('Notification' in window) {
        // Notification 지원하는 경우 (버전이 너무 낮은 디바이스일 경우)
        if(Notification?.permission === 'default') {
          // 허용이 아닌경우 처리
          const result = await Notification.requestPermission(); //  "default" | "denied" | "granted" 이 세 개 중에 1개 온다

          if(result !== 'granted') {
            alert('알림 허용을 하지 않으면 서비스 이용에 제한이 있습니다.');
            return false;
          } else {
            return true;
          }
        } else if(Notification?.permission === 'denied') {
            alert('알림을 거부하신 이력이 있습니다.\n알림 허용을 하지 않으면 서비스 이용에 제한이 있습니다.');
            return false;
        } else {
          return true;
        }
      } else {
        // Notification 지원하지 않는 경우
        alert('알림을 지원하지 않는 브라우저입니다.');
        return false;
      }
    } catch(error) {
      console.error(error);
      throw error;
    }
  }

  // 구독 등록 (refresh를 하거나 앱을 아예 껏다가 다시 접속할 때만 뜰 수 있게)
  async function subscribeUser() {
    try {
      if(!isSubscribing) {
        const isGranted = await requestPermission();

        // 권한 확인
        if(!isGranted) {
          return;
        }
        // 서비스 워커 준비
        const registration = await navigator.serviceWorker.ready;

        // 서비스 워커에 구독 정보 등록
        const subscription = await registration.pushManager.subscribe({ // UA(프론트)에서 Push Service(에이전트)한테 보내는 subscribe
          userVisibleOnly: true,
          applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY
        });

        // subscription의 구조 (에이전트에서 프론트로 받는 형식, monitor has done 레벨까지 옴)
        // {
        //   endpoint: 'https://fcm.googleapis.com/fcm/send/dFlTq11Ly-w:...',
        //   expirationTime: null,
        //   keys: {
        //     p256dh: 'BD9B5KMdQbwgG7...',
        //     auth: 'OL56CZS...'
        //   }
        // }

        const deviceInfo = {
          userAgent: navigator.userAgent,   // 브라우저/디바이스 정보
          language: navigator.language      // 언어 정보
        };

        // Backend에 구독 정보 등록 요청
        await axiosInstance.post('/api/subscriptions', {subscription, deviceInfo});

        alert('구독 성공');
      }
    } catch(error) {
      console.error("구독 실패: ", error);
    } finally {
      setIsCheckedSubscribe(true);
    }
  }

  return {
    isInit,
    isSubscribing,
    isCheckedSubscribe,
    subscribeUser,
  }
}
