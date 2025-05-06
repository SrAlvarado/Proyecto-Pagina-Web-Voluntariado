document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.btn-voluntario').forEach(button => {
        button.addEventListener('click', function () {
            if (this.classList.contains('is-success')) {
                this.classList.remove('is-success');
                this.classList.add('is-danger');
                this.textContent = 'Desapuntarme'; 
            } else if (this.classList.contains('is-danger')) {
                this.classList.remove('is-danger');
                this.classList.add('is-success');
                this.textContent = 'Apuntarme'; 
            }
        });
    });
});