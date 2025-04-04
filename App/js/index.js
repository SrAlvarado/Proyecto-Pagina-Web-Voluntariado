
//Evento para que en el inicio, la sección de Acerca de Nosotros aparezca con una animación de entrada
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

      // === CONTROL DE INTERFAZ SEGÚN TIPO DE USUARIO ===

  // Cambia esto según quién esté logueado o registrado:
  // Opciones: 'voluntario', 'organización', 'coordinador_registro', 'coordinador_login'
  const tipoUsuario = 'coordinador_registro'; // ← cámbialo dinámicamente según quién se conecte

  function toggleClases(elementos, ocultar, clase = 'is-hidden') {
    elementos.forEach(el => {
      el.classList.toggle(clase, ocultar);
    });
  }

  function ajustarInterfazPorRol(tipo) {
    const btnVoluntario = document.querySelectorAll('.btn-voluntario');
    const columnasCoordinador = document.querySelectorAll('.col-coordinador');
    const accionesCoordinador = document.querySelectorAll('.col-edicion, .btn-editar, .btn-eliminar');
    const btnCrear = document.querySelectorAll('.btn-crear-voluntariado');

    // Mostrar/ocultar botón "Crear voluntariado"
    toggleClases(btnCrear, !(tipo === 'coordinador_registro' || tipo === 'coordinador_login'));

    // Ocultar botones "apuntarme" si eres coordinador
    toggleClases(btnVoluntario, tipo === 'coordinador_registro' || tipo === 'coordinador_login');

    // Mostrar columnas y botones solo si eres coordinador *logueado*
    toggleClases(columnasCoordinador, tipo !== 'coordinador_login', 'is-invisible');
    toggleClases(accionesCoordinador, tipo !== 'coordinador_login', 'is-hidden');
  }

  ajustarInterfazPorRol(tipoUsuario);
});
