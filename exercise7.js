const quizData = [
    { question: "She ____ (to play) soccer every Saturday.", options: ["play", "plays", "playing"], answer: "plays" },
    { question: "I ____ (to eat) breakfast at 7 AM every day.", options: ["eat", "eats", "eating"], answer: "eat" },
    { question: "They ____ (to go) to the cinema last night.", options: ["go", "gone", "went"], answer: "went" },
    { question: "He ____ (to finish) his homework before dinner.", options: ["finish", "finishes", "finished"], answer: "finished" },
    { question: "We ____ (to study) English for three years now.", options: ["studied", "studying", "have studied"], answer: "have studied" },
    { question: "The cat ____ (to sleep) on the couch right now.", options: ["sleeps", "sleeping", "is sleeping"], answer: "is sleeping" },
    { question: "They ____ (to visit) Paris last summer.", options: ["visited", "visit", "visiting"], answer: "visited" },
    { question: "She usually ____ (to read) a book before bed.", options: ["read", "reading", "reads"], answer: "reads" },
    { question: "I ____ (to see) that movie already.", options: ["saw", "see", "seen"], answer: "saw" },
    { question: "By the time we arrived, they ____ (to leave).", options: ["had left", "leave", "left"], answer: "had left" }
];

let currentQuestionIndex = 0, score = 0;

const quizContainer = document.getElementById('quiz');
const scoreDisplay = document.getElementById('score');
const submitBtn = document.getElementById('submit');
const retakeBtn = document.getElementById('retake');


const loadQuiz = () => {
    const { question, options } = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="question">${question}</div>
        ${options.map(option => `
            <label>
                <input type="radio" name="answer" value="${option}" /> ${option}
            </label>
        `).join('')}
    `;
};


const getSelectedAnswer = () => document.querySelector('input[name="answer"]:checked')?.value;


const markAnswers = () => {
    const labels = document.querySelectorAll('label');
    const correctAnswer = quizData[currentQuestionIndex].answer;
    labels.forEach(label => {
        const input = label.querySelector('input');
        if (input.value === correctAnswer) {
            label.classList.add('correct'); 
        }
        if (input.checked && input.value !== correctAnswer) {
            label.classList.add('wrong'); 
        }
    });
};


const submitAnswers = () => {
    const answer = getSelectedAnswer();
    if (!answer) return alert("Please select an answer!");

 
    if (answer === quizData[currentQuestionIndex].answer) score++;

    markAnswers();

    submitBtn.disabled = true;

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuiz();
            submitBtn.disabled = false; 
        } else {
            showScore();
        }
    }, 2000);
};

const showScore = () => {
    quizContainer.classList.add('hidden');
    scoreDisplay.innerHTML = `Your score is ${score} out of ${quizData.length}`;
    scoreDisplay.classList.remove('hidden');
    submitBtn.classList.add('hidden');
    retakeBtn.classList.remove('hidden');
};

const retakeQuiz = () => {
    currentQuestionIndex = score = 0;
    loadQuiz();
    scoreDisplay.classList.add('hidden');
    submitBtn.classList.remove('hidden');
    retakeBtn.classList.add('hidden');
    quizContainer.classList.remove('hidden');
};

submitBtn.addEventListener('click', submitAnswers);
retakeBtn.addEventListener('click', retakeQuiz);

loadQuiz();
