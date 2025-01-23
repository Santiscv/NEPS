document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todas las imágenes que queremos animar
    const images = document.querySelectorAll('img:not(.logo):not(.logo-mobile)');
    
    // Añadir clases de animación inicial a las imágenes
    images.forEach((img, index) => {
        if (index % 2 === 0) {
            img.classList.add('slide-in-left');
        } else {
            img.classList.add('slide-in-right');
        }
    });

    // Función para verificar si un elemento está en el viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Función para manejar el scroll
    function handleScroll() {
        images.forEach(img => {
            if (isInViewport(img)) {
                img.classList.add('active');
            }
        });
    }

    // Observador de intersección para mejor rendimiento
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, {
        threshold: 0.1 // 10% del elemento visible
    });

    // Observar cada imagen
    images.forEach(img => {
        observer.observe(img);
    });

    // Ejecutar handleScroll al cargar la página
    handleScroll();
    
    // Añadir el evento de scroll
    window.addEventListener('scroll', handleScroll);
});