document.addEventListener('DOMContentLoaded', () => { 
  const tabs = document.querySelectorAll('.tabs li');
  const tabContents = document.querySelectorAll('.tab-content');
  
  const tablaOrganizacionesSolicitudes = document.querySelector('#organizaciones .table:first-child tbody');
  const tablaOrganizacionesRegistradas = document.querySelector('#organizaciones-registradas');

  const tablaVoluntariosSolicitudes = document.querySelector('#voluntarios .table:first-child tbody');
  const tablaVoluntariosRegistrados = document.querySelectorAll('#voluntarios .table tbody')[1] || null;

  const tablaActividadesSolicitudes = document.querySelector('#actividades .table:first-child tbody');
  const tablaActividadesRegistradas = document.querySelector('#actividades .table:last-child tbody') || null;

  function mostrarPestana(tabId) {
    tabs.forEach(tab => tab.classList.remove('is-active'));
    tabContents.forEach(content => content.classList.remove('is-active'));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('is-active');
    document.getElementById(tabId).classList.add('is-active');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      mostrarPestana(tabId);
    });
  });

  function prepararTablaSolicitudes(tabla, tipo) {
    if (!tabla) return;

    tabla.querySelectorAll('tr').forEach(row => {
      const accionesCell = row.querySelector('td:last-child');
      if (accionesCell) {
        accionesCell.innerHTML = `
          <button class="button is-small is-success btn-aceptar-${tipo}"><i class="fa-solid fa-check"></i></button>
          <button class="button is-small is-danger btn-rechazar-${tipo}"><i class="fa-solid fa-xmark"></i></button>
        `;
      }
    });
  }

  function manejarEventosAceptacionYRechazo(tabla, tablaDestino, tipo, columnas, estadoTexto) {
    if (!tabla) return;

    tabla.addEventListener('click', (event) => {
      const aceptar = event.target.closest(`.btn-aceptar-${tipo}`);
      const rechazar = event.target.closest(`.btn-rechazar-${tipo}`);
      const row = event.target.closest('tr');
      if (!row) return;

      if (aceptar) {
        const newRow = tablaDestino.insertRow();
        newRow.innerHTML = columnas.map(i => `<td>${row.cells[i].innerHTML}</td>`).join('') +
        `<td><span class="tag is-success">${estadoTexto}</span></td>
         <td>
           <button class="button is-small is-warning"><i class="fa-solid fa-pen-to-square"></i></button>
           <button class="button is-small is-danger"><i class="fa-solid fa-trash"></i></button>
         </td>`;
      
        row.remove();
      } else if (rechazar) {
        row.remove();
      }
    });
  }

  // Organizaciones
  if (tablaOrganizacionesSolicitudes && tablaOrganizacionesRegistradas) {
    prepararTablaSolicitudes(tablaOrganizacionesSolicitudes, 'org');
    manejarEventosAceptacionYRechazo(tablaOrganizacionesSolicitudes, tablaOrganizacionesRegistradas, 'org', [0,1,2,3], 'Aceptada');
  }

  if (tablaVoluntariosSolicitudes && tablaVoluntariosRegistrados) {
    prepararTablaSolicitudes(tablaVoluntariosSolicitudes, 'vol');
    manejarEventosAceptacionYRechazo(tablaVoluntariosSolicitudes, tablaVoluntariosRegistrados, 'vol', [0,1,2,3], 'Aceptado');
  }

  if (tablaActividadesSolicitudes && tablaActividadesRegistradas) {
    prepararTablaSolicitudes(tablaActividadesSolicitudes, 'act');
    manejarEventosAceptacionYRechazo(tablaActividadesSolicitudes, tablaActividadesRegistradas, 'act', [0,1,2,3], 'Activa');
  }
});
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-asignar').addEventListener('click', function () {
    const voluntarioSelect = document.getElementById('select-voluntario');
    const voluntariadoSelect = document.getElementById('select-voluntariado');
    
    const voluntario = voluntarioSelect.value;
    const voluntariado = voluntariadoSelect.value;

    if (!voluntario || !voluntariado) {
      alert("Selecciona un voluntario y un voluntariado.");
      return;
    }

    const tabla = document.getElementById('tabla-asignaciones').getElementsByTagName('tbody')[0];
    const filas = tabla.getElementsByTagName('tr');

    // Verificar si ya existe la asignación
    for (let i = 0; i < filas.length; i++) {
      const v = filas[i].cells[0].innerText.trim();
      const a = filas[i].cells[1].innerText.trim();
      if (v === voluntario && a === voluntariado) {
        alert("Esta asignación ya existe.");
        return;
      }
    }

    // Crear nueva fila
    const nuevaFila = tabla.insertRow();
    nuevaFila.insertCell(0).innerText = voluntario;
    nuevaFila.insertCell(1).innerText = voluntariado;
    nuevaFila.insertCell(2).innerText = obtenerOrganizacion(voluntariado);
    nuevaFila.insertCell(3).innerText = obtenerFechaHoy();
    const celdaEliminar = nuevaFila.insertCell(4);
    const botonEliminar = document.createElement('button');
    botonEliminar.innerText = "Eliminar";
    botonEliminar.className = "button is-danger is-small";
    botonEliminar.onclick = function () {
      tabla.deleteRow(nuevaFila.rowIndex - 1);
    };
    celdaEliminar.appendChild(botonEliminar);
  });

  function obtenerOrganizacion(nombreActividad) {
    if (nombreActividad.includes("Puzle")) return "Navarra + Voluntaria";
    if (nombreActividad.includes("Mayores")) return "Cruz Roja";
    return "Desconocida";
  }

  function obtenerFechaHoy() {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, '0');
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const año = hoy.getFullYear();
    return `${dia}/${mes}/${año}`;
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modal-editar');
  const btnCerrar = document.getElementById('btn-cerrar');
  const btnGuardar = document.getElementById('btn-guardar');
  
  document.querySelectorAll('.btn-editar').forEach(button => {
    button.addEventListener('click', (event) => {
      const row = event.target.closest('tr');
      const cells = row.cells;

      document.getElementById('input-nombre').value = cells[0].innerText;
      document.getElementById('input-descripcion').value = cells[1].innerText;
      document.getElementById('input-fecha').value = cells[2].innerText;
      document.getElementById('input-organizacion').value = cells[3].innerText;

      modal.classList.add('is-active');
      
      btnGuardar.onclick = function () {
        cells[0].innerText = document.getElementById('input-nombre').value;
        cells[1].innerText = document.getElementById('input-descripcion').value;
        cells[2].innerText = document.getElementById('input-fecha').value;
        cells[3].innerText = document.getElementById('input-organizacion').value;

        modal.classList.remove('is-active');
      };
    });
  });

  btnCerrar.addEventListener('click', () => {
    modal.classList.remove('is-active');
  });
});

