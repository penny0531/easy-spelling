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

// 备用：自然拼读分块（常见组合优先）
function splitChunks(word) {
  // 常见自然拼读组合
  const patterns = [
    'ai', 'oa', 'ee', 'oo', 'ea', 'ou', 'ow', 'ar', 'or', 'er', 'ir', 'ur',
    'ch', 'sh', 'th', 'ph', 'wh', 'ck', 'ng', 'qu', 'ay', 'oy', 'oi', 'au', 'aw', 'ie', 'ue', 'ew'
  ];
  let chunks = [];
  let i = 0;
  while (i < word.length) {
    let found = false;
    for (let pat of patterns) {
      if (word.slice(i, i + pat.length).toLowerCase() === pat) {
        chunks.push(word.slice(i, i + pat.length));
        i += pat.length;
        found = true;
        break;
      }
    }
    if (!found) {
      chunks.push(word[i]);
      i++;
    }
  }
  return chunks;
}

let lastWordDetailsList = [];

// 处理上传的所有单词
async function processAllWords(words) {
  const wordDetailsList = [];
  for (let word of words) {
    word = word.trim();
    if (word === '') continue;
    const deepSeekResult = await fetchDeepSeek(word);
    let chunks;
    if (deepSeekResult.chunkedWord && deepSeekResult.chunkedWord.trim() !== "") {
      chunks = deepSeekResult.chunkedWord.split(' ');
      if (chunks.length === 1) {
        chunks = splitChunks(word);
      }
    } else {
      chunks = splitChunks(word);
    }
    const wordData = {
      word: deepSeekResult.word,
      phonetic: deepSeekResult.phonetic,
      chineseDefinition: deepSeekResult.chineseDefinition,
      chunks: chunks,
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
    alert('请选择一个文件！');
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