document.addEventListener('DOMContentLoaded', function () {
    const inputBusqueda = document.getElementById('busquedaNombre');
    const breadcrumb = document.querySelector('.breadcrumb ul');
    const iniciativas = document.querySelectorAll('.iniciativa.box, .iniciativa .box');

    const filtrosActivos = {
        nombre: ''
    };

    function actualizarBreadcrumb() {
        // Primero vaciamos el breadcrumb
        while (breadcrumb.firstChild) {
            breadcrumb.removeChild(breadcrumb.firstChild);
        }

        // Solo añadimos tags si el filtro está activo
        if (filtrosActivos.nombre) {
            agregarTag(filtrosActivos.nombre);
        }
    }

    function agregarTag(texto) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const span = document.createElement('span');

        span.className = 'tag is-info is-light';
        span.textContent = texto;

        a.href = '#';
        a.appendChild(span);
        a.addEventListener('click', function (e) {
            e.preventDefault();
            eliminarFiltro();
        });

        li.appendChild(a);
        breadcrumb.appendChild(li);
    }

    function eliminarFiltro() {
        filtrosActivos.nombre = '';
        inputBusqueda.value = '';
        aplicarFiltros();
        actualizarBreadcrumb();
    }

    function aplicarFiltros() {
        filtrosActivos.nombre = inputBusqueda.value.toLowerCase();

        iniciativas.forEach(iniciativa => {
            const nombre = iniciativa.querySelector('.nombre-proyecto')?.textContent.toLowerCase() || '';

            const coincideNombre = !filtrosActivos.nombre || nombre.includes(filtrosActivos.nombre);

            if (coincideNombre) {
                iniciativa.style.display = '';
            } else {
                iniciativa.style.display = 'none';
            }
        });

        // Actualizamos el breadcrumb después de aplicar los filtros
        actualizarBreadcrumb();
    }

    // Se añade el listener para el input
    inputBusqueda?.addEventListener('input', aplicarFiltros);
});
