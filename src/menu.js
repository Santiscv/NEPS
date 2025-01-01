document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar elementos del DOM
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    // Función para abrir el menú
    function openMenu(e) {
        e.stopPropagation(); // Evita que el click se propague
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden';
    }

    // Función para cerrar el menú
    function closeMenuHandler() {
        mobileMenu.classList.remove('active');
        body.style.overflow = 'auto';
    }

    // Event listeners
    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuHandler);

    // Cerrar menú al hacer click en un enlace
    const menuLinks = document.querySelectorAll('.mobile-nav .nav-item a');
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenuHandler);
    });

    // Prevenir que el menú se cierre al hacer click dentro de él
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Cerrar menú al hacer click fuera de él
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                closeMenuHandler();
            }
        }
    });
});