document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        if (href === '#') {
          scrollToTop();
          return;
        }

        const targetElement = document.querySelector(href);
        if (targetElement) {
          scrollToElement(targetElement);
        }
      }
    });
  });

  function scrollToElement(element) {
    const headerOffset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
      duration: 5000 // Aumentamos la duración del scroll
    });
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      duration: 5000 // Mismo tiempo para consistencia
    });
  }
});