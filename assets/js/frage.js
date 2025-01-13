document.addEventListener("DOMContentLoaded", () => {
    // Fragen und Index aus dem localStorage abrufen
    const questions = JSON.parse(localStorage.getItem("questions"));
    const currentQuestionIndex = parseInt(localStorage.getItem("currentQuestionIndex")) || 0;

    // Debugging-Logs für die Konsole
    console.log("Geladene Fragen:", questions);
    console.log("Aktueller Fragenindex:", currentQuestionIndex);

    // Prüfen, ob alle Fragen beantwortet wurden
    if (!questions || currentQuestionIndex >= questions.length) {
        // Zur Bewertungsseite weiterleiten
        console.log("Alle Fragen beantwortet. Weiter zur Bewertungsseite.");
        window.location.href = "bewertung.html";
        return;
    }

    // Aktuelle Frage laden
    const question = questions[currentQuestionIndex];
    console.log("Aktuelle Frage:", question);

    // Fortschrittsanzeige aktualisieren
    document.getElementById("currentQuestion").innerText = currentQuestionIndex + 1;
    document.getElementById("totalQuestions").innerText = questions.length;

    // Frage anzeigen
    if (question && question.question) {
        document.getElementById("question").innerText = question.question;
    } else {
        console.error("Fehler: Frage ist undefiniert.");
    }

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

                // Index erhöhen und speichern
                localStorage.setItem("currentQuestionIndex", (currentQuestionIndex + 1).toString());

                // Nächste Frage oder Bewertungsseite
                if (currentQuestionIndex + 1 >= questions.length) {
                    console.log("Letzte Frage beantwortet. Weiter zur Bewertung.");
                    window.location.href = "bewertung.html";
                } else {
                    console.log("Lade nächste Frage.");
                    window.location.href = "frage.html";
                }
            };
            optionsContainer.appendChild(button);
        });
});
