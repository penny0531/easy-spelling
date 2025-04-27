// 自动分块，每2个字母一组
function splitChunks(word) {
  const chunks = [];
  const chunkSize = 2;
  for (let i = 0; i < word.length; i += chunkSize) {
    chunks.push(word.substring(i, i + chunkSize));
  }
  return chunks;
}

// 查询有道翻译（中转到 netlify serverless function）
async function queryYoudao(word) {
  try {
    const response = await fetch('/.netlify/functions/youdao?q=' + encodeURIComponent(word));
    const data = await response.json();
    if (data.translation) {
      return data.translation[0];
    } else {
      return 'No translation found';
    }
  } catch (error) {
    console.error('Youdao API error:', error);
    return 'Error';
  }
}

// 查询音标（用免费的字典API）
async function fetchWordData(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    const data = await response.json();
    if (data && data[0] && data[0].phonetic) {
      return { phonetic: data[0].phonetic };
    }
    return { phonetic: '' };
  } catch (error) {
    console.error('Phonetic API error:', error);
    return { phonetic: '' };
  }
}

// 处理所有单词
async function processAllWords(words) {
  const wordDetailsList = [];
  for (let word of words) {
    const chineseDefinition = await queryYoudao(word);
    const freeData = await fetchWordData(word);
    const chunks = splitChunks(word);

    const wordData = {
      word: word,
      phonetic: freeData.phonetic,
      chineseDefinition: chineseDefinition,
      chunks: chunks
    };

    wordDetailsList.push(wordData);
  }

  console.log('All words fetched:', wordDetailsList);

  const outputDiv = document.getElementById('wordList');
  outputDiv.innerHTML = "<h2>Generated Word List:</h2><pre>" +
    JSON.stringify(wordDetailsList, null, 2) +
    "</pre>";
}

// 入口函数，读取文件
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