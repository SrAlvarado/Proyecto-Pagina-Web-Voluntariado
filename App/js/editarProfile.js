// Variables para controlar qué campo estamos editando
let currentFieldId = '';
let isTextarea = false;

// Función para abrir el modal de edición
function openModal(fieldId, fieldName) {
  currentFieldId = fieldId;
  const fieldElement = document.getElementById(fieldId);
  const value = fieldElement.textContent.trim();
  
  // Configurar el modal
  document.getElementById('modalFieldName').textContent = fieldName;
  document.getElementById('modalFieldLabel').textContent = fieldName;
  
  // Determinar si usamos input o textarea
  isTextarea = fieldId === 'biografiaUsuario';
  
  // Mostrar el control adecuado
  const input = document.getElementById('modalFieldInput');
  const textarea = document.getElementById('modalFieldTextarea');
  
  if (isTextarea) {
    input.classList.add('is-hidden');
    textarea.classList.remove('is-hidden');
    textarea.value = value;
  } else {
    input.classList.remove('is-hidden');
    textarea.classList.add('is-hidden');
    input.value = value;
  }
  
  // Mostrar el modal
  document.getElementById('editModal').classList.add('is-active');
}

// Función para cerrar el modal
function closeModal() {
  document.getElementById('editModal').classList.remove('is-active');
}

// Función para guardar los cambios
function saveChanges() {
  const fieldElement = document.getElementById(currentFieldId);
  let newValue;
  
  if (isTextarea) {
    newValue = document.getElementById('modalFieldTextarea').value;
  } else {
    newValue = document.getElementById('modalFieldInput').value;
  }
  
  // Actualizar el campo en la página
  fieldElement.textContent = newValue;
  
  // Aquí podrías agregar código para guardar los cambios en el servidor
  // mediante una llamada AJAX o similar
  saveToServer(currentFieldId, newValue);
  
  closeModal();
}

// Función para guardar los cambios en el servidor (ejemplo)
function saveToServer(fieldId, value) {
  // Aquí iría la lógica para enviar los datos al servidor
  console.log(`Guardando ${fieldId}: ${value}`);
  // Ejemplo con Fetch API:
  /*
  fetch('/api/update-profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      field: fieldId,
      value: value
    })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  */
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Cerrar modal al hacer clic en el fondo oscuro
  document.querySelector('.modal-background').addEventListener('click', closeModal);
  
  // Cerrar modal con la tecla ESC
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
  
  // Asignar eventos a los iconos de edición (por si se añaden dinámicamente)
  document.querySelectorAll('.edit-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const fieldId = this.getAttribute('data-field-id');
      const fieldName = this.getAttribute('data-field-name');
      openModal(fieldId, fieldName);
    });
  });
});