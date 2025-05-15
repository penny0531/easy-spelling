// 测试题数据
const testQuestions = [
    {
        question: "1. What's the meaning of 'sustainable' in the context of environmental protection?",
        options: [
            "A. Temporary and short-term",
            "B. Harmful to the environment",
            "C. Able to be maintained at a certain level without depleting resources",
            "D. Expensive and luxurious"
        ],
        correct: 2, // C is correct (index 2)
        explanation: "Sustainable means able to be maintained at a certain level without depleting natural resources or causing ecological damage."
    },
    {
        question: "2. Which sentence demonstrates the correct use of the past perfect tense?",
        options: [
            "A. I am going to the store",
            "B. I had finished my homework before dinner",
            "C. I will do it tomorrow",
            "D. I did it yesterday"
        ],
        correct: 1, // B is correct (index 1)
        explanation: "The past perfect tense (had + past participle) is used to describe an action that was completed before another past action."
    },
    {
        question: "3. What's the function of 'however' in academic writing?",
        options: [
            "A. To add information",
            "B. To show contrast",
            "C. To give an example",
            "D. To conclude"
        ],
        correct: 1, // B is correct (index 1)
        explanation: "'However' is used to introduce a statement that contrasts with or seems to contradict something that has been said previously."
    }
    // 可以继续添加更多题目
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// 初始化测试
function initTest() {
    showQuestion();
    updateProgress();
}

// 显示当前问题
function showQuestion() {
    const question = testQuestions[currentQuestion];
    const questionContainer = document.getElementById('question-container');
    
    questionContainer.innerHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="option">
                        <input type="radio" name="answer" value="${index}" id="option${index}">
                        <label for="option${index}">${option}</label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// 更新进度条
function updateProgress() {
    const progress = document.getElementById('progress');
    const percentage = ((currentQuestion + 1) / testQuestions.length) * 100;
    progress.style.width = `${percentage}%`;
    document.getElementById('progress-text').textContent = 
        `Question ${currentQuestion + 1} of ${testQuestions.length}`;
}

// 检查答案并进入下一题
function submitAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        alert('Please select an answer');
        return;
    }

    const answer = parseInt(selectedAnswer.value);
    userAnswers.push(answer);

    if (answer === testQuestions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < testQuestions.length) {
        showQuestion();
        updateProgress();
    } else {
        showResults();
    }
}

// 显示测试结果
function showResults() {
    const container = document.getElementById('test-container');
    const percentage = Math.round((score / testQuestions.length) * 100);
    let level = '';
    
    if (percentage >= 90) level = 'Think 3';
    else if (percentage >= 75) level = 'Think 2';
    else if (percentage >= 60) level = 'Think 1';
    else level = 'Think Starter';

    let report = `
        <div class="results">
            <h2>Test Results</h2>
            <div class="score-container">
                <div class="score">${percentage}%</div>
                <p>Your score: ${score} out of ${testQuestions.length}</p>
                <h3>Recommended Level: ${level}</h3>
            </div>
            <div class="detailed-report">
                <h3>Detailed Analysis</h3>
                ${testQuestions.map((q, i) => `
                    <div class="question-review ${userAnswers[i] === q.correct ? 'correct' : 'incorrect'}">
                        <p><strong>${q.question}</strong></p>
                        <p>Your answer: ${q.options[userAnswers[i]]}</p>
                        <p>Correct answer: ${q.options[q.correct]}</p>
                        <p class="explanation">${q.explanation}</p>
                    </div>
                `).join('')}
            </div>
            <button onclick="window.location.href='index.html'" class="home-btn">Return to Home</button>
        </div>
    `;

    container.innerHTML = report;
}

// 重新开始测试
function restartTest() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    initTest();
}

// 页面加载时初始化测试
window.onload = initTest; 