// Aguarda o conteúdo da página carregar antes de executar o script
document.addEventListener("DOMContentLoaded", function () {

    // ===============================================
    // MÓDULO 1: LÓGICA DA PÁGINA HOME
    // ===============================================
    function iniciarLogicaHome() {
        // Executa apenas se encontrar o elemento da home
        if (document.getElementById("contador-encontro")) {
            iniciarContadores();
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

    // ===============================================
    // MÓDULO 2: CARROSSEL REUTILIZÁVEL
    // ===============================================
    function inicializarCarrossel(seletorContainer) {
        const carrossel = document.querySelector(seletorContainer);
        if (!carrossel) return;

        const slideContainer = carrossel.querySelector('.slides');
        const prevBtn = carrossel.querySelector('.arrow.left');
        const nextBtn = carrossel.querySelector('.arrow.right');
        const slides = carrossel.querySelectorAll('.slide');

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
    // MÓDULO 3: GERADOR DE SLIDES DA PÁGINA "ESPECIAL"
    // ==============================================================
    function gerarSlidesEspecial() {
        const slideContainer = document.getElementById("slideContainerEspecial");
        if (!slideContainer) return;

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

        inicializarCarrossel("#carousel-especial");
    }

    // ===============================================
    // INICIALIZAÇÃO GERAL
    // ===============================================
    iniciarLogicaHome();
    gerarSlidesEspecial();
    inicializarCarrossel("#carousel-namorados");
});