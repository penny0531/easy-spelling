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
            content: `你是一个英语自然拼读专家，返回单词的JSON格式：{"word":"", "chineseDefinition":"", "phonetic":"", "chunkedWord":""}。
要求：
1. phonetic必须是标准的国际音标格式，用/包裹，例如/həˈləʊ/
2. chunkedWord必须严格按照自然拼读规则分块：
   - 单音节单词必须分解成最小的拼读单元，例如：
     * "hot" 应分解为 ["h", "o", "t"]
     * "rain" 应分解为 ["r", "ai", "n"]
     * "snow" 应分解为 ["s", "n", "ow"]
   - 元音字母组合（如ai, ea, oo等）要作为一个块
   - 辅音字母组合（如sh, th, ch等）要作为一个块
   - 其他单个字母各作为一个块
   - 更多示例：
     * "sheet" 应分解为 ["sh", "ee", "t"]
     * "that" 应分解为 ["th", "a", "t"]
     * "cat" 应分解为 ["c", "a", "t"]
3. 所有分块之间用空格分隔
4. 不要添加任何额外解释`
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
      
      // 确保音标格式正确
      if (jsonObj.phonetic && !jsonObj.phonetic.startsWith('/')) {
        jsonObj.phonetic = '/' + jsonObj.phonetic.replace(/[\/]/g, '') + '/';
      }
      
      // 确保 chunkedWord 被正确解析为数组
      if (typeof jsonObj.chunkedWord === 'string') {
        jsonObj.chunks = jsonObj.chunkedWord.split(' ').filter(chunk => chunk);
        delete jsonObj.chunkedWord;
      }
  
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