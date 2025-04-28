// upload-words.js

async function fetchDeepSeek(word) {
  const apiKey = 'sk-fe248bf56d694559a0ecf5bf3b9d0f67'; // 换成你的真实API KEY
  const url = 'https://api.deepseek.com/v1/chat/completions';

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
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API 请求失败: ${response.status}`);
  }

  const result = await response.json();
  const messageContent = result.choices[0].message.content;

  try {
    return JSON.parse(messageContent);
  } catch (err) {
    console.error('解析DeepSeek返回失败:', messageContent);
    throw new Error('DeepSeek返回格式异常');
  }
}

// 自动分块函数
function splitChunks(word) {
  const chunks = [];
  const chunkSize = 2;
  for (let i = 0; i < word.length; i += chunkSize) {
    chunks.push(word.substring(i, i + chunkSize));
  }
  return chunks;
}

// 主处理函数
async function processAllWords(words) {
  const wordDetailsList = [];

  for (let word of words) {
    word = word.trim();
    if (word === '') continue;

    const deepSeekResult = await fetchDeepSeek(word);

    const wordData = {
      word: deepSeekResult.word,
      phonetic: deepSeekResult.phonetic,
      chineseDefinition: deepSeekResult.chineseDefinition,
      chunks: deepSeekResult.chunkedWord ? deepSeekResult.chunkedWord.split(' ') : splitChunks(word),
    };

    wordDetailsList.push(wordData);
  }

  const outputDiv = document.getElementById('wordList');
  outputDiv.innerHTML = "<h2>Generated Word List:</h2><pre>" + JSON.stringify(wordDetailsList, null, 2) + "</pre>";
}

// 入口函数，绑定按钮
function readFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a file first!');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const content = event.target.result;
    const words = content.split(/\r?\n/).filter(w => w.trim() !== '');
    processAllWords(words);
  };
  reader.readAsText(file);
}