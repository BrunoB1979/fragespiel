document.addEventListener("DOMContentLoaded", () => {
    // Fragen und Index aus dem localStorage abrufen
    const questions = JSON.parse(localStorage.getItem("questions"));
    const currentQuestionIndex = parseInt(localStorage.getItem("currentQuestionIndex")) || 0;

    // Prüfen, ob alle Fragen beantwortet wurden
    if (!questions || currentQuestionIndex >= questions.length) {
        // Zur Bewertungsseite weiterleiten
        window.location.href = "bewertung.html";
        return;
    }

    // Aktuelle Frage laden
    const question = questions[currentQuestionIndex];

    // Fortschrittsanzeige aktualisieren
    document.getElementById("currentQuestion").innerText = currentQuestionIndex + 1;
    document.getElementById("totalQuestions").innerText = questions.length;

    // Frage anzeigen
    document.getElementById("question").innerText = question.question;

    // Antworten zufällig sortieren und anzeigen
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Container leeren

    question.options
        .map((option, index) => ({ text: option, index }))
        .sort(() => Math.random() - 0.5) // Antworten mischen
        .forEach(option => {
            const button = document.createElement("button");
            button.innerText = option.text;
            button.onclick = () => {
                // Antwort auswerten
                const isCorrect = option.index === question.answer;
                localStorage.setItem("lastAnswerCorrect", isCorrect);

                // Punkte aktualisieren
                const currentScore = parseInt(localStorage.getItem("score")) || 0;
                const newScore = isCorrect ? currentScore + question.points : currentScore;
                localStorage.setItem("score", newScore.toString());

                // Richtig/Falsch-Symbol anzeigen
                const feedbackIcon = document.createElement("img");
                feedbackIcon.src = isCorrect
                    ? "assets/images/correct.svg"
                    : "assets/images/incorrect.svg";
                feedbackIcon.alt = isCorrect ? "Richtig" : "Falsch";
                feedbackIcon.style.width = "50px";
                feedbackIcon.style.marginTop = "20px";
                optionsContainer.innerHTML = ""; // Buttons entfernen
                optionsContainer.appendChild(feedbackIcon);

                // Weiter nach kurzer Verzögerung
                setTimeout(() => {
                    const nextQuestionIndex = currentQuestionIndex + 1;
                    localStorage.setItem("currentQuestionIndex", nextQuestionIndex.toString());

                    // Nächste Frage oder Bewertungsseite
                    if (nextQuestionIndex >= questions.length) {
                        window.location.href = "bewertung.html";
                    } else {
                        window.location.href = "frage.html";
                    }
                }, 1500);
            };
            optionsContainer.appendChild(button);
        });
});
