document.addEventListener("DOMContentLoaded", () => {
    // Fragen und Index aus dem localStorage abrufen
    const questions = JSON.parse(localStorage.getItem("questions"));
    const currentQuestionIndex = parseInt(localStorage.getItem("currentQuestionIndex")) || 0;

    // Prüfen, ob alle Fragen beantwortet wurden
    if (!questions || currentQuestionIndex >= questions.length) {
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
                localStorage.setItem("lastCorrectAnswer", question.options[question.answer]);
                localStorage.setItem("lastExplanation", question.explanation);

                // Punkte aktualisieren
                const currentScore = parseInt(localStorage.getItem("score")) || 0;
                const newScore = isCorrect ? currentScore + question.points : currentScore;
                localStorage.setItem("score", newScore.toString());

                // Feedback anzeigen (Correct/Incorrect SVG)
                const feedbackIcon = document.createElement("img");
                feedbackIcon.src = isCorrect
                    ? "assets/images/correct.svg"
                    : "assets/images/incorrect.svg";
                feedbackIcon.alt = isCorrect ? "Richtig" : "Falsch";
                feedbackIcon.style.width = "80px";
                feedbackIcon.style.marginTop = "20px";
                feedbackIcon.style.display = "block";
                feedbackIcon.style.margin = "0 auto"; // Zentrierung

                // Buttons entfernen und Feedback anzeigen
                optionsContainer.innerHTML = ""; // Buttons entfernen
                optionsContainer.appendChild(feedbackIcon);

                // Zur Auflösungsseite wechseln nach einer kurzen Verzögerung
                setTimeout(() => {
                    window.location.href = "aufloesung.html";
                }, 2000); // 2 Sekunden Verzögerung
            };
            optionsContainer.appendChild(button);
        });
});

});
