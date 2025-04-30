// Version: 2024-04-29-002
console.log('JS loaded: 2024-04-29-002');

// 本地缓存管理
const wordCache = {
  save: (word, data) => {
    try {
      localStorage.setItem(`word_${word.toLowerCase()}`, JSON.stringify(data));
    } catch (error) {
      console.warn('缓存保存失败:', error);
    }
  },
  get: (word) => {
    try {
      const cached = localStorage.getItem(`word_${word.toLowerCase()}`);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.warn('缓存读取失败:', error);
      return null;
    }
  },
  clear: () => {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('word_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('缓存清理失败:', error);
    }
  }
};

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

// 显示处理进度
function updateProgress(current, total, word = '') {
  const outputDiv = document.getElementById('wordList');
  const progress = Math.round((current / total) * 100);
  outputDiv.innerHTML = `
    <div class="progress-container">
      <h2>处理进度: ${progress}% (${current}/${total})</h2>
      ${word ? `<p>当前处理: ${word}</p>` : ''}
      <div class="progress-bar">
        <div class="progress" style="width:${progress}%"></div>
      </div>
    </div>
  `;
}

// 处理上传的所有单词
async function processAllWords(words) {
  const wordDetailsList = [];
  const total = words.length;
  let current = 0;

  // 获取选中的教材和单元
  const bookSelect = document.getElementById('bookSelect');
  const unitSelect = document.getElementById('unitSelect');
  const bookUnit = `${bookSelect.value}_${unitSelect.value}`;

  try {
    for (let word of words) {
      word = word.trim();
      if (word === '') continue;

      current++;
      updateProgress(current, total, word);

      // 检查缓存
      const cached = wordCache.get(word);
      if (cached) {
        wordDetailsList.push(cached);
        continue;
      }

      try {
        const deepSeekResult = await fetchDeepSeek(word);
        let chunks;

        if (deepSeekResult.chunks && Array.isArray(deepSeekResult.chunks)) {
          chunks = deepSeekResult.chunks;
        } else if (deepSeekResult.chunkedWord && deepSeekResult.chunkedWord.trim() !== "") {
          chunks = deepSeekResult.chunkedWord.split(' ').filter(chunk => chunk);
        } else {
          chunks = splitChunks(word);
        }

        const wordData = {
          word: deepSeekResult.word,
          phonetic: deepSeekResult.phonetic,
          chineseDefinition: deepSeekResult.chineseDefinition,
          chunks: chunks,
        };

        // 保存到缓存
        wordCache.save(word, wordData);
        wordDetailsList.push(wordData);

        // 添加延迟以避免API限制
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`处理单词 "${word}" 时出错:`, error);
        // 继续处理下一个单词
      }
    }

    // 显示结果
    displayResults(wordDetailsList, bookUnit);
  } catch (error) {
    console.error('处理单词列表时出错:', error);
    alert('处理过程中出现错误，请查看控制台了解详情。');
  }
}

// 显示处理结果
function displayResults(wordDetailsList, bookUnit) {
  const outputDiv = document.getElementById('wordList');
  
  // 添加更清晰的显示
  const wordsHtml = wordDetailsList.map(word => `
    <div class="word-item">
      <div class="word-header">
        <strong>${word.word}</strong>
        <span class="phonetic">${word.phonetic || ''}</span>
      </div>
      <div class="word-definition">${word.chineseDefinition || ''}</div>
      <div class="word-chunks">
        分块结果: ${word.chunks.map(chunk => 
          `<span class="chunk">${chunk}</span>`
        ).join('')}
      </div>
    </div>
  `).join('');

  outputDiv.innerHTML = `
    <div class="results-container">
      <h2>处理完成</h2>
      <div class="export-section">
        <button onclick="exportJSON('${bookUnit}')" class="export-btn">导出 JSON</button>
        <p class="export-info">文件将保存为: ${bookUnit}.json</p>
      </div>
      <div class="words-list">
        ${wordsHtml}
      </div>
    </div>
  `;

  // 保存最后处理的结果
  lastWordDetailsList = wordDetailsList;
}

// 导出JSON
function exportJSON(bookUnit = '') {
  if (!lastWordDetailsList || !lastWordDetailsList.length) {
    alert('请先上传并处理单词！');
    return;
  }

  const fileName = bookUnit ? `${bookUnit}.json` : 'words.json';
  const dataStr = "data:text/json;charset=utf-8," + 
                 encodeURIComponent(JSON.stringify(lastWordDetailsList, null, 2));
  
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", fileName);
  dlAnchorElem.click();
}

// 入口函数：读取文件并处理
function readFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert('请选择一个文件！');
    return;
  }

  // 检查是否选择了教材和单元
  const bookSelect = document.getElementById('bookSelect');
  const unitSelect = document.getElementById('unitSelect');
  if (!bookSelect.value || !unitSelect.value) {
    alert('请先选择教材和单元！');
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
  // 检查是否选择了教材和单元
  const bookSelect = document.getElementById('bookSelect');
  const unitSelect = document.getElementById('unitSelect');
  if (!bookSelect.value || !unitSelect.value) {
    alert('请先选择教材和单元！');
    return;
  }

  const content = document.getElementById('manualInput').value;
  const words = content.split(/\r?\n/).filter(w => w.trim() !== '');
  if (words.length === 0) {
    alert('请输入单词！');
    return;
  }
  processAllWords(words);
}

// 清除缓存
function clearCache() {
  wordCache.clear();
  alert('缓存已清除！');
}