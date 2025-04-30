// 获取单词表的基础URL
const baseUrl = "https://penny-ai-teaching.oss-cn-beijing.aliyuncs.com";

let wordList = [];
let currentWordIndex = 0;
let selectedChunks = [];

// 打乱数组
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 根据选择的教材和单元构建URL
function getWordListUrl() {
    const book = localStorage.getItem('selectedBook');
    const unit = localStorage.getItem('selectedUnit');
    if (!book || !unit) {
        alert('Please select a textbook and unit first!');
        window.location.href = 'index.html';
        return null;
    }
    return `${baseUrl}/${book}/${unit}.json`;
}

// 页面加载时从 OSS 获取单词表
window.onload = function() {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        alert('Please enter your name first!');
        window.location.href = 'index.html';
        return;
    }

    const wordListUrl = getWordListUrl();
    if (!wordListUrl) return;

    // 添加当前单元信息显示
    const book = localStorage.getItem('selectedBook');
    const unit = localStorage.getItem('selectedUnit');
    const unitInfo = document.createElement('div');
    unitInfo.className = 'unit-info';
    unitInfo.innerHTML = `
        <h3>${book === 'starter' ? 'Think Starter' : 'Think 1'}</h3>
        <h4>Unit ${unit.split('unit')[1]}</h4>
        <p>Welcome, ${userName}!</p>
    `;
    document.querySelector('.container').insertBefore(unitInfo, document.querySelector('.top-bar'));

    fetch(wordListUrl)
        .then(res => res.json())
        .then(data => {
            wordList = data;
            loadWord();
        })
        .catch(err => {
            alert("单词表加载失败，请检查网络连接！");
            console.error(err);
        });
};

// 初始化单词
function loadWord() {
    selectedChunks = [];
    document.getElementById("celebration").innerText = "";
    const currentWord = wordList[currentWordIndex];
    document.getElementById("phonetic").innerText = currentWord.phonetic;
    document.getElementById("meaning").innerText = currentWord.chineseDefinition;
    document.getElementById("output").innerText = "";

    const shuffledChunks = shuffle([...currentWord.chunks]);
    const blocksContainer = document.getElementById("blocks");
    blocksContainer.innerHTML = "";

    shuffledChunks.forEach(chunk => {
        const btn = document.createElement("button");
        btn.innerText = chunk;
        btn.onclick = () => selectChunk(chunk);
        blocksContainer.appendChild(btn);
    });

    playWordSound();
}

// 点击选择块
function selectChunk(chunk) {
    selectedChunks.push(chunk);
    document.getElementById("output").innerText = selectedChunks.join("");
}

// 检查答案
function checkAnswer() {
    const currentWord = wordList[currentWordIndex];
    const userAnswer = selectedChunks.join("");

    if (userAnswer === currentWord.word) {
        showCelebration();
        setTimeout(() => {
            currentWordIndex++;
            if (currentWordIndex >= wordList.length) {
                alert("🎉 恭喜完成全部单词！");
                currentWordIndex = 0;
            }
            loadWord();
        }, 500);
    } else {
        alert("❌ 拼错了，请再试一次！");
        playErrorSound();
        resetWord();
    }
}

// 重置当前单词
function resetWord() {
    selectedChunks = [];
    document.getElementById("output").innerText = "";
}

// 单词发音
function playWordSound() {
    const currentWord = wordList[currentWordIndex];
    if (!currentWord) return;
    const utter = new SpeechSynthesisUtterance(currentWord.word);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
}

// 错误发音
function playErrorSound() {
    const utter = new SpeechSynthesisUtterance("Try again!");
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
}

// 正确时显示庆祝
function showCelebration() {
    document.getElementById("celebration").innerText = "🎉";
    setTimeout(() => {
        document.getElementById("celebration").innerText = "";
    }, 500);
}
