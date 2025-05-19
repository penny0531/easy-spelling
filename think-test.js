// Test questions data with CEFR alignment
const testQuestions = {
    multipleChoice: [
        {
            question: "1. I like ice cream, but it ____ my favourite food.",
            options: ["A. aren't", "B. isn't", "C. am not"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "2. Where ____ your friends from?",
            options: ["A. is", "B. are", "C. am"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "3. Choose the correct word: 'I ____ tennis every weekend.'",
            options: ["A. playing", "B. play", "C. plays"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "4. ____ there any milk in the fridge?",
            options: ["A. Is", "B. Are", "C. Have"],
            correctAnswer: 0,
            category: "grammar",
            points: 1
        },
        {
            question: "5. My sister ____ like spicy food.",
            options: ["A. don't", "B. doesn't", "C. isn't"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "6. What time ____ you usually get up?",
            options: ["A. are", "B. do", "C. does"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "7. They ____ watching TV at the moment.",
            options: ["A. are", "B. is", "C. be"],
            correctAnswer: 0,
            category: "grammar",
            points: 1
        },
        {
            question: "8. I ____ my homework yesterday.",
            options: ["A. do", "B. did", "C. done"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "9. She ____ to London three times.",
            options: ["A. went", "B. has been", "C. was"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "10. ____ you like to try this cake?",
            options: ["A. Do", "B. Would", "C. Are"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "11. She ____ her bike to school every day.",
            options: ["A. rides", "B. ride", "C. riding"],
            correctAnswer: 0,
            category: "grammar",
            points: 1
        },
        {
            question: "12. What's the meaning of 'delicious'?",
            options: ["A. very good to eat", "B. very bad to eat", "C. very hot to eat"],
            correctAnswer: 0,
            category: "vocabulary",
            points: 1
        },
        {
            question: "13. Which word means 'not expensive'?",
            options: ["A. costly", "B. cheap", "C. rich"],
            correctAnswer: 1,
            category: "vocabulary",
            points: 1
        },
        {
            question: "14. What's the opposite of 'happy'?",
            options: ["A. sad", "B. glad", "C. mad"],
            correctAnswer: 0,
            category: "vocabulary",
            points: 1
        },
        {
            question: "15. The weather is very ____ today.",
            options: ["A. sun", "B. sunny", "C. sunshine"],
            correctAnswer: 1,
            category: "vocabulary",
            points: 1
        },
        {
            question: "16. We ____ to the park tomorrow.",
            options: ["A. going", "B. goes", "C. are going"],
            correctAnswer: 2,
            category: "grammar",
            points: 1
        },
        {
            question: "17. ____ she like chocolate?",
            options: ["A. Do", "B. Does", "C. Is"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "18. I ____ a new bike last month.",
            options: ["A. buy", "B. bought", "C. buyed"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "19. They ____ in London since 2010.",
            options: ["A. live", "B. lived", "C. have lived"],
            correctAnswer: 2,
            category: "grammar",
            points: 1
        },
        {
            question: "20. What's another word for 'begin'?",
            options: ["A. end", "B. start", "C. finish"],
            correctAnswer: 1,
            category: "vocabulary",
            points: 1
        },
        {
            question: "21. He ____ tennis every Saturday.",
            options: ["A. play", "B. plays", "C. playing"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "22. The opposite of 'big' is ____.",
            options: ["A. large", "B. huge", "C. small"],
            correctAnswer: 2,
            category: "vocabulary",
            points: 1
        },
        {
            question: "23. ____ there any students in the classroom?",
            options: ["A. Is", "B. Are", "C. Do"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "24. She ____ her homework yet.",
            options: ["A. didn't finish", "B. hasn't finished", "C. not finished"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "25. What time ____ the movie start?",
            options: ["A. do", "B. does", "C. is"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "26. I ____ to bed early last night.",
            options: ["A. go", "B. went", "C. gone"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "27. They ____ watching a movie right now.",
            options: ["A. are", "B. is", "C. am"],
            correctAnswer: 0,
            category: "grammar",
            points: 1
        },
        {
            question: "28. What's the meaning of 'thirsty'?",
            options: ["A. need food", "B. need water", "C. need sleep"],
            correctAnswer: 1,
            category: "vocabulary",
            points: 1
        },
        {
            question: "29. She ____ speak French very well.",
            options: ["A. can", "B. cans", "C. could to"],
            correctAnswer: 0,
            category: "grammar",
            points: 1
        },
        {
            question: "30. The book is ____ the table.",
            options: ["A. on", "B. in", "C. at"],
            correctAnswer: 0,
            category: "grammar",
            points: 1
        }
    ],
    reading: [
        {
            passage: `Last summer, Tom and his family went to the beach. They had a wonderful time there. 
            The weather was sunny and warm. Tom built sandcastles with his sister Sarah. 
            Their parents sat under an umbrella and read books. In the afternoon, they all went swimming in the sea. 
            The water was cool and refreshing. Later, they had ice cream and watched the sunset. 
            It was a perfect day at the beach.`,
            questions: [
                {
                    question: "31. Where did Tom and his family go last summer?",
                    options: ["A. to the mountains", "B. to the beach", "C. to the park"],
                    correctAnswer: 1,
                    points: 1
                },
                {
                    question: "32. What was the weather like?",
                    options: ["A. rainy and cold", "B. sunny and warm", "C. windy and cloudy"],
                    correctAnswer: 1,
                    points: 1
                },
                {
                    question: "33. What did Tom do with his sister?",
                    options: ["A. played volleyball", "B. built sandcastles", "C. collected shells"],
                    correctAnswer: 1,
                    points: 1
                },
                {
                    question: "34. What did Tom's parents do?",
                    options: ["A. went surfing", "B. took photos", "C. read books"],
                    correctAnswer: 2,
                    points: 1
                },
                {
                    question: "35. What did they do in the afternoon?",
                    options: ["A. went swimming", "B. played games", "C. had lunch"],
                    correctAnswer: 0,
                    points: 1
                }
            ]
        }
    ],
    writing: [
        {
            question: "36. What country would you like to travel to? Why? (Write 2–3 sentences.)",
            type: "textarea",
            maxPoints: 5
        },
        {
            question: "37. Describe one of your favourite sports. What's your favorite sport and why do you like it? (Write 3–5 sentences.)",
            type: "textarea",
            maxPoints: 8
        }
    ],
    multipleChoiceExtra: [
        {
            question: "38. Choose the correct word: 'She ____ her homework every day.'",
            options: ["A. do", "B. does", "C. doing"],
            correctAnswer: 1,
            category: "grammar",
            points: 1
        },
        {
            question: "39. What's the opposite of 'big'?",
            options: ["A. large", "B. huge", "C. small"],
            correctAnswer: 2,
            category: "vocabulary",
            points: 1
        },
        {
            question: "40. Choose the correct sentence:",
            options: ["A. I am go to school", "B. I going to school", "C. I go to school"],
            correctAnswer: 2,
            category: "grammar",
            points: 1
        }
    ],
    finalWriting: [
        {
            question: "41. Write a short conversation between a customer and a shop assistant about buying a T-shirt. Include greetings, asking about size/price, trying on, and paying. Write 6–8 lines.",
            type: "textarea",
            maxPoints: 10
        }
    ],
    scoringCriteria: {
        writing: {
            A1: {
                taskCompletion: {
                    points: 2,
                    criteria: ["基本完成任务", "包含主要信息", "达到最低句子要求"]
                },
                grammar: {
                    points: 2,
                    criteria: ["使用基本时态", "主谓基本一致", "允许有小错误"]
                },
                vocabulary: {
                    points: 2,
                    criteria: ["使用基础词汇", "词汇重复可接受", "表达基本意思"]
                },
                coherence: {
                    points: 1,
                    criteria: ["句子有基本连接", "使用and等基本连接词"]
                }
            },
            A2: {
                taskCompletion: {
                    points: 3,
                    criteria: ["完整完成任务", "信息详细准确", "超出最低句子要求"]
                },
                grammar: {
                    points: 3,
                    criteria: ["正确使用多种时态", "较少语法错误", "能使用复合句"]
                },
                vocabulary: {
                    points: 3,
                    criteria: ["词汇量较大", "用词准确", "较少重复"]
                },
                coherence: {
                    points: 2,
                    criteria: ["句子连贯流畅", "使用多种连接词", "段落结构完整"]
                }
            }
        }
    }
};

let currentSection = 'multipleChoice';
let currentQuestion = 0;
let answers = {
    multipleChoice: [],
    reading: [],
    writing: [],
    multipleChoiceExtra: [],
    finalWriting: []
};

let scores = {
    multipleChoice: {
        total: 0,
        correct: 0,
        byLevel: { A1: 0, A2: 0 }
    },
    reading: {
        total: 0,
        byLevel: { A1: 0, A2: 0 }
    },
    writing: {
        total: 0,
        byLevel: { A1: 0, A2: 0 }
    },
    multipleChoiceExtra: {
        total: 0,
        correct: 0,
        byLevel: { A1: 0, A2: 0 }
    },
    finalWriting: {
        total: 0,
        byLevel: { A1: 0, A2: 0 }
    }
};

// Initialize test
function initTest() {
    showQuestion();
    updateProgress();
}

// Show current question
function showQuestion() {
    const questionContainer = document.getElementById('question-container');
    
    if (currentSection === 'multipleChoice') {
        const question = testQuestions.multipleChoice[currentQuestion];
        questionContainer.innerHTML = `
            <div class="question">
                <div class="question-header">
                    <h3>${question.question}</h3>
                </div>
                <div class="options">
                    ${question.options.map((option) => `
                        <div class="option">
                            <label>${option}</label>
                            <input type="radio" name="answer" value="${option.charAt(0).charCodeAt(0) - 65}">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (currentSection === 'reading') {
        const readingSection = testQuestions.reading[0];
        const question = readingSection.questions[currentQuestion];
        questionContainer.innerHTML = `
            <div class="question">
                <div class="reading-passage">
                    <h3>Reading Passage</h3>
                    <p>${readingSection.passage}</p>
                </div>
                <div class="question-header">
                    <h3>${question.question}</h3>
                </div>
                <div class="options">
                    ${question.options.map((option) => `
                        <div class="option">
                            <label>${option}</label>
                            <input type="radio" name="answer" value="${option.charAt(0).charCodeAt(0) - 65}">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (currentSection === 'multipleChoiceExtra') {
        const question = testQuestions.multipleChoiceExtra[currentQuestion];
        questionContainer.innerHTML = `
            <div class="question">
                <div class="question-header">
                    <h3>${question.question}</h3>
                </div>
                <div class="options">
                    ${question.options.map((option) => `
                        <div class="option">
                            <label>${option}</label>
                            <input type="radio" name="answer" value="${option.charAt(0).charCodeAt(0) - 65}">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else if (currentSection === 'writing' || currentSection === 'finalWriting') {
        const questions = currentSection === 'writing' ? testQuestions.writing : testQuestions.finalWriting;
        const question = questions[currentQuestion];
        questionContainer.innerHTML = `
            <div class="question">
                <div class="question-header">
                    <h3>${question.question}</h3>
                </div>
                <textarea class="writing-answer" rows="6" placeholder="Write your answer here..."></textarea>
            </div>
        `;
    }
}

// Update progress bar
function updateProgress() {
    const progress = document.getElementById('progress');
    let total, current;
    
    if (currentSection === 'multipleChoice') {
        total = testQuestions.multipleChoice.length;
        current = currentQuestion + 1;
    } else if (currentSection === 'reading') {
        total = testQuestions.reading[0].questions.length;
        current = currentQuestion + 1;
    } else if (currentSection === 'writing') {
        total = testQuestions.writing.length;
        current = currentQuestion + 1;
    } else if (currentSection === 'multipleChoiceExtra') {
        total = testQuestions.multipleChoiceExtra.length;
        current = currentQuestion + 1;
    } else if (currentSection === 'finalWriting') {
        total = testQuestions.finalWriting.length;
        current = currentQuestion + 1;
    }
    
    const percentage = (current / total) * 100;
    progress.style.width = `${percentage}%`;
    document.getElementById('progress-text').textContent = 
        `Question ${current} of ${total} (${getSectionName(currentSection)})`;
}

function getSectionName(section) {
    switch(section) {
        case 'multipleChoice':
            return 'Multiple Choice';
        case 'reading':
            return 'Reading Comprehension';
        case 'writing':
            return 'Writing';
        case 'multipleChoiceExtra':
            return 'Multiple Choice';
        case 'finalWriting':
            return 'Final Writing';
        default:
            return section;
    }
}

// Check answer and proceed to next question
function submitAnswer() {
    if (currentSection === 'writing' || currentSection === 'finalWriting') {
        const writingAnswer = document.querySelector('.writing-answer').value;
        if (!writingAnswer.trim()) {
            alert('Please write your answer');
            return;
        }

        // 获取当前题号
        const questionNumber = currentSection === 'writing' ? 
            36 + currentQuestion : 41;

        // 自动评分
        const evaluation = autoGradeWriting(writingAnswer, questionNumber);
        
        // 保存评分结果
        answers[currentSection].push({
            questionIndex: currentQuestion,
            answer: writingAnswer,
            score: evaluation.score,
            maxScore: evaluation.maxScore,
            level: evaluation.level,
            feedback: evaluation.feedback
        });

        // 更新总分
        scores[currentSection].total += evaluation.score;
        scores[currentSection].byLevel[evaluation.level]++;

    } else if (currentSection === 'multipleChoice' || currentSection === 'reading' || currentSection === 'multipleChoiceExtra') {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            alert('Please select an answer');
            return;
        }
        
        const answer = parseInt(selectedAnswer.value);
        let question;
        
        if (currentSection === 'reading') {
            question = testQuestions.reading[0].questions[currentQuestion];
        } else if (currentSection === 'multipleChoiceExtra') {
            question = testQuestions.multipleChoiceExtra[currentQuestion];
        } else {
            question = testQuestions.multipleChoice[currentQuestion];
        }
        
        if (answer === question.correctAnswer) {
            scores[currentSection].correct++;
        }
        scores[currentSection].total += question.points;
        
        answers[currentSection].push({
            questionIndex: currentQuestion,
            selectedAnswer: answer,
            correct: answer === question.correctAnswer
        });
    }

    // 处理章节转换
    if (currentSection === 'multipleChoice' && currentQuestion < testQuestions.multipleChoice.length - 1) {
        currentQuestion++;
    } else if (currentSection === 'multipleChoice') {
        currentSection = 'reading';
        currentQuestion = 0;
    } else if (currentSection === 'reading' && currentQuestion < testQuestions.reading[0].questions.length - 1) {
        currentQuestion++;
    } else if (currentSection === 'reading') {
        currentSection = 'writing';
        currentQuestion = 0;
    } else if (currentSection === 'writing' && currentQuestion < testQuestions.writing.length - 1) {
        currentQuestion++;
    } else if (currentSection === 'writing') {
        currentSection = 'multipleChoiceExtra';
        currentQuestion = 0;
    } else if (currentSection === 'multipleChoiceExtra' && currentQuestion < testQuestions.multipleChoiceExtra.length - 1) {
        currentQuestion++;
    } else if (currentSection === 'multipleChoiceExtra') {
        currentSection = 'finalWriting';
        currentQuestion = 0;
    } else if (currentSection === 'finalWriting' && currentQuestion < testQuestions.finalWriting.length - 1) {
        currentQuestion++;
    } else {
        showResults();
        return;
    }
    
    showQuestion();
    updateProgress();
}

// Show test results
function showResults() {
    const container = document.getElementById('test-container');
    const multipleChoiceScore = Math.round((scores.multipleChoice.correct / testQuestions.multipleChoice.length) * 100);
    
    let writingResults = '';
    if (answers.writing.length > 0 || answers.finalWriting.length > 0) {
        writingResults = `
            <div class="writing-results">
                <h3>写作评估结果</h3>
                ${answers.writing.map((answer, index) => `
                    <div class="writing-result">
                        <h4>写作题 ${36 + index}</h4>
                        <p>得分: ${answer.score}/${answer.maxScore}</p>
                        <p>CEFR等级: ${answer.level}</p>
                        <div class="feedback">
                            <h5>详细反馈:</h5>
                            <pre>${answer.feedback}</pre>
                        </div>
                    </div>
                `).join('')}
                ${answers.finalWriting.map((answer, index) => `
                    <div class="writing-result">
                        <h4>最终写作题 ${41 + index}</h4>
                        <p>得分: ${answer.score}/${answer.maxScore}</p>
                        <p>CEFR等级: ${answer.level}</p>
                        <div class="feedback">
                            <h5>详细反馈:</h5>
                            <pre>${answer.feedback}</pre>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    container.innerHTML = `
        <div class="results">
            <h2>测试完成</h2>
            
            <div class="score-summary">
                <h3>选择题部分</h3>
                <p>得分: ${multipleChoiceScore}% (${scores.multipleChoice.correct} 正确 / ${testQuestions.multipleChoice.length} 总题数)</p>
            </div>

            ${writingResults}

            <div class="next-steps">
                <p>根据您的表现，您目前的水平为:</p>
                <h3 class="suggested-level">${getOverallLevel()}</h3>
                <p>此评估基于选择题和写作题的综合表现。</p>
            </div>

            <div class="action-buttons">
                <button onclick="showParentReport()" class="report-btn">查看家长报告</button>
                <button onclick="window.location.href='index.html'" class="home-btn">返回首页</button>
            </div>
        </div>
    `;

    // Save answers and scores
    const testData = {
        timestamp: new Date().toISOString(),
        answers: answers,
        scores: scores
    };
    localStorage.setItem('testResults', JSON.stringify(testData));
}

function getOverallLevel() {
    // 计算选择题得分率
    const mcScore = scores.multipleChoice.correct / testQuestions.multipleChoice.length;
    
    // 计算写作平均水平
    let writingA2Count = 0;
    let totalWriting = 0;
    
    answers.writing.forEach(answer => {
        if (answer.level === 'A2') writingA2Count++;
        totalWriting++;
    });
    
    answers.finalWriting.forEach(answer => {
        if (answer.level === 'A2') writingA2Count++;
        totalWriting++;
    });
    
    const writingA2Ratio = totalWriting > 0 ? writingA2Count / totalWriting : 0;
    
    // 综合判断
    if (mcScore >= 0.8 && writingA2Ratio >= 0.7) {
        return 'A2 (高级)';
    } else if (mcScore >= 0.6 && writingA2Ratio >= 0.3) {
        return 'A2 (基础)';
    } else {
        return 'A1';
    }
}

// Initialize test on page load
window.onload = function() {
    // 检查URL参数是否包含demo=true
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('demo') === 'true') {
        // 生成示例数据并直接显示报告
        const sampleData = generateSampleTestData();
        localStorage.setItem('testResults', JSON.stringify(sampleData));
        showParentReport();
    } else {
        // 正常初始化测试
        initTest();
    }
};

function autoGradeWriting(answer, questionType) {
    const text = answer.trim();
    let score = 0;
    let feedback = [];
    
    // 基本NLP分析工具
    const nlp = {
        wordCount: (text) => text.split(/\s+/).length,
        sentenceCount: (text) => text.split(/[.!?]+/).filter(Boolean).length,
        hasBasicConnectors: (text) => /\b(and|but|because)\b/i.test(text),
        hasAdvancedConnectors: (text) => /\b(however|therefore|moreover)\b/i.test(text),
        uniqueWords: (text) => new Set(text.toLowerCase().split(/\s+/)).size,
        hasComplexSentences: (text) => /\b(because|although|however)\b.*,/i.test(text)
    };

    // 任务完成度评分
    let taskScore = 0;
    if (questionType === 36) { // 国家旅行题
        const sentences = nlp.sentenceCount(text);
        if (sentences >= 2) {
            taskScore += 1;
            if (/\b(because|reason|want|like)\b/i.test(text)) taskScore += 1;
        }
        feedback.push(`完成了${sentences}个句子，最低要求2句`);
    } else if (questionType === 37) { // 运动题
        const sentences = nlp.sentenceCount(text);
        if (sentences >= 3) {
            taskScore += 2;
            if (/\b(because|reason|enjoy|like)\b/i.test(text)) taskScore += 1;
        }
        feedback.push(`完成了${sentences}个句子，最低要求3句`);
    } else if (questionType === 41) { // 对话题
        const dialogueElements = {
            greeting: /\b(hello|hi|good|morning|afternoon)\b/i,
            size: /\b(size|small|medium|large)\b/i,
            price: /\b(how much|cost|price|\$)\b/i,
            tryOn: /\b(try|fitting|room)\b/i,
            payment: /\b(pay|card|cash)\b/i
        };
        
        let elementCount = 0;
        for (let [element, regex] of Object.entries(dialogueElements)) {
            if (regex.test(text)) {
                elementCount++;
                feedback.push(`包含${element}元素`);
            }
        }
        taskScore = Math.min(3, elementCount);
    }
    score += taskScore;

    // 语法评分
    let grammarScore = 0;
    const basicGrammar = /\b(is|are|am|was|were)\b.*\b(the|a|an)\b/i.test(text);
    const advancedGrammar = /\b(have|has|had)\b.*\b(been|gone|done)\b/i.test(text);
    
    if (basicGrammar) grammarScore += 1;
    if (advancedGrammar) grammarScore += 1;
    if (nlp.hasComplexSentences(text)) grammarScore += 1;
    
    score += grammarScore;
    feedback.push(`语法得分：${grammarScore}分`);

    // 词汇评分
    let vocabScore = 0;
    const wordCount = nlp.wordCount(text);
    const uniqueWords = nlp.uniqueWords(text);
    const varietyRatio = uniqueWords / wordCount;
    
    if (varietyRatio > 0.7) vocabScore = 3;
    else if (varietyRatio > 0.5) vocabScore = 2;
    else vocabScore = 1;
    
    score += vocabScore;
    feedback.push(`词汇多样性：${Math.round(varietyRatio * 100)}%`);

    // 连贯性评分
    let coherenceScore = 0;
    if (nlp.hasBasicConnectors(text)) coherenceScore += 1;
    if (nlp.hasAdvancedConnectors(text)) coherenceScore += 1;
    
    score += coherenceScore;
    feedback.push(`连贯性得分：${coherenceScore}分`);

    // 确定CEFR等级
    const level = score >= 8 ? 'A2' : 'A1';

    return {
        score: score,
        maxScore: questionType === 41 ? 10 : (questionType === 37 ? 8 : 5),
        level: level,
        feedback: feedback.join('\n')
    };
}

function generateParentReport() {
    const testData = JSON.parse(localStorage.getItem('testResults'));
    if (!testData) return null;
    
    const scores = testData.scores;
    const answers = testData.answers;
    
    // 计算总分和各部分得分
    const totalMCQuestions = testQuestions.multipleChoice.length + testQuestions.multipleChoiceExtra.length;
    const mcCorrect = scores.multipleChoice.correct + scores.multipleChoiceExtra.correct;
    const mcPercentage = Math.round((mcCorrect / totalMCQuestions) * 100);
    
    // 计算写作得分
    const writingScores = [...answers.writing, ...answers.finalWriting].map(a => ({
        score: a.score,
        maxScore: a.maxScore,
        percentage: Math.round((a.score / a.maxScore) * 100)
    }));
    
    const avgWritingPercentage = writingScores.length > 0 
        ? Math.round(writingScores.reduce((acc, curr) => acc + curr.percentage, 0) / writingScores.length)
        : 0;
    
    // 计算总体水平
    const overallLevel = getOverallLevel();
    
    // 生成建议
    const suggestions = generateSuggestions(mcPercentage, avgWritingPercentage, overallLevel);
    
    return {
        testDate: new Date(testData.timestamp).toLocaleDateString('zh-CN'),
        multipleChoice: {
            correct: mcCorrect,
            total: totalMCQuestions,
            percentage: mcPercentage
        },
        writing: {
            scores: writingScores,
            averagePercentage: avgWritingPercentage
        },
        overallLevel: overallLevel,
        suggestions: suggestions
    };
}

function generateSuggestions(mcScore, writingScore, level) {
    const suggestions = {
        strengths: [],
        improvements: [],
        nextSteps: []
    };
    
    // 分析优势
    if (mcScore >= 80) {
        suggestions.strengths.push("语法和词汇基础扎实，能准确运用A1-A2级别的语言知识");
    }
    if (writingScore >= 80) {
        suggestions.strengths.push("书面表达能力出色，能完整表达个人观点和描述日常场景");
    }
    
    // 分析需要改进的地方
    if (mcScore < 60) {
        suggestions.improvements.push("需要加强基础语法和词汇的学习，建议每天复习15-20分钟");
    }
    if (writingScore < 60) {
        suggestions.improvements.push("写作表达还需提高，建议多进行短文写作练习，注意句子的连贯性");
    }
    
    // 根据级别给出下一步建议
    if (level.includes('A2')) {
        suggestions.nextSteps = [
            "可以开始学习Think 1教材",
            "尝试参加KET考试备考",
            "每周安排2-3次口语练习，提高口语表达流畅度"
        ];
    } else if (level.includes('A1')) {
        suggestions.nextSteps = [
            "继续完成Think Starter课程",
            "每天听读配套音频材料10-15分钟",
            "积累更多日常用语，培养英语思维"
        ];
    } else {
        suggestions.nextSteps = [
            "从Think Starter Unit 1开始学习",
            "使用自然拼读教材，巩固语音基础",
            "建立基础词汇库（500-800个核心词汇）"
        ];
    }
    
    return suggestions;
}

function showParentReport() {
    const report = generateParentReport();
    if (!report) {
        alert('未找到测试数据');
        return;
    }
    
    const container = document.getElementById('test-container');
    container.innerHTML = `
        <div class="parent-report">
            <h2>Think英语水平测试 - 专业评估报告</h2>
            <p class="test-date">测试日期：${report.testDate}</p>
            
            <div class="score-overview">
                <h3>测试总览</h3>
                <div class="score-card">
                    <div class="score-item">
                        <h4>选择题成绩</h4>
                        <p class="score">${report.multipleChoice.percentage}%</p>
                        <p class="detail">正确率：${report.multipleChoice.correct}/${report.multipleChoice.total}</p>
                    </div>
                    <div class="score-item">
                        <h4>写作成绩</h4>
                        <p class="score">${report.writing.averagePercentage}%</p>
                        <p class="detail">平均得分率</p>
                    </div>
                </div>
            </div>
            
            <div class="level-assessment">
                <h3>当前水平评估</h3>
                <p class="level-badge">${report.overallLevel}</p>
                <p class="level-note">*注：此评估仅基于笔试部分，建议进行口语测试获得完整评估</p>
            </div>
            
            <div class="analysis-section">
                <h3>初步分析</h3>
                
                <div class="strengths">
                    <h4>💪 学习优势</h4>
                    <ul>
                        ${report.suggestions.strengths.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="improvements">
                    <h4>📈 需要提高</h4>
                    <ul>
                        ${report.suggestions.improvements.map(i => `<li>${i}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="next-steps">
                    <h4>🎯 学习建议</h4>
                    <ul>
                        ${report.suggestions.nextSteps.map(s => `<li>${s}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="contact-section">
                <h3>获取完整评估和个性化学习规划</h3>
                <div class="contact-info">
                    <p>本测评报告为初步评估结果。为了让孩子获得更全面的语言能力评估和个性化的学习规划建议，我们建议：</p>
                    <ul>
                        <li>👉 预约免费口语测试</li>
                        <li>👉 获取详细的能力诊断报告</li>
                        <li>👉 制定个性化学习方案</li>
                        <li>👉 了解更多关于Cambridge Think课程的信息</li>
                    </ul>
                    <div class="qr-section">
                        <div class="qr-code">
                            <!-- 这里可以放二维码图片 -->
                            <img src="teacher-qr.jpg" alt="扫码联系老师" class="qr-image">
                        </div>
                        <p class="contact-note">扫码添加老师微信<br>或直接联系：<strong>WeChat: fgpenny2022</strong></p>
                    </div>
                </div>
            </div>
            
            <div class="parent-tips">
                <h3>给家长的建议</h3>
                <ul>
                    <li>建议每天陪伴孩子进行15-20分钟的英语学习，培养学习习惯</li>
                    <li>多鼓励孩子用英语交流，创造语言环境</li>
                    <li>定期检查学习进度，及时发现和解决问题</li>
                    <li>可以使用Think教材配套的家长资源，辅助孩子学习</li>
                </ul>
            </div>
            
            <button onclick="window.location.href='index.html'" class="home-btn">返回首页</button>
        </div>
    `;
}

function generateSampleTestData() {
    // 生成选择题答案
    const sampleAnswers = {
        multipleChoice: Array(30).fill(null).map((_, i) => ({
            questionIndex: i,
            selectedAnswer: Math.floor(Math.random() * 3),
            correct: Math.random() > 0.3  // 70% 正确率
        })),
        reading: Array(5).fill(null).map((_, i) => ({
            questionIndex: i,
            selectedAnswer: Math.floor(Math.random() * 3),
            correct: Math.random() > 0.3
        })),
        writing: [
            {
                questionIndex: 0,
                answer: "I would like to travel to Japan because I love Japanese culture and food. The country has beautiful temples and modern cities.",
                score: 4,
                maxScore: 5,
                level: "A2",
                feedback: "完成了2个句子，最低要求2句\n语法得分：1分\n词汇多样性：85%\n连贯性得分：1分"
            },
            {
                questionIndex: 1,
                answer: "My favorite sport is swimming. I go swimming three times a week at the local pool. Swimming helps me stay healthy and relaxed.",
                score: 6,
                maxScore: 8,
                level: "A2",
                feedback: "完成了3个句子，最低要求3句\n语法得分：2分\n词汇多样性：75%\n连贯性得分：1分"
            }
        ],
        multipleChoiceExtra: Array(3).fill(null).map((_, i) => ({
            questionIndex: i,
            selectedAnswer: Math.floor(Math.random() * 3),
            correct: Math.random() > 0.3
        })),
        finalWriting: [
            {
                questionIndex: 0,
                answer: "Customer: Good morning!\nAssistant: Good morning! How can I help you?\nCustomer: I'm looking for a T-shirt.\nAssistant: What size would you like?\nCustomer: Medium, please. How much is it?\nAssistant: It's $25. Would you like to try it on?\nCustomer: Yes, please.\nAssistant: The fitting room is over there.",
                score: 8,
                maxScore: 10,
                level: "A2",
                feedback: "包含greeting元素\n包含size元素\n包含price元素\n包含tryOn元素\n语法得分：2分\n词汇多样性：80%\n连贯性得分：2分"
            }
        ]
    };

    // 生成分数
    const sampleScores = {
        multipleChoice: {
            total: 30,
            correct: sampleAnswers.multipleChoice.filter(a => a.correct).length,
            byLevel: { A1: 12, A2: 8 }
        },
        reading: {
            total: 5,
            byLevel: { A1: 3, A2: 2 }
        },
        writing: {
            total: 10,
            byLevel: { A1: 1, A2: 1 }
        },
        multipleChoiceExtra: {
            total: 3,
            correct: sampleAnswers.multipleChoiceExtra.filter(a => a.correct).length,
            byLevel: { A1: 1, A2: 1 }
        },
        finalWriting: {
            total: 8,
            byLevel: { A1: 0, A2: 1 }
        }
    };

    // 修改建议生成逻辑
    const suggestions = {
        strengths: [
            "语法基础扎实，特别是在一般现在时和一般过去时的使用上",
            "词汇量达到基础要求，能准确使用日常生活相关词汇",
            "能用简单句子表达个人观点和描述日常场景"
        ],
        improvements: [
            "句子结构较为单一，建议多练习复合句",
            "写作中缺少连接词，影响文章连贯性",
            "阅读速度需要提升，建议增加阅读量"
        ],
        nextSteps: [
            "建议开始学习Think Starter Unit 1-3",
            "每天坚持15分钟英语听力练习",
            "积累更多日常用语，培养英语思维"
        ]
    };

    return {
        timestamp: new Date().toISOString(),
        answers: sampleAnswers,
        scores: sampleScores,
        suggestions: suggestions
    };
} 