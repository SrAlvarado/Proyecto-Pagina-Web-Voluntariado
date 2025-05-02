// Configuración del modal de edición
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si todos los elementos necesarios existen
    if (!document.getElementById('editModal')) {
      console.error('Modal no encontrado en el DOM');
      return;
    }
  
    // Mapeo de campos editables
    const editableFields = {
      'nombreUsuario': { type: 'text', name: 'Nombre' },
      'usernameUsuario': { type: 'text', name: 'Nombre de usuario' },
      'correoUsuario': { type: 'text', name: 'Correo Electrónico' },
      'telefonoUsuario': { type: 'text', name: 'Teléfono' },
      'ubicacionUsuario': { type: 'text', name: 'Ubicación' },
      'biografiaUsuario': { type: 'textarea', name: 'Biografía' },
      'twitterUsuario': { type: 'text', name: 'Twitter' },
      'linkedinUsuario': { type: 'text', name: 'LinkedIn' }
    };
  
    // Variables de estado
    let currentFieldId = '';
  
    // Función para abrir el modal
    function openModal(fieldId) {
      const fieldConfig = editableFields[fieldId];
      if (!fieldConfig) {
        console.error('Configuración no encontrada para:', fieldId);
        return;
      }
  
      const fieldElement = document.getElementById(fieldId);
      if (!fieldElement) {
        console.error('Elemento no encontrado:', fieldId);
        return;
      }
  
      currentFieldId = fieldId;
      const value = fieldElement.textContent.trim();
  
      // Configurar el modal
      document.getElementById('modalFieldName').textContent = fieldConfig.name;
      document.getElementById('modalFieldLabel').textContent = fieldConfig.name;
  
      // Mostrar el control adecuado
      const input = document.getElementById('modalFieldInput');
      const textarea = document.getElementById('modalFieldTextarea');
  
      if (fieldConfig.type === 'textarea') {
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
  
    // Función para guardar cambios
    function saveChanges() {
      const fieldElement = document.getElementById(currentFieldId);
      if (!fieldElement) return;
  
      const fieldConfig = editableFields[currentFieldId];
      let newValue;
  
      if (fieldConfig.type === 'textarea') {
        newValue = document.getElementById('modalFieldTextarea').value;
      } else {
        newValue = document.getElementById('modalFieldInput').value;
      }
  
      fieldElement.textContent = newValue;
      closeModal();
    }
  
    // Asignar eventos a los iconos de edición
    document.querySelectorAll('.edit-icon').forEach(icon => {
      icon.addEventListener('click', function() {
        const fieldId = this.getAttribute('data-field-id');
        if (editableFields[fieldId]) {
          openModal(fieldId);
        } else {
          console.error('Campo no configurado:', fieldId);
        }
      });
    });
  
    // Asignar eventos a los botones del modal
    document.getElementById('saveButton')?.addEventListener('click', saveChanges);
    document.getElementById('cancelButton')?.addEventListener('click', closeModal);
    document.getElementById('closeModalButton')?.addEventListener('click', closeModal);
    document.querySelector('.modal-background')?.addEventListener('click', closeModal);
  
    // Cerrar modal con ESC
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && document.getElementById('editModal').classList.contains('is-active')) {
        closeModal();
      }
    });
  
    console.log('Sistema de edición de perfil inicializado correctamente');
  });