// 调用 Netlify function 服务器端 fetchDeepSeek
async function fetchDeepSeek(word) {
  const response = await fetch('/.netlify/functions/fetchDeepSeek', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ word })
  });

  if (!response.ok) {
    throw new Error(`Serverless Function调用失败: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

// 自动分块函数（增强版，单音节也能分2-3块）
function splitChunks(word) {
  if (word.length <= 3) {
    return word.split('');
  } else if (word.length === 4) {
    return [word.slice(0,2), word.slice(2)];
  } else if (word.length === 5) {
    return [word.slice(0,2), word.slice(2,4), word.slice(4)];
  } else {
    const chunks = [];
    const chunkSize = 2;
    for (let i = 0; i < word.length; i += chunkSize) {
      chunks.push(word.substring(i, i + chunkSize));
    }
    return chunks;
  }
}

let lastWordDetailsList = [];

// 处理上传的所有单词
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
  lastWordDetailsList = wordDetailsList; // 保存到全局变量
  const outputDiv = document.getElementById('wordList');
  outputDiv.innerHTML = "<h2>Generated Word List:</h2><pre>" + JSON.stringify(wordDetailsList, null, 2) + "</pre>";
}

// 入口函数：读取文件并处理
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

// 手动输入处理
function processManualInput() {
  const content = document.getElementById('manualInput').value;
  const words = content.split(/\r?\n/).filter(w => w.trim() !== '');
  processAllWords(words);
}

// 一键导出JSON
function exportJSON() {
  if (!lastWordDetailsList.length) {
    alert('请先上传并处理单词！');
    return;
  }
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(lastWordDetailsList, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", "words.json");
  dlAnchorElem.click();
}