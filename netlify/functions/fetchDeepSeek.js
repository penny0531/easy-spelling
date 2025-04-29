exports.handler = async function(event, context) {
    try {
      const apiKey = 'sk-fe248bf56d694559a0ecf5bf3b9d0f67';
      const url = 'https://api.deepseek.com/v1/chat/completions';
  
      const { word } = JSON.parse(event.body);
  
      const body = {
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: '你是一个英语助手，返回单词的JSON格式：{"word":"", "chineseDefinition":"", "phonetic":"", "chunkedWord":""}，chunkedWord 字段请严格用自然拼读法分块（即使是单音节单词也要分成多个拼读块，每个拼读块用空格分隔），不要多余解释。'
          },
          {
            role: 'user',
            content: `单词：${word}`
          }
        ]
      };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });
  
      const result = await response.json();
      let messageContent = result.choices[0].message.content;
  
      // 去除 markdown 代码块
      messageContent = messageContent.replace(/```json|```/g, '').trim();
  
      // 解析为对象再返回标准 JSON
      const jsonObj = JSON.parse(messageContent);
  
      return {
        statusCode: 200,
        body: JSON.stringify(jsonObj),
      };
    } catch (error) {
      console.error('Function error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }