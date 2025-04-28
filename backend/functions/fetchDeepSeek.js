const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiKey = '你的DeepSeek API KEY'; // <<< 填上你的真实DeepSeek API Key
  const url = 'https://api.deepseek.com/v1/chat/completions';

  const { word } = JSON.parse(event.body);

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

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    const messageContent = result.choices[0].message.content;

    try {
      const parsed = JSON.parse(messageContent);
      return {
        statusCode: 200,
        body: JSON.stringify(parsed)
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'DeepSeek返回格式解析失败' })
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '调用DeepSeek失败', details: error.message })
    };
  }
};