document.addEventListener("DOMContentLoaded", function () {
    const timeline = document.querySelector(".timeline");
    if (!timeline) return; // Só executa se a timeline existir na página

    const timelineProgress = timeline.querySelector("::before");

    function updateTimelineProgress() {
        const scrollTop = window.scrollY; // O quanto o usuário rolou a página
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        // Limita o preenchimento para não passar do fim da timeline
        const maxFill = timeline.offsetHeight;
        let progressHeight = (scrollPercent / 100) * maxFill * 1.5; // Multiplicador para ajustar a velocidade
        progressHeight = Math.min(progressHeight, maxFill); // Garante que não ultrapasse 100%

        // Aplica a altura na barra de progresso
        timeline.style.setProperty('--progress-height', progressHeight + 'px');
    }

    // Atualiza a barra de progresso ao rolar a página
    window.addEventListener("scroll", updateTimelineProgress);

    // Ajusta o CSS para usar a variável
    const style = document.createElement('style');
    style.innerHTML = `.timeline::before { height: var(--progress-height, 0); }`;
    document.head.appendChild(style);

    // Roda uma vez no início para o caso da página carregar no meio
    updateTimelineProgress();
});