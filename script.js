// 替换这里的链接为你的阿里云 OSS 文件链接
const wordListUrl = "https://penny-ai-teaching.oss-cn-beijing.aliyuncs.com/weather.txt";  // 把这个链接换成你的

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

// 从阿里云 OSS 加载单词表
window.onload = function() {
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
        playSuccessSound();
        setTimeout(() => {
            currentWordIndex++;
            if (currentWordIndex >= wordList.length) {
                alert("🎉 恭喜完成全部单词！");
                currentWordIndex = 0;
            }
            loadWord();
        }, 1500);
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
    const utter = new SpeechSynthesisUtterance(wordList[currentWordIndex].word);
    utter.lang = "en-US";
    speechSynthesis.speak(utter);
}

// 正确发音
function playSuccessSound() {
    const utter = new SpeechSynthesisUtterance("Well done!");
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
    document.getElementById("celebration").innerText = "🎉 Well Done!";
}
