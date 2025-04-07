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
});