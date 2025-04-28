const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const crypto = require('crypto');

exports.handler = async function(event, context) {
  const q = event.queryStringParameters.q;

  const appKey = '4733c68e76321b78';       // ✍ 这里填你的
  const appSecret = 'vEEVfY9i86WwYm35kqIqedzZOcaZnicp'; // ✍ 这里填你的

  const salt = Date.now();
  const curtime = Math.floor(Date.now() / 1000);
  const str1 = appKey + q + salt + curtime + appSecret;
  const sign = crypto.createHash('sha256').update(str1).digest('hex');

  const formData = new URLSearchParams();
  formData.append('q', q);
  formData.append('from', 'en');
  formData.append('to', 'zh-CHS');
  formData.append('appKey', appKey);
  formData.append('salt', salt);
  formData.append('sign', sign);
  formData.append('signType', 'v3');
  formData.append('curtime', curtime);

  const response = await fetch('https://openapi.youdao.com/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};