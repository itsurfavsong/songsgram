/**
 * @file app/services/subscription.service.js
 * @description subscription service
 * 251208 v1.0.0 BSong1 init
 */

import pushSubscriptionRepository from "../repositories/pushSubscription.repository.js";

async function subscribe(params) {
  const { userId, subscription, deviceInfo } = params;
  const { endpoint, keys } = subscription;
  const { userAgent } = deviceInfo;

  const data = {
    userId: userId,
    endpoint: endpoint,
    p256dh: keys.p256dh,
    auth: keys.auth,
    device: userAgent
  }

  // console.log(data);

  return await pushSubscriptionRepository.upsert(null, data);
}

export default {
  subscribe,
}

// Upsert is a database operation that combines the words "update" and "insert" to either update an existing record or insert a new one if it doesn't exist
