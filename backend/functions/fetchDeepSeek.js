const fetch = require('node-fetch'); // 如果环境有fetch，可以删掉这行

async function fetchDeepSeek(word) {
  const apiKey = 'sk-fe248bf56d694559a0ecf5bf3b9d0f67'; // <<< 填你的真实 key
  const url = 'https://api.deepseek.com/v1/chat/completions';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000); // 10秒超时

    const body = {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: '你是一个英语助手，请返回这个单词的 JSON 格式：{ "word": "", "chineseDefinition": "", "phonetic": "", "chunkedWord": "" }，不要多余解释。'
        },
        {
          role: 'user',
          content: `单词: ${word}`
        }
      ]
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body),
      signal: controller.signal
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`DeepSeek API 请求失败: ${response.status}`);
    }

    const result = await response.json();
    const messageContent = result.choices[0].message.content;

    // 解析 JSON
    try {
      const parsed = JSON.parse(messageContent);
      return parsed; // { word, chineseDefinition, phonetic, chunkedWord }
    } catch (err) {
      console.error('DeepSeek返回格式解析失败:', messageContent);
      throw new Error('DeepSeek 返回的格式错误，无法解析');
    }

  } catch (error) {
    console.error('调用 DeepSeek API 失败:', error.message);
    throw error;
  }
}

module.exports = { fetchDeepSeek };