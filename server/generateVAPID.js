import webpush from 'web-push';

const keys = webpush.generateVAPIDKeys();

console.log(JSON.stringify(keys, null, 2)); // 2는 invent 프리티하게 볼라고
