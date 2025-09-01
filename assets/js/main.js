// Aguarda o conteúdo da página carregar antes de executar o script
document.addEventListener("DOMContentLoaded", function () {

    // ===============================================
    // MÓDULO 1: LÓGICA DA PÁGINA HOME
    // ===============================================
    function iniciarLogicaHome() {
        if (document.getElementById("contador-encontro")) { // Executa apenas na home
            iniciarContadores();
            iniciarTodosOsCountdowns();
        }
    }

    function iniciarContadores() {
        const dataEncontro = new Date("2025-04-21T00:00:00");
        const dataNamoro = new Date("2025-05-01T00:00:00");
        const hoje = new Date();
        const diffEncontro = Math.floor((hoje - dataEncontro) / (1000 * 60 * 60 * 24));
        const diffNamoro = Math.floor((hoje - dataNamoro) / (1000 * 60 * 60 * 24));
        document.getElementById("contador-encontro").textContent = `${diffEncontro} dias desde que nos vimos pela primeira vez.`;
        document.getElementById("contador-namoro").textContent = `${diffNamoro} dias de namoro.`;
    }

    function iniciarTodosOsCountdowns() {
        iniciarCountdown("countdown-mesversario", "btn-mesversario", new Date("2025-06-01T00:00:00"), () => { window.location.href = "mesversario.html"; });
        iniciarCountdown("countdown-namorados", "btn-namorados", new Date("2025-06-12T00:00:00"), () => { window.location.href = "namorados1.html"; });
    }

    function iniciarCountdown(elementId, buttonId, unlockDate, onUnlock) {
        const countdownElement = document.getElementById(elementId);
        const buttonElement = document.getElementById(buttonId);
        if (!countdownElement) return;

        const intervalo = setInterval(() => {
            const now = new Date();
            const diff = unlockDate - now;

            if (diff <= 0) {
                countdownElement.textContent = "A surpresa está liberada!";
                if (buttonElement) {
                    buttonElement.disabled = false;
                    buttonElement.onclick = onUnlock;
                }
                clearInterval(intervalo);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);
                countdownElement.textContent = `${days}d ${hours}h ${minutes}min restantes`;
            }
        }, 60000);
        // Roda a função uma vez imediatamente
        intervalo();
    }

    // ===============================================
    // MÓDULO 2: CARROSSEL REUTILIZÁVEL
    // ===============================================
    function inicializarCarrossel(seletorContainer) {
        const carrossel = document.querySelector(seletorContainer);
        if (!carrossel) return; // Se não achar o carrossel, para a execução

        const slideContainer = carrossel.querySelector('.slides');
        const prevBtn = carrossel.querySelector('.arrow.left');
        const nextBtn = carrossel.querySelector('.arrow.right');
        const slides = carrossel.querySelectorAll('.slide');

        // Verifica se todos os componentes essenciais existem
        if (!slideContainer || !prevBtn || !nextBtn || slides.length === 0) {
            console.error("Componentes do carrossel não encontrados para o seletor:", seletorContainer);
            return;
        }

        const dotsContainer = carrossel.closest('.carousel-wrapper')?.querySelector('.carousel-dots');
        let dots = [];

        if (dotsContainer) {
            dotsContainer.innerHTML = '';
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
                if (dots[currentSlide]) dots[currentSlide].classList.add("active");
            }
        }

        nextBtn.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            update();
        });

        prevBtn.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            update();
        });

        let autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            update();
        }, 4000);

        carrossel.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
        carrossel.addEventListener("mouseleave", () => {
            autoSlideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                update();
            }, 4000);
        });

        update(); // Chama a função para alinhar o slide inicial
    }

    // ==============================================================
    // MÓDULO 3: GERADOR DE SLIDES DA PÁGINA "ESPECIAL"
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
            img.loading = "lazy";
            slide.appendChild(img);
            slideContainer.appendChild(slide);
        }

        // Após criar os slides, inicializa APENAS o carrossel desta seção
        inicializarCarrossel("#carousel-especial");
    }

    // ===============================================
    // INICIALIZAÇÃO GERAL
    // ===============================================
    iniciarLogicaHome();
    gerarSlidesEspecial();
    inicializarCarrossel("#carousel-namorados"); // Tenta rodar o da pág. namorados
});