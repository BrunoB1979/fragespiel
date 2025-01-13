document.addEventListener("DOMContentLoaded", () => {
    const score = parseInt(localStorage.getItem("score"));
    const questions = JSON.parse(localStorage.getItem("questions"));
    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = ((score / totalPoints) * 100).toFixed(2);

    document.getElementById("score").innerText = `Erreichte Punkte: ${score} / ${totalPoints}`;
    document.getElementById("percentage").innerText = `Prozent: ${percentage}%`;

    document.getElementById("restartButton").onclick = () => {
        window.location.href = "index.html";
    };
});
