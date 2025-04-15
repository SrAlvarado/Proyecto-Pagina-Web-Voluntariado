
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
//********** MODAL **********/
// Abre el modal al hacer clic en un enlace con href="#modal"
document.addEventListener("DOMContentLoaded", () => {
    const modals = document.querySelectorAll(".modal");
    
    // Cierra el modal al hacer clic fuera del contenido
    modals.forEach(modal => {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          location.hash = ""; // cierra el modal
        }
      });
    });
    
    // Función para añadir o quitar la clase modal-open según el hash
    function checkModal() {
      if (location.hash && document.querySelector(location.hash)) {
        document.body.classList.add("modal-open");
        document.documentElement.classList.add("modal-open");
      } else {
        document.body.classList.remove("modal-open");
        document.documentElement.classList.remove("modal-open");
      }
    }
    
    // Verifica el estado cuando cambia el hash y al cargar la página
    window.addEventListener("hashchange", checkModal);
    checkModal();
  });

document.addEventListener("DOMContentLoaded", () => {
  const modals = document.querySelectorAll(".modal");
  
  // Cierra el modal al hacer clic fuera del contenido
  modals.forEach(modal => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        location.hash = ""; // cierra el modal
      }
    });
  });
  
  // Función para añadir o quitar la clase modal-open según el hash
  function checkModal() {
    if (location.hash && document.querySelector(location.hash)) {
      document.body.classList.add("modal-open");
      document.documentElement.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
      document.documentElement.classList.remove("modal-open");
    }
  }
  
  // Verifica el estado cuando cambia el hash y al cargar la página
  window.addEventListener("hashchange", checkModal);
  checkModal();
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const icon = btn.querySelector('.toggle-icon');
      const isActive = item.classList.contains('active');

      if (isActive) {
        answer.style.height = answer.scrollHeight + 'px';
        requestAnimationFrame(() => {
          answer.style.height = '0';
        });
      } else {
        answer.style.height = answer.scrollHeight + 'px';
        answer.addEventListener('transitionend', function handler() {
          if (item.classList.contains('active')) {
            answer.style.height = 'auto';
          }
          answer.removeEventListener('transitionend', handler);
        });
      }

      item.classList.toggle('active');
      icon.textContent = item.classList.contains('active') ? '−' : '+';
    });
  });
});

// Función para redirigir usuario a sus html correspondientes según el email
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("idBotonEnviarInicioSesion").addEventListener("click", function (event) {
    event.preventDefault(); // ✋ Evita que se envíe el formulario automáticamente

    let email = document.getElementById("idEmailInicioSesion").value.trim();
    const emailVoluntarios = "voluntarios.com";
    const emailOrganizaciones = "org.com";
    const emailCoordinador = "coordinador.com";

    let finalEmail = email.substring(email.indexOf("@") + 1);

    if (
      finalEmail !== emailVoluntarios &&
      finalEmail !== emailOrganizaciones &&
      finalEmail !== emailCoordinador
    ) {
      mostrarModal();
      return;
    }

    if (finalEmail === emailVoluntarios) {
      window.location.href = "./voluntarios/index_voluntarios.html";
    } else if (finalEmail === emailOrganizaciones) {
      window.location.href = "./voluntariados/voluntariados_organizaciones.html";
    } else if (finalEmail === emailCoordinador) {
      window.location.href = "./coordinador/voluntariados_coordinador.html";
    }
  });
});

function mostrarModal() {
  document.getElementById("modalDominioNoValido").style.display = "block";
}

function cerrarModal() {
  document.getElementById("modalDominioNoValido").style.display = "none";
}

