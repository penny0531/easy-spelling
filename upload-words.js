const { fetchDeepSeek } = require('../../backend/functions/fetchDeepSeek');

// 自动分块函数，每2个字母一组
function splitChunks(word) {
  const chunks = [];
  const chunkSize = 2;
  for (let i = 0; i < word.length; i += chunkSize) {
    chunks.push(word.substring(i, i + chunkSize));
  }
  return chunks;
}

// 处理所有单词
async function processAllWords(words) {
  const wordDetailsList = [];

  for (let word of words) {
    word = word.trim();
    const deepSeekResult = await fetchDeepSeek(word);

    const wordData = {
      word: deepSeekResult.word,
      phonetic: deepSeekResult.phonetic,
      chineseDefinition: deepSeekResult.chineseDefinition,
      chunks: deepSeekResult.chunkedWord ? deepSeekResult.chunkedWord.split(' ') : splitChunks(word),
    };

    wordDetailsList.push(wordData);
  }

  console.log('All words fetched:', wordDetailsList);

  const outputDiv = document.getElementById('wordList');
  outputDiv.innerHTML = "<h2>Generated Word List:</h2><pre>" + JSON.stringify(wordDetailsList, null, 2) + "</pre>";
}

// 入口函数，读取上传的文件
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