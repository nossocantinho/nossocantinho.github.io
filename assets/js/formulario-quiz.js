document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById("quizForm");
    if (!quizForm) return; // Garante que o código só rode na página do formulário

    quizForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const q1 = document.getElementById("q1").value.trim().toLowerCase();
        const q2 = document.getElementById("q2").value.trim().toLowerCase();
        const q3 = document.getElementById("q3").value.trim().toLowerCase();
        const q4 = document.getElementById("q4").value.trim().toLowerCase();
        const q5 = document.getElementById("q5").value.trim().toLowerCase();
        const q6 = document.getElementById("q6").value.trim().toLowerCase();

        // Respostas corretas
        const respostas = {
            r1: "21/04/2025",
            r2: "azul",
            r3: "wish you were here",
            r4: "interestelar",
            r5: "01/05/2025",
            r6: "preta"
        };

        if (q1 === respostas.r1 && q2 === respostas.r2 && q3 === respostas.r3 && q4 === respostas.r4 && q5 === respostas.r5 && q6 === respostas.r6) {
            document.getElementById("quizForm").style.display = "none";
            document.getElementById("successMessage").style.display = "block";
        } else {
            alert("Alguma resposta está errada... tenta lembrar com carinho! 💭");
        }
    });
});