// Validación del formulario de nombre
document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById("formulario");
  const nombreInput = document.getElementById("nombre");
  const mensajeNombre = document.getElementById("mensaje-Nombre");

  formulario.addEventListener("submit", function (event) {
    const nombre = nombreInput.value.trim();
    const regex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;

    if (!regex.test(nombre)) {
      mensajeNombre.textContent = "El nombre solo puede contener letras y espacios.";
      mensajeNombre.style.color = "blue";
      event.preventDefault();
    } else {
      mensajeNombre.textContent = "";
    }
  });
});
// Validación del formulario de fecha de nacimiento
document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById("formulario");
  const fechaNacimientoInput = document.getElementById("fechaNacimiento");
  const mensajeFecha = document.getElementById("mensaje-Fecha");

  formulario.addEventListener("submit", function (event) {
    const fechaNacimiento = new Date(fechaNacimientoInput.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Elimina la hora para comparar solo la fecha

    if (fechaNacimiento >= hoy) {
      mensajeFecha.textContent = "La fecha de nacimiento no puede ser igual o mayor a hoy.";
      mensajeFecha.style.color = "blue";
      event.preventDefault();
    } else {
      mensajeFecha.textContent = "";
    }
  });
});
// Validación del formulario de teléfono
document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById("formulario");
  const telefonoInput = document.getElementById("telefono");
  const mensajeTelefono = document.getElementById("mensaje-Telefono");

  formulario.addEventListener("submit", function (event) {
    const telefono = telefonoInput.value.trim();
    const regex = /^\d{9}$/;

    if (!regex.test(telefono)) {
      mensajeTelefono.textContent = "El teléfono debe tener 9 dígitos.";
      mensajeTelefono.style.color = "blue";
      event.preventDefault();
    } else {
      mensajeTelefono.textContent = "";
    }
  });
});
// Validación del formulario de DNI
document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById("formulario");
  const dniInput = document.getElementById("dni");
  const mensajeDNI = document.getElementById("mensaje-DNI");

  formulario.addEventListener("submit", function (event) {
    const dni = dniInput.value.trim();
    const regex = /^\d{8}[A-Z]$/;

    if (!regex.test(dni)) {
      mensajeDNI.textContent = "El DNI debe tener 8 dígitos seguidos de una letra.";
      mensajeDNI.style.color = "blue";
      event.preventDefault();
    } else {
      mensajeDNI.textContent = "";
    }
  });
});
//Validación del formulario de teléfono para que tenga 9 dígitos y empiece por 6 o 7 o 8 o 9
document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById("formulario");
  const telefonoInput = document.getElementById("telefono");
  const mensajeTelefono = document.getElementById("mensaje-Telefono");

  formulario.addEventListener("submit", function (event) {
    const telefono = telefonoInput.value.trim();
    const regex = /^(6|7|8|9)\d{8}$/;

    if (!regex.test(telefono)) {
      mensajeTelefono.textContent = "El número debe empezar por 6, 7, 8 o 9 y tener 9 dígitos.";
      mensajeTelefono.style.color = "blue";
      event.preventDefault();
    } else {
      mensajeTelefono.textContent = "";
    }
  });
});
// Validación del formulario de email
document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById("formulario");
  const emailInput = document.getElementById("email");
  const mensajeEmail = document.getElementById("mensaje-Email");

  formulario.addEventListener("submit", function (event) {
    const email = emailInput.value.trim();
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      mensajeEmail.textContent = "El email no es válido.";
      mensajeEmail.style.color = "blue";
      event.preventDefault();
    } else {
      mensajeEmail.textContent = "";
    }
  });
});
//Validación del formulario de contraseña
document.addEventListener('DOMContentLoaded', function () {
  const formulario = document.getElementById("formulario");
  const contrasenaInput = document.getElementById("password");
  const mensajeContrasena = document.getElementById("mensaje-password");

  formulario.addEventListener("submit", function (event) {
    const contrasena = contrasenaInput.value.trim();
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!regex.test(contrasena)) {
      mensajeContrasena.textContent = "La contraseña debe tener al menos 8 caracteres y contener letras y números.";
      mensajeContrasena.style.color = "blue";
      event.preventDefault();
    } else {
      mensajeContrasena.textContent = "";
    }
  });
});
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.day-availability input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      const selectId = `select-${this.id.split('-')[1]}`;
      const select = document.getElementById(selectId);
      if (select) {
        select.disabled = !this.checked;
      }
    });
  });
});