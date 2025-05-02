// Variables para controlar el estado del modal
let currentFieldId = '';
let isTextarea = false;
let originalValue = '';

// Elementos del DOM
const editModal = document.getElementById('editModal');
const modalFieldName = document.getElementById('modalFieldName');
const modalFieldLabel = document.getElementById('modalFieldLabel');
const modalFieldInput = document.getElementById('modalFieldInput');
const modalFieldTextarea = document.getElementById('modalFieldTextarea');
const saveButton = document.getElementById('saveButton');
const cancelButton = document.getElementById('cancelButton');
const closeModalButton = document.getElementById('closeModalButton');
const modalBackground = document.querySelector('.modal-background');

// Función para abrir el modal
function openModal(fieldId, fieldName) {
  currentFieldId = fieldId;
  const fieldElement = document.getElementById(fieldId);
  originalValue = fieldElement.textContent.trim();
  
  // Configurar el modal
  modalFieldName.textContent = fieldName;
  modalFieldLabel.textContent = fieldName;
  
  // Determinar si usamos input o textarea
  isTextarea = fieldId === 'biografiaUsuario';
  
  // Mostrar el control adecuado
  if (isTextarea) {
    modalFieldInput.classList.add('is-hidden');
    modalFieldTextarea.classList.remove('is-hidden');
    modalFieldTextarea.value = originalValue;
  } else {
    modalFieldInput.classList.remove('is-hidden');
    modalFieldTextarea.classList.add('is-hidden');
    modalFieldInput.value = originalValue;
  }
  
  // Mostrar el modal
  editModal.classList.add('is-active');
}

// Función para cerrar el modal
function closeModal() {
  editModal.classList.remove('is-active');
}

// Función para guardar los cambios
function saveChanges() {
  const fieldElement = document.getElementById(currentFieldId);
  let newValue = isTextarea ? modalFieldTextarea.value : modalFieldInput.value;
  
  // Actualizar el campo en la página
  fieldElement.textContent = newValue;
  
  // Aquí podrías agregar código para guardar los cambios en el servidor
  console.log(`Campo ${currentFieldId} actualizado a: ${newValue}`);
  
  closeModal();
}

// Inicialización de eventos
function initEditProfile() {
  // Asignar eventos a los iconos de edición
  document.querySelectorAll('.edit-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const fieldId = this.getAttribute('data-field-id');
      const fieldName = this.getAttribute('data-field-name');
      openModal(fieldId, fieldName);
    });
  });

  // Botón Guardar
  saveButton.addEventListener('click', saveChanges);

  // Botón Cancelar
  cancelButton.addEventListener('click', closeModal);

  // Botón Cerrar (X)
  closeModalButton.addEventListener('click', closeModal);

  // Clic en el fondo oscuro
  modalBackground.addEventListener('click', closeModal);

  // Cerrar con tecla ESC
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && editModal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', initEditProfile);