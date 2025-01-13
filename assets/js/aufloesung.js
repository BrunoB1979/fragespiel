document.addEventListener("DOMContentLoaded", () => {
    const questions = JSON.parse(localStorage.getItem("questions"));
    const currentQuestionIndex = parseInt(localStorage.getItem("currentQuestionIndex"));
    const lastAnswerCorrect = localStorage.getItem("lastAnswerCorrect") === "true";
    const question = questions[currentQuestionIndex];

    const resultElement = document.getElementById("result");
    const correctAnswerElement = document.getElementById("correctAnswer");
    const explanationElement = document.getElementById("explanation");

    if (lastAnswerCorrect) {
        resultElement.innerText = "Richtig!";
        resultElement.classList.add("correct");
    } else {
        resultElement.innerText = "Falsch!";
        resultElement.classList.add("incorrect");
    }

    correctAnswerElement.innerText = question.options[question.answer];
    explanationElement.innerText = question.explanation;

    document.getElementById("nextButton").onclick = () => {
        localStorage.setItem("currentQuestionIndex", (currentQuestionIndex + 1).toString());
        window.location.href = "frage.html";
    };
});
