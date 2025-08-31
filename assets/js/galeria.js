document.addEventListener("DOMContentLoaded", function() {

    // A lista com todas as suas fotos e legendas
    const momentos = [
        { img: 'images/foto_1.png', cap: '21/04/2025 <br> A primeira vez que saímos, a saída que deveria ser um café como amigos, que virou um date e que, por fim, nos trouxe até aqui..' },
        { img: 'images/foto_cafe.jpg', cap: '21/04/2025 <br> Esses eram os nossos cafés, lembra? (O seu era bem mais gostoso)' },
        { img: 'images/foto_2.png', cap: '23/04/2025 <br> Tomado pela conexão que tive com você e por aquela sensação boa de estar apaixonado, não resisti e te chamei pra sair de novo... Arrisquei, não sabia se iria aceitar... felizmente aceitou' },
        { img: 'images/vista.jpg', cap: '23/04/2025 <br> Eu achava a urca bonita, até ter essa vista... Eu sempre te achei linda, desde que te vi pela primeira vez, mas, nossa, a cada dia que passa você tá mais linda! Você é minha cor favorita.' },
        { img: 'images/foto_coca.jpg', cap: '23/04/2025 <br>O moço acertou nessa latinha e a gente nem imaginava...' },
        { img: 'images/26 de abril.jpg', cap: '26/04/2025 <br>Essa foi a primeira vez que cozinhamos juntos, primeira de muitas vezes (O lanche tava delicioso, viu?!)' },
        { img: 'images/foto_4.png', cap: '01/05/2025 <br> O nosso encontro mais especial, eu planejando 1001 coisas e você nem imaginava... Eu tava muito nervoso esse dia, não sabia se você ia gostar do seu presente de aniversário, não sabia se você ia aceitar o pedido de namoro que eu planejei num site (<i>nesse site...)</i>' },
        { img: 'images/foto_6.png', cap: '01/05/2025 <br> Você aceita namorar comigo? Enfim, você, felizmente, aceitou.' },
        { img: 'images/praia.jpg', cap: '09/05/2025 <br> O dia que tivemos uma tarde/noite de herdeiro, com direito a praia e lanche numa sexta feira... Nada melhor que isso depois de um dia né, amor?' },
        { img: 'images/9 de maio.jpg', cap: '09/05/2025 <br> Eu tenho CERTEZA que eu gosto mesmo de você!' },
        { img: 'images/18 de maio.jpg', cap: '18/05/2025 <br> Acordamos cedo, fomos na praia, almoçamos em um restaurantre lindo e a cada dia que passa eu percebo que eu te amo, e sei que amanhã vou te amar mais do que eu já te amo hoje! Quero casar com você.' },
        { img: 'images/22 de maio.jpg', cap: '22/05/2025 <br> Eu te chamei pra ir para os 15 anos de uma aluna minha (já tinha dado seu nome, sem saber se você ia aceitar), e nossa, você é linda todos os dias, mas aqui você estava ESPETACULAR! Amo a sua beleza, amo você, você é o centro da MINHA atenção.' },
    ];

    // Seleciona os elementos do HTML
    const galeriaContainer = document.getElementById('gallery-container');
    const lightbox = document.getElementById('lightbox-container');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');

    // Função para abrir o lightbox
    function openLightbox(imgSrc, captionText) {
        lightboxImg.src = imgSrc;
        lightboxCaption.innerHTML = captionText; // Usa innerHTML para renderizar o <br>
        lightbox.classList.remove('lightbox-hidden');
        document.body.classList.add('lightbox-open'); // Trava a rolagem da página
    }

    // Função para fechar o lightbox
    function closeLightbox() {
        lightbox.classList.add('lightbox-hidden');
        document.body.classList.remove('lightbox-open'); // Libera a rolagem
    }

    // Constrói a galeria e adiciona os "ouvintes de clique"
    momentos.forEach(momento => {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = momento.img;
        img.alt = 'Momento do casal';
        
        const caption = document.createElement('div');
        caption.className = 'caption';
        caption.innerHTML = momento.cap; // Usa innerHTML para o <br> e <i>

        item.appendChild(img);
        item.appendChild(caption);

        // Adiciona o evento de clique a cada item da galeria
        item.addEventListener('click', () => {
            openLightbox(momento.img, momento.cap);
        });

        galeriaContainer.appendChild(item);
    });

    // Adiciona os eventos para fechar o lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        // Fecha o lightbox se o clique for no fundo (overlay) e não na imagem
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});