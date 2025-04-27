const wordList = [
    { word: "example", chunks: ["ex", "am", "ple"], meaning: "示例", phonetic: "/ɪgˈzæmpəl/" },
    { word: "banana", chunks: ["ba", "na", "na"], meaning: "香蕉", phonetic: "/bəˈnænə/" },
    { word: "apple", chunks: ["ap", "ple"], meaning: "苹果", phonetic: "/ˈæpəl/" },
    { word: "sunshine", chunks: ["sun", "shine"], meaning: "阳光", phonetic: "/ˈsʌnʃaɪn/" }
];

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

// 初始化单词
function loadWord() {
    selectedChunks = [];
    document.getElementById("celebration").innerText = "";
    const currentWord = wordList[currentWordIndex];
    document.getElementById("phonetic").innerText = currentWord.phonetic;
    document.getElementById("meaning").innerText = currentWord.meaning;
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

    // 自动发音
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
        // 正确
        showCelebration();
        playSuccessSound();
        setTimeout(() => {
            currentWordIndex++;
            if (currentWordIndex >= wordList.length) {
                alert("🎉 恭喜完成全部单词！");
                currentWordIndex = 0;
            }
            loadWord();
        }, 2500);
    } else {
        // 错误
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

// 页面加载完成时初始化
window.onload = loadWord;