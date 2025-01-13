document.addEventListener("DOMContentLoaded", () => {
    const questions = JSON.parse(localStorage.getItem("questions"));
    const currentQuestionIndex = parseInt(localStorage.getItem("currentQuestionIndex"));
    const totalQuestions = questions.length;

    // Überprüfung: Sind alle Fragen beantwortet?
    if (currentQuestionIndex >= totalQuestions) {
        // Zur Bewertungsseite wechseln
        window.location.href = "bewertung.html";
        return;
    }

    // Lade die aktuelle Frage
    const question = questions[currentQuestionIndex];

    // Update der Fortschrittsanzeige
    document.getElementById("currentQuestion").innerText = currentQuestionIndex + 1;
    document.getElementById("totalQuestions").innerText = totalQuestions;

    // Zeige die Frage
    document.getElementById("question").innerText = question.question;

    // Antworten zufällig sortieren und anzeigen
    const options = question.options
        .map((option, index) => ({ text: option, index }))
        .sort(() => 0.5 - Math.random());

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Leeren des Containers, bevor neue Buttons hinzugefügt werden

    options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.onclick = () => {
            // Antwort überprüfen
            const isCorrect = option.index === question.answer;
            localStorage.setItem("lastAnswerCorrect", isCorrect);

            // Punkte aktualisieren
            const currentScore = parseInt(localStorage.getItem("score"));
            const newScore = isCorrect ? currentScore + question.points : currentScore;
            localStorage.setItem("score", newScore.toString());

            // Index für die nächste Frage erhöhen
            localStorage.setItem("currentQuestionIndex", (currentQuestionIndex + 1).toString());

            // Nächste Frage laden oder zur Bewertungsseite wechseln
            if (currentQuestionIndex + 1 >= totalQuestions) {
                window.location.href = "bewertung.html";
            } else {
                window.location.href = "frage.html";
            }
        };
        optionsContainer.appendChild(button);
    });
});
