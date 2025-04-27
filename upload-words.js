// 上传文件并处理单词
function readFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (!file) {
      alert('Please select a file first!');
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = async function(event) {
      const content = event.target.result;
      const words = content.split(/\r?\n/).filter(w => w.trim() !== '');
      console.log("Loaded words:", words);
  
      const wordDetailsList = [];
  
      for (let word of words) {
        const details = await queryYoudao(word);
        wordDetailsList.push(details);
      }
  
      console.log("All word details:", wordDetailsList);
  
      const outputDiv = document.getElementById('wordList');
      outputDiv.innerHTML = "<h2>Generated Word List:</h2><pre>" +
        JSON.stringify(wordDetailsList, null, 2) + "</pre>";
    };
  
    reader.readAsText(file);
  }
  
  // 调用你自己的 Netlify Functions 转发去有道
  async function queryYoudao(word) {
    const response = await fetch(`/.netlify/functions/youdao?q=${encodeURIComponent(word)}`);
    const data = await response.json();
  
    if (data.errorCode && data.errorCode !== "0") {
      return {
        word: word,
        phonetic: "",
        chineseDefinition: "查询失败",
        chunks: splitChunks(word)
      };
    }
  
    return {
      word: word,
      phonetic: data.basic && data.basic['uk-phonetic'] ? `/${data.basic['uk-phonetic']}/` : '',
      chineseDefinition: data.translation ? data.translation[0] : '',
      chunks: splitChunks(word)
    };
  }
  
  // 简单分块
  function splitChunks(word) {
    const chunks = [];
    let chunkSize = 2;
    for (let i = 0; i < word.length; i += chunkSize) {
      chunks.push(word.substring(i, i + chunkSize));
    }
    return chunks;
  }