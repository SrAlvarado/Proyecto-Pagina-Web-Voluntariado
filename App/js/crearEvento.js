document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector("#crearEvento form");
  const contenedor = document.getElementById("contenedor-cards");
  const modal = document.querySelector('#crearEvento');
  const closeBtn = document.querySelector('.close-btn');
  const submitBtn = document.getElementById('submitBtn'); // Cambiado a submitBtn para coincidir con HTML
  
  let modoEdicion = false;
  let cardEditando = null;
  let imagenActual = null;

  // Función para actualizar el texto del botón
  function updateSubmitButtonText() {
      submitBtn.textContent = modoEdicion ? 'Editar' : 'Crear';
  }

  // Abrir modal para nuevo evento
  document.querySelector('a[href="#crearEvento"]').addEventListener('click', function(e) {
      e.preventDefault();
      modoEdicion = false;
      cardEditando = null;
      form.reset();
      updateSubmitButtonText();
      modal.classList.add('is-active');
  });

  // Editar evento existente
  document.addEventListener('click', function(event) {
      if (event.target.classList.contains('fa-pen-to-square')) {
          const card = event.target.closest('.iniciativa');
          if (!card) return;

          modoEdicion = true;
          cardEditando = card;

          const nombre = card.querySelector('.nombre-proyecto').textContent.trim();
          const tipo = card.querySelector('.tag').textContent.trim();
          const detalles = card.querySelector('details').textContent.replace('Detalles', '').trim();
          imagenActual = card.querySelector('img').getAttribute('src');

          // Rellenar campos
          document.querySelector('#nombre').value = nombre;
          document.querySelector('#tipo').value = tipo;
          document.querySelector('#descripción').value = detalles;
          
          updateSubmitButtonText();
          modal.classList.add('is-active');
      }
  });

  // Cerrar modal
  closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      cerrarModal();
  });

  // Manejar envío del formulario
  form.addEventListener("submit", function(e) {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const tipo = document.getElementById("tipo").value;
      const detalles = document.getElementById("descripción").value.trim();
      const imagenInput = form.querySelector('input[type="file"]');
      let imagenURL = imagenActual || "./../../img/default.png";

      // Si hay nueva imagen, crear URL temporal
      if (imagenInput.files[0]) {
          imagenURL = URL.createObjectURL(imagenInput.files[0]);
      }

      if (modoEdicion && cardEditando) {
          // Actualizar card existente
          cardEditando.querySelector('.nombre-proyecto').textContent = nombre;
          cardEditando.querySelector('.tag').textContent = tipo;
          cardEditando.querySelector('.tag').className = `tag ${getTagClass(tipo)}`;
          cardEditando.querySelector('details').innerHTML = `<summary>Detalles</summary>${detalles}`;
          cardEditando.querySelector('img').src = imagenURL;
      } else {
          // Crear nuevo card
          const card = document.createElement("div");
          card.className = "column is-half";
          card.innerHTML = `
              <div class="iniciativa box">
                  <div class="columns is-vcentered">
                      <div class="column is-5">
                          <div class="columns is-vcentered">
                              <div class="column is-fullwidth">
                                  <strong class="nombre-proyecto">${nombre}</strong><br>
                                  <h2><span class="tag ${getTagClass(tipo)}">${tipo}</span></h2>
                                  <div class="has-text-left mt-5">
                                      <i class="fa-solid fa-pen-to-square has-text-warning"></i>
                                      <i class="fa-solid fa-trash has-text-danger"></i>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="column is-fullwidth">
                          <div class="column is-flex is-justify-content-center">
                              <img class="imagenes-eventos" src="${imagenURL}" alt="Imagen ${nombre}">
                          </div>
                      </div>
                  </div>
                  <div>
                      <details class="has-text-justified">
                          <summary>Detalles</summary>
                          ${detalles}
                      </details>
                  </div>
              </div>
          `;
          contenedor.appendChild(card);
      }

      cerrarModal();
  });

  // Función para cerrar modal y resetear
  function cerrarModal() {
      modal.classList.remove('is-active');
      form.reset();
      modoEdicion = false;
      cardEditando = null;
      imagenActual = null;
      updateSubmitButtonText();
  }

  // Colores para los tags
  function getTagClass(tipo) {
      switch (tipo) {
          case "Noticia": return "is-info is-light";
          case "Evento": return "is-success is-light";
          case "Voluntariado": return "is-warning is-light";
          default: return "is-light";
      }
  }

  // Eliminar eventos
  contenedor.addEventListener('click', function(e) {
      if (e.target.classList.contains('fa-trash')) {
          if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
              e.target.closest('.column.is-half').remove();
          }
      }
  });
});
document.addEventListener("DOMContentLoaded", () => {
    const filtroTipo = document.getElementById("disponibilidad");
    const filtroFechaInicio = document.getElementById("fechaInicio");
    const filtroFechaFin = document.getElementById("fechaFin");
    const filtroNombre = document.getElementById("ubicacion");
    const btnBuscar = document.querySelector("button:has(.fa-search)");
    const btnLimpiar = document.querySelector("button:has(.fa-undo)");
    const tarjetas = document.querySelectorAll("#contenedor-cards .iniciativa");

    btnBuscar.addEventListener("click", () => {
        console.log("Filtrando...");
        const tipoSeleccionado = filtroTipo.value.toLowerCase().trim();
        const fechaInicio = filtroFechaInicio.value;
        const fechaFin = filtroFechaFin.value;
        const nombreBuscado = filtroNombre.value.toLowerCase().trim();

        tarjetas.forEach(tarjeta => {
            const tipoTarjeta = tarjeta.querySelector(".tag").innerText.trim().toLowerCase();
            const nombreTarjeta = tarjeta.querySelector(".nombre-proyecto").innerText.trim().toLowerCase();
            let mostrar = true;

            if (tipoSeleccionado && tipoSeleccionado !== tipoTarjeta) {
                mostrar = false;
            }
            if (nombreBuscado && !nombreTarjeta.includes(nombreBuscado)) {
                mostrar = false;
            }

            tarjeta.style.display = mostrar ? "block" : "none";
        });
    });

    btnLimpiar.addEventListener("click", () => {
        filtroTipo.value = "";
        filtroFechaInicio.value = "";
        filtroFechaFin.value = "";
        filtroNombre.value = "";
        tarjetas.forEach(tarjeta => tarjeta.style.display = "block");
    });
});
    