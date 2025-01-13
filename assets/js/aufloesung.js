document.addEventListener("DOMContentLoaded", () => {
    const questions = JSON.parse(localStorage.getItem("questions"));
    const currentQuestionIndex = parseInt(localStorage.getItem("currentQuestionIndex")) || 0;
    const lastAnswerCorrect = localStorage.getItem("lastAnswerCorrect") === "true";
    const lastCorrectAnswer = localStorage.getItem("lastCorrectAnswer");
    const lastExplanation = localStorage.getItem("lastExplanation");

    // Ergebnis anzeigen
    const resultText = lastAnswerCorrect
        ? "Richtig! 🎉"
        : "Falsch 😞";

    document.getElementById("result").innerText = resultText;

    // Richtige Antwort und Erklärung anzeigen
    document.getElementById("correctAnswer").innerText = lastCorrectAnswer;
    document.getElementById("explanation").innerText = lastExplanation;

    // Button zur nächsten Frage
    document.getElementById("nextButton").onclick = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        localStorage.setItem("currentQuestionIndex", nextQuestionIndex.toString());

        // Nächste Frage oder Bewertungsseite
        if (nextQuestionIndex >= questions.length) {
            window.location.href = "bewertung.html";
        } else {
            window.location.href = "frage.html";
        }
    };
});
