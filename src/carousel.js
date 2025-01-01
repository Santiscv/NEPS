document.addEventListener('DOMContentLoaded', function() {
    // Función genérica para crear un carousel
    function createCarousel(config) {
        const container = document.querySelector(config.container);
        const cards = container.querySelectorAll(config.cards);
        const dots = document.querySelectorAll(`${config.controls} .carousel-dot`);
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50;

        function showCard(index) {
            if (index < 0) index = cards.length - 1;
            if (index >= cards.length) index = 0;
            
            currentIndex = index;

            cards.forEach(card => {
                card.style.display = 'none';
                card.classList.remove('active');
            });

            cards[currentIndex].style.display = 'flex';
            cards[currentIndex].classList.add('active');

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function handleTouchStart(event) {
            touchStartX = event.touches[0].clientX;
        }

        function handleTouchEnd(event) {
            touchEndX = event.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) >= swipeThreshold) {
                if (swipeDistance > 0) {
                    // Deslizar a la derecha - anterior
                    showCard(currentIndex - 1);
                } else {
                    // Deslizar a la izquierda - siguiente
                    showCard(currentIndex + 1);
                }
            }
        }

        // Agregar event listeners para touch
        container.addEventListener('touchstart', handleTouchStart);
        container.addEventListener('touchend', handleTouchEnd);

        // Event listeners para los dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showCard(index));
        });

        // Autoplay
        let autoplayInterval = setInterval(() => {
            if (window.innerWidth <= 480 && document.hasFocus()) {
                showCard(currentIndex + 1);
            }
        }, 5000);

        // Mostrar primera card
        showCard(0);

        return {
            destroy: function() {
                clearInterval(autoplayInterval);
                container.removeEventListener('touchstart', handleTouchStart);
                container.removeEventListener('touchend', handleTouchEnd);
                cards.forEach(card => {
                    card.style.display = 'flex';
                    card.classList.remove('active');
                });
            }
        };
    }

    // Configuración para cada carousel
    const carouselsConfig = [
        {
            container: '.testimonials-container',
            cards: '.testimonial-card',
            controls: '.carousel-controls'
        },
        {
            container: '.news-container',
            cards: '.news-card',
            controls: '.news-carousel-controls'
        },
        {
            container: '.webinars-container',
            cards: '.webinar-card',
            controls: '.webinar-carousel-controls'
        }
    ];

    let carousels = [];

    function initializeCarousels() {
        // Destruir carousels existentes
        carousels.forEach(carousel => carousel.destroy());
        carousels = [];

        // Inicializar nuevos carousels si estamos en móvil
        if (window.innerWidth <= 480) {
            carouselsConfig.forEach(config => {
                carousels.push(createCarousel(config));
            });
        }
    }

    // Inicializar carousels
    initializeCarousels();

    // Manejar resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initializeCarousels, 250);
    });

    // Manejar visibilidad de la página
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            initializeCarousels();
        }
    });
});