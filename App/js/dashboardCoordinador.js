document.addEventListener('DOMContentLoaded', () => {
    // Datos simulados
    const datosIniciales = {
      organizaciones: [
        { id: 1, nombre: 'Org A', estado: 'pendiente' },
        { id: 2, nombre: 'Org B', estado: 'pendiente' }
      ],
      voluntarios: [
        { id: 1, nombre: 'Vol A', estado: 'pendiente' },
        { id: 2, nombre: 'Vol B', estado: 'pendiente' }
      ],
      actividades: [
        { id: 1, nombre: 'Act A', estado: 'pendiente' },
        { id: 2, nombre: 'Act B', estado: 'pendiente' }
      ],
      asignaciones: []
    };
  
    // Cargar o inicializar datos en localStorage
    const datos = JSON.parse(localStorage.getItem('datos')) || datosIniciales;
    guardarDatos();
  
    function guardarDatos() {
      localStorage.setItem('datos', JSON.stringify(datos));
    }
  
    // Tabs
    document.querySelectorAll('.tabs li').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tabs li').forEach(t => t.classList.remove('is-active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('is-active'));
  
        tab.classList.add('is-active');
        document.getElementById(tab.getAttribute('data-tab')).classList.add('is-active');
      });
    });
  
    // Renderizado
    function renderOrganizaciones() {
      const cont = document.getElementById('lista-organizaciones');
      cont.innerHTML = '';
      datos.organizaciones.forEach(org => {
        if (org.estado === 'pendiente') {
          cont.innerHTML += `
            <div class="buttons">
              <span>${org.nombre}</span>
              <button class="button is-success" onclick="aceptar('organizaciones', ${org.id})">Aceptar</button>
              <button class="button is-danger" onclick="rechazar('organizaciones', ${org.id})">Rechazar</button>
            </div>
          `;
        }
      });
    }
  
    function renderVoluntarios() {
      const cont = document.getElementById('lista-voluntarios');
      cont.innerHTML = '';
      const select = document.getElementById('select-voluntario');
      select.innerHTML = '';
      datos.voluntarios.forEach(vol => {
        if (vol.estado === 'pendiente') {
          cont.innerHTML += `
            <div class="buttons">
              <span>${vol.nombre}</span>
              <button class="button is-success" onclick="aceptar('voluntarios', ${vol.id})">Aceptar</button>
              <button class="button is-danger" onclick="rechazar('voluntarios', ${vol.id})">Rechazar</button>
            </div>
          `;
        }
        if (vol.estado === 'aceptado') {
          select.innerHTML += `<option value="${vol.id}">${vol.nombre}</option>`;
        }
      });
    }
  
    function renderActividades() {
      const cont = document.getElementById('lista-actividades');
      cont.innerHTML = '';
      const select = document.getElementById('select-voluntariado');
      select.innerHTML = '';
      datos.actividades.forEach(act => {
        if (act.estado === 'pendiente') {
          cont.innerHTML += `
            <div class="buttons">
              <span>${act.nombre}</span>
              <button class="button is-success" onclick="aceptar('actividades', ${act.id})">Aceptar</button>
              <button class="button is-danger" onclick="rechazar('actividades', ${act.id})">Rechazar</button>
            </div>
          `;
        }
        if (act.estado === 'aceptado') {
          select.innerHTML += `<option value="${act.id}">${act.nombre}</option>`;
        }
      });
    }
  
    function renderAsignaciones() {
      const cont = document.getElementById('lista-asignaciones');
      cont.innerHTML = '';
      datos.asignaciones.forEach((a, i) => {
        const vol = datos.voluntarios.find(v => v.id == a.voluntarioId)?.nombre;
        const act = datos.actividades.find(v => v.id == a.voluntariadoId)?.nombre;
        cont.innerHTML += `
          <div class="buttons">
            <span>${vol} ➜ ${act}</span>
            <button class="button is-danger" onclick="eliminarAsignacion(${i})">Eliminar</button>
          </div>
        `;
      });
    }
  
    // Acciones
    window.aceptar = (tipo, id) => {
      const item = datos[tipo].find(e => e.id === id);
      item.estado = 'aceptado';
      guardarDatos();
      mostrarNotificacion('success', `${tipo.slice(0, -1)} aceptado`);
      renderAll();
    };
  
    window.rechazar = (tipo, id) => {
      const item = datos[tipo].find(e => e.id === id);
      item.estado = 'rechazado';
      guardarDatos();
      mostrarNotificacion('danger', `${tipo.slice(0, -1)} rechazado`);
      renderAll();
    };
  
    window.eliminarAsignacion = (index) => {
      if (confirm('¿Eliminar asignación?')) {
        datos.asignaciones.splice(index, 1);
        guardarDatos();
        mostrarNotificacion('success', 'Asignación eliminada');
        renderAsignaciones();
      }
    };
  
    document.getElementById('btn-asignar').addEventListener('click', () => {
      const voluntarioId = parseInt(document.getElementById('select-voluntario').value);
      const voluntariadoId = parseInt(document.getElementById('select-voluntariado').value);
      if (!voluntarioId || !voluntariadoId) {
        return mostrarNotificacion('warning', 'Selecciona ambos elementos');
      }
      datos.asignaciones.push({ voluntarioId, voluntariadoId });
      guardarDatos();
      mostrarNotificacion('success', 'Asignación creada');
      renderAsignaciones();
    });
  
    // Notificación
    function mostrarNotificacion(tipo, mensaje) {
      const noti = document.createElement('div');
      noti.className = `notification is-${tipo}`;
      noti.innerHTML = `<button class="delete"></button>${mensaje}`;
      Object.assign(noti.style, {
        position: 'fixed', top: '20px', right: '20px', zIndex: 1000
      });
      noti.querySelector('.delete').onclick = () => noti.remove();
      document.body.appendChild(noti);
      setTimeout(() => noti.remove(), 5000);
    }
  
    function renderAll() {
      renderOrganizaciones();
      renderVoluntarios();
      renderActividades();
      renderAsignaciones();
    }
  
    renderAll();
  });
  