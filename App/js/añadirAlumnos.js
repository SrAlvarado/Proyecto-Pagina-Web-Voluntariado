document.addEventListener('DOMContentLoaded', function() {
    const buscarAlumnos = document.getElementById('buscarAlumnos');
    const selectAlumnos = document.getElementById('añadirAlumnos');
    const alumnosContainer = document.getElementById('alumnosSeleccionados');
  
    // Añadir alumno al seleccionar
    selectAlumnos.addEventListener('change', function() {
        if (!this.value) return;
        
        const option = this.options[this.selectedIndex];
        const alumnoId = this.value;
        const alumnoNombre = option.textContent;
        
        // Verificar si ya existe el alumno en las tags
        if (document.querySelector(`#alumnosSeleccionados .tag[data-id="${alumnoId}"]`)) {
            this.value = '';
            return;
        }
        
        // Crear tag
        const tag = document.createElement('span');
        tag.className = 'tag is-info is-light mb-2 mr-2';
        tag.dataset.id = alumnoId;
        tag.innerHTML = `${alumnoNombre}<button class="delete is-small"></button>`;
        
        // Añadir evento para eliminar
        tag.querySelector('.delete').addEventListener('click', function() {
            tag.remove();
        });
        
        // Añadir al contenedor
        alumnosContainer.appendChild(tag);
        
        // Resetear select
        this.value = '';
    });
});