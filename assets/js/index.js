function startQuiz() {
    const thema = document.getElementById("thema").value;
    const anzahl = parseInt(document.getElementById("anzahl").value);

    console.log(`Thema: ${thema}, Anzahl der Fragen: ${anzahl}`);

    fetch(`assets/data/${thema}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Fehler! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Daten geladen:", data);

            const allQuestions = data[thema];
            if (!allQuestions || allQuestions.length === 0) {
                throw new Error("Keine Fragen gefunden!");
            }

            console.log("Verfügbare Fragen:", allQuestions);

            const totalAvailableQuestions = allQuestions.length;

            if (totalAvailableQuestions < anzahl) {
                alert(`Es gibt nur ${totalAvailableQuestions} Fragen für das Thema. Die maximale Anzahl wird verwendet.`);
            }

            const selectedQuestionCount = Math.min(totalAvailableQuestions, anzahl);

            // Zufällige Fragen auswählen
            const selectedQuestions = allQuestions
                .sort(() => 0.5 - Math.random())
                .slice(0, selectedQuestionCount);

            console.log("Ausgewählte Fragen:", selectedQuestions);

            localStorage.setItem("questions", JSON.stringify(selectedQuestions));
            localStorage.setItem("currentQuestionIndex", "0");
            localStorage.setItem("score", "0");

            window.location.href = "frage.html";
        })
        .catch(err => {
            console.error("Fehler:", err.message);
            alert("Es ist ein Fehler beim Laden der Fragen aufgetreten.");
        });
}
