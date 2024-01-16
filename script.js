
const questions = [
    {
      question: 'What is the capital of Nigeria??',
      options: ['A. Katsina', 'B. Kano', 'C. Abuja', 'D. Lagos'],
      correctAnswer: 'C. Abuja'
    },
    {
        question: 'What is name of governor of katsina state??',
        options: ['A. Aminu Bello Masari', 'B. Dikko Umar Radda', 'C. Ibrahim Shehu Shema', 'D. Umaru Musa Yaradua'],
        correctAnswer: 'B. Dikko Umar Radda'
    },
    {
        question: 'Where Prophet Muhammad SAW was born ??',
        options: ['A. Makkah', 'B. China', 'C. Saudi Arabia', 'D. Madina'],
        correctAnswer: 'A. Makkah'
    }
];

let currentQuestion = 0;
let score = 0;
let username;
let city;


function startQuiz(event) {
    event.preventDefault();
    username = document.getElementById('username').value;
    city = document.getElementById('city').value;

    
    const loadingElement = document.getElementById('loading');

    home.style.display = 'none';
    loadingElement.style.display = 'flex';

    const before = document.getElementById('before');
    before.pause();

    const after = document.getElementById('after');
    after.play();
    

    
    setTimeout(() => {
        loadingElement.style.display = 'none';
        document.getElementById('home').style.display = 'none';
        document.getElementById('quiz').style.display = 'block';

        showQuestion();
    },  4000);

}

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('click', startAudioOnUserInteraction);

    function startAudioOnUserInteraction() {
        document.getElementById('before');
        before.play();

        document.removeEventListener('click', startAudioOnUserInteraction);

    }
});

function showQuestion() {
    const quizContainer = document.getElementById('quiz');
    const currentQuestionObj = questions[currentQuestion];

    quizContainer.innerHTML = `
       <h3>${currentQuestionObj.question}</h3>
       ${currentQuestionObj.options.map(option => `<button onclick="checkAnswer('${option}')">${option}</button>`).join('')}
    `;
}

function checkAnswer(selectedAnswer) {
    const currentQuestionObj = questions[currentQuestion];
    const options = document.querySelectorAll('#quiz button');

    options.forEach(option => {
        option.disabled = true;

        if (option.textContent === currentQuestionObj.correctAnswer){
            option.style.backgroundColor = '#3efe25';
        } else if (option.textContent === selectedAnswer) {
            option.style.backgroundColor = '#ff2424';
        }
    });

    
setTimeout(() => {

    

    if (selectedAnswer === currentQuestionObj.correctAnswer) {
        score++;
    }
    currentQuestion++;

    if (currentQuestion < questions.length) {
        resetOptionStyle(options);
        showQuestion();

    } else {
        resetOptionStyle(options);
        showResult();
        
        document.getElementById('after').pause();
        document.getElementById('correct').play();

    }
   }, 5000);
}  

function resetOptionStyle(options) {
    options.forEach(option => {
        option.style.backgroundColor = '';
        option.disabled = false;
    });
}

function showResult() {

    const resultContainer = document.getElementById('result');
    const percentageScore = (score / questions.length) * 100;

    resultContainer.innerHTML = `
        <h2>Congratulations, ${username}!</h2>
        <p>Your quiz is complete.</p>
        <p>Masha Allah!!! ${username} , From ${city} City. <br> You tried, And you Scored, <br> ${percentageScore.toFixed(2)}% Out Of 100%.</p>
        <div class="congrat-design" id="confetti-container">
            
        </div>
        <button onclick="location.reload()">Restart Quiz</button>
    `;

    document.getElementById('quiz').style.display = 'none';
    resultContainer.style.display = 'block';

    animateConfetti();
}

function animateConfetti(){
    const confettiContainer = document.getElementById('confetti-container');

    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement("div");
        confetti.className = 'confetti star';
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.animationDuration = `${Math.random() * 3 + 1}s`;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random()}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confettiContainer.appendChild(confetti);
    }
}

function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
