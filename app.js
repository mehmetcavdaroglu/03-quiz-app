const questions = [
    {
        question: "Türkiye'nin başkenti neresidir?",
        answers: [
            {text: "İstanbul", correct:  false},
            {text: "Bursa", correct:  false},
            {text: "Ankara", correct:  true},
            {text: "Adıyaman", correct:  false}
        ]
    },
    {
        question: "Beşiktaş Spor Kulübü'nün renkleri hangisidir?",
        answers: [
            {text: "Sarı-Kırmızı", correct:  false},
            {text: "Siyah-Sarı", correct:  false},
            {text: "Bordo-Mavi", correct:  false},
            {text: "Siyah-Beyaz", correct:  true}
        ]
    },
    {
        question: "Türkiye Cumhuriyeti'nin ilk Cumhurbaşkanı kimdir?",
        answers: [
            {text: "Recep Tayyip Erdoğan", correct:  false},
            {text: "Mustafa Kemal Atatürk", correct:  true},
            {text: "Kemal Kılıçdaroğlu", correct:  false},
            {text: "İsmet İnönü", correct:  false}
        ]
    },
    {
        question: "Mustafa Kemal Atatürk'ün ölüm saati kaçtır?",
        answers: [
            {text: "09:05", correct:  true},
            {text: "10:05", correct:  false},
            {text: "21:05", correct:  false},
            {text: "05:05", correct:  false}
        ]
    },
    {
        question: "\"Gibi Gibi\", \"Arkadaşım Eşek\" ve \"Kol Düğmeleri\" gibi popüler şarkılarıyla bildiğimiz sanatçımız kimdir?",
        answers: [
            {text: "Lvbel C5", correct:  false},
            {text: "Tarkan", correct:  false},
            {text: "İzzet Altınmeşe", correct:  false},
            {text: "Barış Manço", correct:  true}
        ]
    },
]

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0
let score = 0

function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerButtons.appendChild(button)

        if(answer.correct){
            button.dataset.correct = answer.correct
        }

        button.addEventListener('click', selectAnswer)
    })
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score++
    }else{
        selectedBtn.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })

    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore()
    }
}

function showScore(){
    resetState()
    questionElement.innerHTML = `${questions.length} soruda puanınız: ${score * 20}`
    nextButton.innerHTML = "Tekrar Oyna"
    nextButton.style.display = "block"
}

nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }else{
        startQuiz()
    }
})
startQuiz()