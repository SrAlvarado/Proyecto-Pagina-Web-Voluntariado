
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
    const emailVoluntarios = "voluntario.com";
    const emailOrganizaciones = "org.com";
    const emailCoordinador = "coordinador.com";

    let finalEmail = email.substring(email.indexOf("@") + 1);

    if (!email) {
      alert("Por favor, ingresa un email correcto.");
      return;
    }

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
      window.location.href = "./organizaciones/voluntariados_org.html";
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

// Validaciones múltiples para ambos formularios
document.addEventListener('DOMContentLoaded', function () {
  const formularios = document.querySelectorAll(".formularioRegistro");

  formularios.forEach(formulario => {
    formulario.addEventListener("submit", function (event) {
      // Validación de Nombre
      const nombreInput = formulario.querySelector(".nombreFormulario");
      const mensajeNombre = formulario.querySelector(".mensaje-Nombre");
      const regexNombre = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
      const nombre = nombreInput?.value.trim();

      if (nombreInput && !regexNombre.test(nombre)) {
        if (mensajeNombre) {
          mensajeNombre.textContent = "El nombre solo puede contener letras y espacios.";
          mensajeNombre.style.color = "blue";
        }
        nombreInput.classList.add("is-danger", "shake");
        event.preventDefault();
        setTimeout(() => nombreInput.classList.remove("shake"), 500);
      } else if (mensajeNombre) {
        mensajeNombre.textContent = "";
        nombreInput?.classList.remove("is-danger");
      }

      // Validación de Fecha de Nacimiento
      const fechaNacimientoInput = formulario.querySelector(".fechaNacimientoFormulario");
      const mensajeFecha = formulario.querySelector(".mensaje-Fecha");

      if (fechaNacimientoInput) {
        const fechaNacimiento = new Date(fechaNacimientoInput.value);
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        if (fechaNacimiento >= hoy) {
          if (mensajeFecha) {
            mensajeFecha.textContent = "La fecha de nacimiento no puede ser igual o mayor a hoy.";
            mensajeFecha.style.color = "blue";
          }
          fechaNacimientoInput.classList.add("is-danger", "shake");
          event.preventDefault();
          setTimeout(() => fechaNacimientoInput.classList.remove("shake"), 500);
        } else if (mensajeFecha) {
          mensajeFecha.textContent = "";
          fechaNacimientoInput.classList.remove("is-danger");
        }
      }

      // Validación de Teléfono
      const telefonoInput = formulario.querySelector(".telefonoFormulario");
      const mensajeTelefono = formulario.querySelector(".mensaje-Telefono");
      const regexTelefono = /^(6|7|8|9)\d{8}$/;

      if (telefonoInput) {
        const telefono = telefonoInput.value.trim();
        if (!regexTelefono.test(telefono)) {
          if (mensajeTelefono) {
            mensajeTelefono.textContent = "El número debe empezar por 6, 7, 8 o 9 y tener 9 dígitos.";
            mensajeTelefono.style.color = "blue";
          }
          telefonoInput.classList.add("is-danger", "shake");
          event.preventDefault();
          setTimeout(() => telefonoInput.classList.remove("shake"), 500);
        } else if (mensajeTelefono) {
          mensajeTelefono.textContent = "";
          telefonoInput.classList.remove("is-danger");
        }
      }

      // Validación de DNI
      const dniInput = formulario.querySelector(".dniFormulario");
      const mensajeDNI = formulario.querySelector(".mensaje-DNI");
      const regexDNI = /^\d{8}[A-Z]$/;

      if (dniInput) {
        const dni = dniInput.value.trim();
        if (!regexDNI.test(dni)) {
          if (mensajeDNI) {
            mensajeDNI.textContent = "El DNI debe tener 8 dígitos seguidos de una letra.";
            mensajeDNI.style.color = "blue";
          }
          dniInput.classList.add("is-danger", "shake");
          event.preventDefault();
          setTimeout(() => dniInput.classList.remove("shake"), 500);
        } else if (mensajeDNI) {
          mensajeDNI.textContent = "";
          dniInput.classList.remove("is-danger");
        }
      }

      // Validación de Email
      const emailInput = formulario.querySelector(".emailFormulario");
      const mensajeEmail = formulario.querySelector(".mensaje-Email");
      const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (emailInput) {
        const email = emailInput.value.trim();
        if (!regexEmail.test(email)) {
          if (mensajeEmail) {
            mensajeEmail.textContent = "El email no es válido.";
            mensajeEmail.style.color = "blue";
          }
          emailInput.classList.add("is-danger", "shake");
          event.preventDefault();
          setTimeout(() => emailInput.classList.remove("shake"), 500);
        } else if (mensajeEmail) {
          mensajeEmail.textContent = "";
          emailInput.classList.remove("is-danger");
        }
      }

      // Validación de Contraseña
      const passwordInput = formulario.querySelector(".passwordFormulario");
      const mensajePassword = formulario.querySelector(".mensaje-password");
      const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if (passwordInput) {
        const password = passwordInput.value.trim();
        if (!regexPassword.test(password)) {
          if (mensajePassword) {
            mensajePassword.textContent = "La contraseña debe tener al menos 8 caracteres y contener letras y números.";
            mensajePassword.style.color = "blue";
          }
          passwordInput.classList.add("is-danger", "shake");
          event.preventDefault();
          setTimeout(() => passwordInput.classList.remove("shake"), 500);
        } else if (mensajePassword) {
          mensajePassword.textContent = "";
          passwordInput.classList.remove("is-danger");
        }
      }
    });
  });
});

// Validación de disponibilidad de días y horas
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


document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".navbar-burger");
  const menu = document.getElementById(burger.dataset.target);

  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
});
