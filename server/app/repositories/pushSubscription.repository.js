/**
 * @file app/repositories/pushSubscription.repository.js
 * @description pushSubscription repository
 * 251208 v1.0.0 BSong1 init
 */

import db from '../models/index.js';
const { PushSubscription } = db;

async function upsert(t = null, data) {
  return PushSubscription.upsert(data, { transaction: t });
}

async function findByUserId(t = null, userId) {
  return PushSubscription.findAll({
    where: { userId },
    transaction: t
  });
}

async function hardDestroy(t = null, id) {
  return await PushSubscription.destroy({
    where: {id: id},
    force: true,
    transaction: t,
  });
}

export default {
  upsert,
  findByUserId,
  hardDestroy
};
