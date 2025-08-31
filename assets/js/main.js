// Aguarda o conteúdo da página carregar antes de executar o script
document.addEventListener("DOMContentLoaded", function () {

    // ===============================================
    // MÓDULO 1: CONTADORES E COUNTDOWNS (PÁGINA HOME)
    // ===============================================
    function iniciarContadoresHome() {
        if (document.getElementById("contador-encontro")) { // Executa apenas se encontrar o elemento da home
            const dataEncontro = new Date("2025-04-21T00:00:00");
            const dataNamoro = new Date("2025-05-01T00:00:00");
            const hoje = new Date();

            const diffEncontro = Math.floor((hoje - dataEncontro) / (1000 * 60 * 60 * 24));
            const diffNamoro = Math.floor((hoje - dataNamoro) / (1000 * 60 * 60 * 24));

            document.getElementById("contador-encontro").textContent = `${diffEncontro} dias desde que nos vimos pela primeira vez.`;
            document.getElementById("contador-namoro").textContent = `${diffNamoro} dias de namoro.`;

            iniciarCountdown("countdown-mesversario", "btn-mesversario", new Date("2025-06-01T00:00:00"), () => { window.location.href = "mesversario.html"; });
            iniciarCountdown("countdown-namorados", "btn-namorados", new Date("2025-06-12T00:00:00"), () => { window.location.href = "namorados1.html"; });
        }
    }

    function iniciarCountdown(elementId, buttonId, unlockDate, onUnlock) {
        const countdownElement = document.getElementById(elementId);
        const buttonElement = document.getElementById(buttonId);

        function update() {
            const now = new Date();
            const diff = unlockDate - now;

            if (diff <= 0) {
                if (countdownElement) countdownElement.textContent = "A surpresa está liberada!";
                if (buttonElement) {
                    buttonElement.disabled = false;
                    buttonElement.onclick = onUnlock;
                }
                clearInterval(intervalo);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                if (countdownElement) {
                    countdownElement.textContent = `${days}d ${hours}h ${minutes}min restantes`;
                }
            }
        }
        if (countdownElement) {
            const intervalo = setInterval(update, 60000);
            update();
        }
    }

    // ===============================================
    // MÓDULO 2: COMPONENTE DE CARROSSEL REUTILIZÁVEL
    // ===============================================
    function inicializarCarrossel(seletorContainer) {
        const carrossel = document.querySelector(seletorContainer);
        if (!carrossel) return;

        const slideContainer = carrossel.querySelector('.slides');
        const prevBtn = carrossel.querySelector('.arrow.left');
        const nextBtn = carrossel.querySelector('.arrow.right');
        const slides = carrossel.querySelectorAll('.slide');
        const dotsContainer = carrossel.parentElement.querySelector('.carousel-dots');
        let dots = [];

        if (!slideContainer || !prevBtn || !nextBtn || slides.length === 0) return;

        // Cria os pontos se o container de pontos existir
        if (dotsContainer) {
            dotsContainer.innerHTML = ''; // Limpa pontos existentes
            slides.forEach((_, index) => {
                const dot = document.createElement("span");
                dot.className = "dot";
                dot.addEventListener("click", () => {
                    currentSlide = index;
                    update();
                });
                dotsContainer.appendChild(dot);
                dots.push(dot);
            });
        }

        let currentSlide = 0;
        const totalSlides = slides.length;

        function update() {
            slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove("active"));
                dots[currentSlide].classList.add("active");
            }
        }

        function showNextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            update();
        }

        function showPrevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            update();
        }

        nextBtn.addEventListener("click", showNextSlide);
        prevBtn.addEventListener("click", showPrevSlide);

        let autoSlideInterval = setInterval(showNextSlide, 4000);
        carrossel.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
        carrossel.addEventListener("mouseleave", () => {
            autoSlideInterval = setInterval(showNextSlide, 4000);
        });

        update();
    }

    // ==============================================================
    // MÓDULO 3: GERADOR DE SLIDES DINÂMICOS (PÁGINA ESPECIAL)
    // ==============================================================
    function gerarSlidesEspecial() {
        const slideContainer = document.getElementById("slideContainerEspecial");
        if (!slideContainer) return; // Só executa na página certa

        const totalImagens = 78;
        for (let i = 1; i <= totalImagens; i++) {
            const slide = document.createElement("div");
            slide.className = "slide";
            const img = document.createElement("img");
            img.src = `images/especial/imagem (${i}).jpg`;
            img.alt = `Foto ${i}`;
            img.loading = "lazy"; // Otimização: carrega imagens conforme necessário
            slide.appendChild(img);
            slideContainer.appendChild(slide);
        }

        // Após criar os slides, inicializa o carrossel para esta seção
        inicializarCarrossel("#carousel-especial");
    }


    // ===============================================
    // INICIALIZAÇÃO DOS MÓDulos
    // ===============================================
    iniciarContadoresHome();
    gerarSlidesEspecial(); // Gera os slides e depois inicializa o carrossel da pág. especial
    inicializarCarrossel("#carousel-namorados"); // Tenta iniciar o carrossel da pág. namorados
});