document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        body.style.overflow = 'auto';
    });
});document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;

    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.add('active');
        body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        body.style.overflow = 'auto';
    });
});