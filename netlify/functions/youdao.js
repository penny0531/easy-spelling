const fetch = require('node-fetch');
const crypto = require('crypto');

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

    const url = `https://openapi.youdao.com/api?q=${encodeURIComponent(word)}&appKey=${appKey}&salt=${salt}&from=en&to=zh-CHS&sign=${sign}`;

    const response = await fetch(url);
    const data = await response.json();

    let chineseDefinition = "";
    let phonetic = "";

    if (data && data.translation && Array.isArray(data.translation)) {
      chineseDefinition = data.translation[0] || "No translation found";
    } else {
      chineseDefinition = "No translation found";
    }

    if (data && data.basic) {
      phonetic = data.basic['us-phonetic'] || data.basic['uk-phonetic'] || data.basic['phonetic'] || "";
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