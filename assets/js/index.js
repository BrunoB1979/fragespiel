document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("startButton");
    if (startButton) {
        startButton.addEventListener("click", startQuiz);
    } else {
        console.error("Button mit ID 'startButton' nicht gefunden.");
    }
});

function startQuiz() {
    const themaSelect = document.getElementById("thema");
    const anzahlSelect = document.getElementById("anzahl");

    if (!themaSelect || !anzahlSelect) {
        alert("Thema oder Anzahl der Fragen nicht ausgewählt.");
        return;
    }

    const thema = themaSelect.value;
    const anzahl = parseInt(anzahlSelect.value);

    fetch(`assets/data/${thema}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Fehler beim Laden der JSON-Datei: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const allQuestions = data[thema];
            if (!allQuestions || allQuestions.length === 0) {
                throw new Error("Keine Fragen im JSON gefunden!");
            }

            const totalAvailableQuestions = allQuestions.length;
            if (anzahl > totalAvailableQuestions) {
                alert(`Es gibt nur ${totalAvailableQuestions} Fragen. Die maximale Anzahl wird verwendet.`);
            }

            // Zufällige Fragen auswählen
            const selectedQuestions = allQuestions
                .sort(() => Math.random() - 0.5)
                .slice(0, Math.min(anzahl, totalAvailableQuestions));

            // Fragen in localStorage speichern
            localStorage.setItem("questions", JSON.stringify(selectedQuestions));
            localStorage.setItem("currentQuestionIndex", "0");
            localStorage.setItem("score", "0");

            // Zur Frageseite wechseln
            window.location.href = "frage.html";
        })
        .catch(error => {
            console.error("Fehler beim Laden der Fragen:", error);
            alert("Es ist ein Fehler beim Laden der Fragen aufgetreten. Bitte überprüfe die JSON-Dateien.");
        });
}
