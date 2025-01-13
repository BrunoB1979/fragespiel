document.addEventListener("DOMContentLoaded", () => {
    const questions = JSON.parse(localStorage.getItem("questions"));
    console.log("Geladene Fragen:", questions);

    const currentQuestionIndex = parseInt(localStorage.getItem("currentQuestionIndex"));
    console.log("Aktueller Fragenindex:", currentQuestionIndex);

    if (!questions || questions.length === 0) {
        alert("Keine Fragen verfügbar. Bitte starten Sie das Quiz neu.");
        window.location.href = "index.html";
        return;
    }

    const totalQuestions = questions.length;
    const question = questions[currentQuestionIndex];

    console.log("Aktuelle Frage:", question);

    // Update der Fortschrittsanzeige
    document.getElementById("currentQuestion").innerText = currentQuestionIndex + 1;
    document.getElementById("totalQuestions").innerText = totalQuestions;

    // Frage anzeigen
    document.getElementById("question").innerText = question.question;

    // Antworten zufällig sortieren
    const options = question.options
        .map((option, index) => ({ text: option, index }))
        .sort(() => 0.5 - Math.random());

    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = ""; // Leeren des Containers, bevor neue Buttons hinzugefügt werden

    options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.onclick = () => {
            const isCorrect = option.index === question.answer;
            localStorage.setItem("lastAnswerCorrect", isCorrect);
            const currentScore = parseInt(localStorage.getItem("score"));
            const newScore = isCorrect ? currentScore + question.points : currentScore;
            localStorage.setItem("score", newScore.toString());
            window.location.href = "aufloesung.html";
        };
        optionsContainer.appendChild(button);
    });
});
