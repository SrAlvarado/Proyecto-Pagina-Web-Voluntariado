document.addEventListener('DOMContentLoaded', function () {
    function filtrar() {
        const nombreBusqueda = document.getElementById('ubicacion').value.toLowerCase();
        const tipoSeleccionado = document.getElementById('disponibilidad').value.toLowerCase();
        const columnas = document.querySelectorAll('.column.is-half');

        columnas.forEach(columna => {
            const iniciativa = columna.querySelector('.iniciativa.box');
            const nombreProyecto = iniciativa.querySelector('.nombre-proyecto').textContent.toLowerCase();
            const tipo = iniciativa.querySelector('span.tag')?.textContent.toLowerCase() || '';

            const coincideNombre = nombreProyecto.includes(nombreBusqueda);
            const coincideTipo = tipoSeleccionado === '' || tipo.includes(tipoSeleccionado);

            if (coincideNombre && coincideTipo) {
                columna.classList.remove('is-hidden');
            } else {
                columna.classList.add('is-hidden');
            }
        });
    }

    function limpiarFiltros() {
        document.getElementById('ubicacion').value = '';
        document.getElementById('disponibilidad').value = '';
        document.querySelectorAll('.column.is-half').forEach(columna => {
            columna.classList.remove('is-hidden');
        });
    }

    function limpiarFiltros() {
        const inputNombre = document.getElementById('ubicacion');
        inputNombre.value = '';
        document.querySelectorAll('.column.is-half').forEach(columna => {
            columna.classList.remove('is-hidden');
        });
    }
    

    document.getElementById('ubicacion')?.addEventListener('input', filtrar);
    document.getElementById('disponibilidad')?.addEventListener('change', filtrar);

    document.querySelector('.button.is-info.is-light')?.addEventListener('click', filtrar);
    document.querySelector('.button.is-light')?.addEventListener('click', limpiarFiltros);
});
