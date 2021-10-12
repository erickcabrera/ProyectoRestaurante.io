window.onload = () => {

    //utilizamos propagación de evento para que todos los botones de cantidad de personas
    //respondan a un evento click
    document.querySelector(".inputButtons").addEventListener('click', (e) => {
        e.preventDefault();
        //validamos que el elemento al cual se dio click sea un botón de cantidad
        if (e.target.classList.contains('btnCant')) {
            //limipiamos por si algún botón ya estaba activo
            for (const iterator of document.getElementsByClassName('btnCant')) {
                iterator.classList.remove('active');
            }
            //se activa el nuevo botón
            e.target.classList.add('active');
        }
    });

    //evento click de botón "Hacer reservación"
    document.querySelector(".reservation-btn").addEventListener('click', () => {
        //extraemos los datos del formulario
        const formData = new FormData(document.getElementById("reservation-form-data"))

        //extraemos el dato de la cantidad de personas
        for (const iterator of document.getElementsByClassName('btnCant')) {
            if(iterator.classList.contains('active')) {
                //una vez encontrado lo añadimos al formData
                formData.append('cantidad', iterator.value)
            }
        }

        //llamada a función para guardar los datos
        addNewReservation(formData)

        //llamada a función para limpiar formulario
        cleanForm(document.getElementById("reservation-form-data"));
    });
}

function addNewReservation(data) {
    const date = new Date(data.get('fecha'));
    const formatToDate = date.toLocaleDateString('en-US');

    let templete = `
        <div class="reservation-item">
            <img src="../img/restaurantfoodicon.jpg" alt="food icon">
            <div class="reservation-info">
                <span class="reservation-item-title">
                    ${data.get('rbtnMesa')}
                </span>
                <span class="reservation-item-time">
                    ${data.get('hora')}
                </span>
            </div>
            <div class="reservation-info secundary-info">
                <span class="reservation-item-date">
                    ${formatToDate}
                </span>
                <span class="reservation-item-status">
                    Pendiente
                </span>
            </div>
        </div>
    `;

    document.getElementById('tableOfReservations').innerHTML += templete;

    Swal.fire({
        title: '¡Éxito!',
        text: 'Se guardó su reservación exitosamente',
        icon: 'success',
        confirmButtonColor: '#432309',
        confirmButtonText: 'Aceptar'
    })
}

function cleanForm(form) {
    form.reset();
    for (const iterator of document.getElementsByClassName('btnCant')) {
        iterator.classList.remove('active');
    }
}