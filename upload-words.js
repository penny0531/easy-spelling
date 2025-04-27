// 自动分块，每2个字母一组
function splitChunks(word) {
    const chunks = [];
    let chunkSize = 2;
  
    for (let i = 0; i < word.length; i += chunkSize) {
      chunks.push(word.substring(i, i + chunkSize));
    }
  
    return chunks;
  }
  
  // 处理全部单词：查中文释义、查音标、拼读分块
  async function processAllWords(words) {
    const wordDetailsList = [];
  
    for (let word of words) {
      // 查询中文释义
      const chineseDefinition = await queryYoudao(word);
  
      // 查询音标
      const freeData = await fetchWordData(word); // 只取 phonetic
  
      // 自动拼读分块
      const chunks = splitChunks(word);
  
      const wordData = {
        word: word,
        phonetic: freeData.phonetic,
        chineseDefinition: chineseDefinition,
        chunks: chunks
      };
  
      wordDetailsList.push(wordData);
    }
  
    console.log("All words fetched:", wordDetailsList);
  
    const outputDiv = document.getElementById('wordList');
    outputDiv.innerHTML = "<h2>Generated Word List:</h2><pre>" +
      JSON.stringify(wordDetailsList, null, 2) +
      "</pre>";
  }
  
  // 读文件，触发处理
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
      console.log("Loaded words:", words);
  
      processAllWords(words); // 这里一定要调用
    };
  
    reader.readAsText(file);
  }
  // 1. 自动拆分块
function splitChunks(word) {
    const chunks = [];
    let chunkSize = 2; // 每2个字母一组
    for (let i = 0; i < word.length; i += chunkSize) {
      chunks.push(word.substring(i, i + chunkSize));
    }
    return chunks;
  }
  
  // 2. 查单词音标
  async function fetchWordData(word) {
    return {
      phonetic: '',  // 暂时留空，后面可以加发音API
    };
  }
  
  // 3. 查单词中文释义
  async function queryYoudao(word) {
    const appKey = '你的应用ID';      // 改成你自己的
    const appSecret = '你的应用密钥';   // 改成你自己的
    const salt = Date.now();
    const curtime = Math.round(new Date().getTime()/1000);
    const str1 = appKey + word + salt + curtime + appSecret;
    const sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
  
    const url = `https://openapi.youdao.com/api?q=${encodeURIComponent(word)}&from=en&to=zh-CHS&appKey=${appKey}&salt=${salt}&sign=${sign}&signType=v3&curtime=${curtime}`;
  
    const response = await fetch(url);
    const data = await response.json();
  
    if (data.translation && data.translation.length > 0) {
      return data.translation[0];
    } else {
      return "翻译失败";
    }
  }
  
  // 4. 批量处理
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
  
    console.log("All words fetched:", wordDetailsList);
  
    const outputDiv = document.getElementById('wordList');
    outputDiv.innerHTML = "<h2>Generated Word List:</h2><pre>" +
      JSON.stringify(wordDetailsList, null, 2) + "</pre>";
  }
  
  // 5. 主入口
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