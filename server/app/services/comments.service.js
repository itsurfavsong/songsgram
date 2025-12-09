/**
 * @file app/services/comments.service.js
 * @description comments Service
 * 251203 BSong init
 */

import commentRepository from "../repositories/comment.repository.js";
import postRepository from '../repositories/post.repository.js';
import pushSubscriptionRepository from "../repositories/pushSubscription.repository.js";
import db from '../models/index.js';
import webPush from '../../configs/webpush.config.js';
import PushSubscription from "../models/PushSubscription.js";
import userRepository from "../repositories/user.repository.js";

/**
 * 코멘트 작성 처리
 * @param {{postId: string, userId: string, content: string}} data
 */
async function store(data) {
  // 코멘트 작성
  const comment = await commentRepository.create(null, data);

  // 게시글 조회
  const post = await postRepository.findByPk(null, data.postId);

  // 내가 쓴 코멘츠가 타인 게시글일 때만 그 장본인에게 push 알람이 간다.
  if(post.userId !== data.userId) {
    await db.sequelize.transaction(async t => {

      // 댓글 작성자 정보 조회
      const user = await userRepository.findByPk(t, data.userId);

      // push 데이터 작성
      const payload = JSON.stringify({
        title: '새로운 댓글', // 알람 제목
        message: `${user.nick}님께서 당신의 게시글에 댓글을 작성하였습니다`, // 알람 내용
        data: { // 알람 화면에는 출력하지 않지만 전달할 필요가 있는 data
          targetUrl: `${process.env.APP_URL}${process.env.WEB_PUSH_FRONT_URL_POST_SHOW}/${data.postId}`
        }
      });

      // 게시글 작성자의 push 정보 획득 (전부다 다 가지고 온다)
      const pushSubscriptions = await pushSubscriptionRepository.findByUserId(t, post.userId);

      // 해당 push 발송
      const pushList = pushSubscriptions.map(async pushSubscription => {

        // subscription 구조
        const subscription = {
          endpoint: pushSubscription.endpoint,
          expirationTime: null,
          keys: {
            p256dh: pushSubscription.p256dh,
            auth: pushSubscription.auth
          }
        };
        try {
          await webPush.sendNotification(subscription, payload);
        } catch(error) {

          // expired push는 제거
          if(error.statusCode === 410) {
            await pushSubscriptionRepository.hardDestroy(t, pushSubscription.id);
          }
          // console.log(error); 만약 문제가 생기면 여기에 breakPoint를 걸어서 확인해보기
        }
      });

      // 병렬처리 완료 확인 (전부 다 만료가 되었는 가?)
      await Promise.allSettled(pushList);
    });
    return comment;
}
}

export default {
  store,
}
