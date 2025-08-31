document.addEventListener("DOMContentLoaded", function() {
    // Defina aqui a sua senha secreta
    const senhaCorreta = "0105"; 

    const loginForm = document.getElementById("login-form");
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    loginForm.addEventListener("submit", function(event) {
        // Previne o recarregamento da página ao enviar o formulário
        event.preventDefault(); 

        const senhaDigitada = passwordInput.value;

        if (senhaDigitada === senhaCorreta) {
            // Se a senha estiver correta, redireciona para a página inicial
            window.location.href = "home.html";
        } else {
            // Se a senha estiver incorreta, mostra a mensagem de erro
            errorMessage.classList.remove("error-hidden");
            // Limpa o campo da senha
            passwordInput.value = "";
        }
    });
});