const https = require('https');
const crypto = require('crypto');
const querystring = require('querystring');

const appKey = process.env.YOUDAO_APP_KEY;
const appSecret = process.env.YOUDAO_APP_SECRET;

function generateSign(word, salt) {
  const str = appKey + word + salt + appSecret;
  return crypto.createHash('md5').update(str).digest('hex');
}

exports.handler = async (event, context) => {
  try {
    const { word } = JSON.parse(event.body || '{}');
    if (!word) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing word" }) };
    }

    const salt = Date.now();
    const sign = generateSign(word, salt);

    const postData = querystring.stringify({
      q: word,
      appKey: appKey,
      salt: salt,
      from: 'en',
      to: 'zh-CHS',
      sign: sign
    });

    const options = {
      hostname: 'openapi.youdao.com',
      path: '/api',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const apiResponse = await new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.write(postData);
      req.end();
    });

    // 👇 打印有道返回的原始数据
    console.log('Youdao API Raw Response:', apiResponse);

    let chineseDefinition = "";
    let phonetic = "";

    if (apiResponse && apiResponse.translation && Array.isArray(apiResponse.translation)) {
      chineseDefinition = apiResponse.translation[0] || "No translation found";
    } else {
      chineseDefinition = "No translation found";
    }

    if (apiResponse && apiResponse.basic) {
      phonetic = apiResponse.basic['us-phonetic'] || apiResponse.basic['uk-phonetic'] || apiResponse.basic['phonetic'] || "";
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        word,
        chineseDefinition,
        phonetic,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};