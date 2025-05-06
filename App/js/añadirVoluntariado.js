document.addEventListener('DOMContentLoaded', function() {
  // Mapeo de ODS a sus metas correspondientes
  const odsMetas = {
    '01': ['Meta 1.1', 'Meta 1.2', 'Meta 1.3', 'Meta 1.4', 'Meta 1.5'],
    '02': ['Meta 2.1', 'Meta 2.2', 'Meta 2.3', 'Meta 2.4', 'Meta 2.5'],
    '03': ['Meta 3.1', 'Meta 3.2', 'Meta 3.3', 'Meta 3.4', 'Meta 3.5'],
    '04': ['Meta 4.1', 'Meta 4.2', 'Meta 4.3', 'Meta 4.4', 'Meta 4.5', 'Meta 4.6', 'Meta 4.7', 'Meta 4.a', 'Meta 4.b'],
    '05': ['Meta 5.1', 'Meta 5.2', 'Meta 5.3', 'Meta 5.4', 'Meta 5.5', 'Meta 5.6'],
    '06': ['Meta 6.1', 'Meta 6.2', 'Meta 6.3', 'Meta 6.4', 'Meta 6.5', 'Meta 6.6'],
    '07': ['Meta 7.1', 'Meta 7.2', 'Meta 7.3'],
    '08': ['Meta 8.1', 'Meta 8.2', 'Meta 8.3', 'Meta 8.4', 'Meta 8.5', 'Meta 8.6', 'Meta 8.7', 'Meta 8.8', 'Meta 8.9', 'Meta 8.10'],
    '09': ['Meta 9.1', 'Meta 9.2', 'Meta 9.3', 'Meta 9.4', 'Meta 9.5'],
    '10': ['Meta 10.1', 'Meta 10.2', 'Meta 10.3', 'Meta 10.4', 'Meta 10.5', 'Meta 10.6', 'Meta 10.7'],
    '11': ['Meta 11.1', 'Meta 11.2', 'Meta 11.3', 'Meta 11.4', 'Meta 11.5', 'Meta 11.6', 'Meta 11.7'],
    '12': ['Meta 12.1', 'Meta 12.2', 'Meta 12.3', 'Meta 12.4', 'Meta 12.5', 'Meta 12.6', 'Meta 12.7', 'Meta 12.8'],
    '13': ['Meta 13.1', 'Meta 13.2', 'Meta 13.3'],
    '16': ['Meta 16.1', 'Meta 16.2', 'Meta 16.3', 'Meta 16.4', 'Meta 16.5', 'Meta 16.6', 'Meta 16.7', 'Meta 16.8', 'Meta 16.9', 'Meta 16.10'],
    '17': ['Meta 17.1', 'Meta 17.2', 'Meta 17.3', 'Meta 17.4', 'Meta 17.5', 'Meta 17.6', 'Meta 17.7', 'Meta 17.8', 'Meta 17.9', 'Meta 17.10', 'Meta 17.11', 'Meta 17.12', 'Meta 17.13', 'Meta 17.14', 'Meta 17.15', 'Meta 17.16', 'Meta 17.17', 'Meta 17.18', 'Meta 17.19']
  };

  // Elementos del DOM
  const odsSelect = document.getElementById('ods');
  const metasSelect = document.getElementById('metas');
  const odsSeleccionadosContainer = document.getElementById('ods-seleccionados');

  // Actualizar metas cuando se selecciona un ODS
  odsSelect.addEventListener('change', function() {
    const selectedOds = this.value;
    metasSelect.innerHTML = '<option value="">-Meta-</option>';
    
    if (selectedOds && odsMetas[selectedOds]) {
      odsMetas[selectedOds].forEach(meta => {
        const option = document.createElement('option');
        option.value = meta;
        option.textContent = meta;
        metasSelect.appendChild(option);
      });
    }
  });

  // Añadir ODS y Meta automáticamente al seleccionar una meta
  metasSelect.addEventListener('change', function() {
    const odsValue = odsSelect.value;
    const metaValue = this.value;
    
    if (!odsValue || !metaValue) return;
    
    // Crear el tag
    const tag = document.createElement('span');
    tag.className = 'tag is-info is-light mb-2 mr-2';
    tag.innerHTML = `
      <strong>ODS ${odsValue}:</strong> ${metaValue}
      <button class="delete is-small"></button>
    `;
    
    // Añadir evento para eliminar
    tag.querySelector('.delete').addEventListener('click', function() {
      tag.remove();
    });
    
    // Añadir al contenedor
    odsSeleccionadosContainer.appendChild(tag);
    
    // Resetear selects
    odsSelect.value = '';
    metasSelect.innerHTML = '<option value="">-Meta-</option>';
  });
});document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#anadirVoluntariado form');
    const voluntariadosContainer = document.querySelector('.iniciativa.mb-4');
    const odsSeleccionadosDiv = document.getElementById('ods-seleccionados');

    // Manejador del evento submit del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const organizacion = document.getElementById('organizadores').value;
        const sector = document.getElementById('sectores').selectedOptions[0].parentElement.label;
        const curso = document.getElementById('curso').value;
        const fechaInicio = document.getElementById('fecha-inicio').value;
        const fechaFin = document.getElementById('fecha-fin').value;
        const diasSeleccionados = Array.from(document.querySelectorAll('input[name="dias"]:checked')).map(checkbox => checkbox.value);
        const horaInicio = document.getElementById('hora-inicio').value;
        const horaFin = document.getElementById('hora-fin').value;
        const informacion = document.getElementById('informacion').value;

        // Obtener ODS seleccionados correctamente
        const odsTags = Array.from(odsSeleccionadosDiv.querySelectorAll('.tag')).map(tag => {
            return tag.textContent.trim().split(' ')[0]; // Solo el número del ODS
        });

        // Mapeo de ODS a imágenes
        const odsImages = {
            '01': '01finpobreza.png',
            '02': '02hambrecero.png',
            '03': '03saludybienestar.png',
            '04': '04educacion.png',
            '05': '05igualdad.png',
            '07': '07energia.png',
            '08': '08trabajo.png',
            '09': '09industria.png',
            '10': '10reduccion.png',
            '11': '11ciudades.png',
            '12': '12produccion.png',
            '13': '13accion.png',
            '14': '14vida.png',
            '15': '15vida.png',
            '16': '16paz.png',
            '17': '17alianzas.png'
        };

        // Generar HTML para los iconos de ODS
        let odsIconsHTML = '';
        odsTags.forEach(odsNum => {
            if (odsImages[odsNum]) {
                odsIconsHTML += `<img class="icono-dimension" src="./../../img/${odsImages[odsNum]}" alt="ODS${odsNum}">`;
            }
        });

        // Crear el HTML del nuevo voluntariado
        const nuevoVoluntariado = document.createElement('div');
        nuevoVoluntariado.className = 'iniciativa box';
        nuevoVoluntariado.innerHTML = `
            <div class="detalles-iniciativa columns is-multiline">
                <div class="column is-5"><strong class="nombre-proyecto negrita">${nombre}<br><br>Actividades</strong>
                    <br>
                    <p>${informacion.substring(0, 100)}${informacion.length > 100 ? '...' : ''}</p>
                </div>
                <div class="column is-1 dimension-social">${sector}</div>
                <div class="column is-2">
                    ${odsIconsHTML}
                </div>
                <div class="column is-1">${curso}</div>
                <div class="column is-2">Apuntados: 0</div>
                <div class="column is-1 has-text-centered">
                    <i class="fa-solid fa-pen-to-square is-warning btn-editar"></i>
                    <i class="fa-solid fa-trash is-danger btn-eliminar"></i>
                </div>
            </div>
            <details>
                <summary>Información adicional</summary>
                <table class="table is-fullwidth">
                    <tbody>
                        <tr>
                            <td class="icono-detalle has-text-centered"><i class="fa-solid fa-graduation-cap"></i></td>
                            <td class="columna-detalle-dato">${curso}</td>
                        </tr>
                        <tr>
                            <td class="icono-detalle has-text-centered"><i class="fa-solid fa-handshake"></i></td>
                            <td class="columna-detalle-dato">${organizacion}</td>
                        </tr>
                        <tr>
                            <td class="icono-detalle has-text-centered"><i class="fa-solid fa-clock"></i></td>
                            <td class="columna-detalle-dato">${diasSeleccionados.join(', ')} de ${horaInicio} a ${horaFin}</td>
                        </tr>
                        <tr>
                            <td class="icono-detalle has-text-centered"><i class="fa-solid fa-calendar-days"></i></td>
                            <td class="columna-detalle-dato">${new Date(fechaInicio).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td class="icono-detalle has-text-centered"><i class="fa-regular fa-calendar-check"></i></td>
                            <td class="columna-detalle-dato">${new Date(fechaFin).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td class="icono-detalle has-text-centered"><i class="fa-solid fa-list-check"></i></td>
                            <td class="columna-detalle-dato">${informacion}</td>
                        </tr>
                    </tbody>
                </table>
            </details>
        `;

        // Añadir el nuevo voluntariado al contenedor
        voluntariadosContainer.prepend(nuevoVoluntariado);

        // Cerrar el modal y limpiar
        document.querySelector('#anadirVoluntariado .close-btn').click();
        form.reset();
        odsSeleccionadosDiv.innerHTML = ''; // Limpiar ODS seleccionados
    });

    // Manejar selección de ODS
    document.getElementById('ods').addEventListener('change', function() {
        const odsSelect = this;
        if (odsSelect.value && !document.querySelector(`#ods-seleccionados .tag[data-value="${odsSelect.value}"]`)) {
            const odsText = odsSelect.options[odsSelect.selectedIndex].text;
            const tag = document.createElement('span');
            tag.className = 'tag is-info is-light';
            tag.textContent = odsText;
            tag.dataset.value = odsSelect.value;
            odsSeleccionadosDiv.appendChild(tag);
        }
    });
});