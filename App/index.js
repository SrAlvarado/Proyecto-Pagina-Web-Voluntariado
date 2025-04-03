
//Evento para que en einicio, la sección de Acerca de Nosotros aparezca con una animación de entrada
document.addEventListener("DOMContentLoaded", function () {
    const acercaDeTextos = document.querySelectorAll(".acerca-de-texto");
    const iconos = document.querySelectorAll(".icon-box");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = entry.target.classList.contains("acerca-de-texto")
                    ? "slideInLeft 1s ease-out forwards"
                    : "slideInUp 0.8s ease-out forwards";
                observer.unobserve(entry.target); // Evita que se repita la animación
            }
        });
    }, { threshold: 0.3 });

    // Aplicamos el observador a todos los elementos
    acercaDeTextos.forEach(texto => observer.observe(texto));
    iconos.forEach(icono => observer.observe(icono));
});
