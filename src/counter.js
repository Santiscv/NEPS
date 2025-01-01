document.addEventListener('DOMContentLoaded', () => {
    const numbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateNumbers() {
        numbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const duration = 2000; // 2 segundos de duración
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;

            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    if (current > target) current = target;
                    
                    // Si el número es entero, no mostrar decimales
                    number.textContent = Math.floor(current);
                    
                    if (current < target) {
                        requestAnimationFrame(updateCount);
                    }
                }
            };

            updateCount();
        });
    }

    // Observer para detectar cuando la sección es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateNumbers();
            }
        });
    }, { threshold: 0.5 });

    // Observar el contenedor de estadísticas
    const statisticsSection = document.querySelector('.stats');
    if (statisticsSection) {
        observer.observe(statisticsSection);
    }
});