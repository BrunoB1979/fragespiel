document.addEventListener("DOMContentLoaded", () => {
    const score = parseInt(localStorage.getItem("score")) || 0;
    const questions = JSON.parse(localStorage.getItem("questions")) || [];
    const totalPoints = questions.reduce((sum, q) => sum + (q.points || 0), 0);
    const percentage = totalPoints > 0 ? ((score / totalPoints) * 100).toFixed(2) : "0.00";

    const scoreElement = document.getElementById("score");
    const percentageElement = document.getElementById("percentage");
    const restartButton = document.getElementById("restartButton");

    if (scoreElement) {
        scoreElement.innerText = `Erreichte Punkte: ${score} / ${totalPoints}`;
    } else {
        console.error("Element mit ID 'score' nicht gefunden.");
    }

    if (percentageElement) {
        percentageElement.innerText = `Prozent: ${percentage}%`;
    } else {
        console.error("Element mit ID 'percentage' nicht gefunden.");
    }

    if (restartButton) {
        restartButton.addEventListener("click", () => {
            // Optional: LocalStorage zurücksetzen
            localStorage.removeItem("questions");
            localStorage.removeItem("currentQuestionIndex");
            localStorage.removeItem("score");
            localStorage.removeItem("lastAnswerCorrect");
            localStorage.removeItem("lastCorrectAnswer");
            localStorage.removeItem("lastExplanation");
            window.location.href = "index.html";
        });
    } else {
        console.error("Button mit ID 'restartButton' nicht gefunden.");
    }
});
