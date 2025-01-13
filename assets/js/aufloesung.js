document.addEventListener("DOMContentLoaded", () => {
    // Fragen und aktueller Index aus dem localStorage abrufen
    const questions = JSON.parse(localStorage.getItem("questions"));
    const currentQuestionIndex = parseInt(localStorage.getItem("currentQuestionIndex")) || 0;

    // Letzte Antwortinformationen abrufen
    const lastAnswerCorrect = localStorage.getItem("lastAnswerCorrect") === "true";
    const lastCorrectAnswer = localStorage.getItem("lastCorrectAnswer");
    const lastExplanation = localStorage.getItem("lastExplanation");

    // Ergebnis anzeigen
    const resultText = lastAnswerCorrect
        ? "Richtig! 🎉"
        : "Falsch 😞";

    const resultElement = document.getElementById("result");
    if (resultElement) {
        resultElement.innerText = resultText;
    } else {
        console.error("Element mit ID 'result' nicht gefunden.");
    }

    // Richtige Antwort und Erklärung anzeigen
    const correctAnswerElement = document.getElementById("correctAnswer");
    const explanationElement = document.getElementById("explanation");

    if (correctAnswerElement) {
        correctAnswerElement.innerText = lastCorrectAnswer || "Keine Antwort verfügbar.";
    } else {
        console.error("Element mit ID 'correctAnswer' nicht gefunden.");
    }

    if (explanationElement) {
        explanationElement.innerText = lastExplanation || "Keine Erklärung verfügbar.";
    } else {
        console.error("Element mit ID 'explanation' nicht gefunden.");
    }

    // Button zur nächsten Frage
    const nextButton = document.getElementById("nextButton");
    if (nextButton) {
        nextButton.addEventListener("click", () => {
            const nextQuestionIndex = currentQuestionIndex + 1;
            localStorage.setItem("currentQuestionIndex", nextQuestionIndex.toString());

            // Nächste Frage oder Bewertungsseite
            if (nextQuestionIndex >= questions.length) {
                window.location.href = "bewertung.html";
            } else {
                window.location.href = "frage.html";
            }
        });
    } else {
        console.error("Button mit ID 'nextButton' nicht gefunden.");
    }
});

