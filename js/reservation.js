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

        //validamos que el formulario este completo
        if (validar()) {
            //llamada a función para guardar los datos
            addNewReservation(formData)

            //llamada a función para limpiar formulario
            cleanForm(document.getElementById("reservation-form-data"));   
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe de completar el formulario para hacer su reservación',
                confirmButtonColor: '#262626',
                confirmButtonText: 'Aceptar'
            })
        }
    });

    //evento para mostrar reservaciones en responsive
    document.querySelector('.show-reservations').addEventListener('click', () => {
        document.querySelector('.reservations').classList.toggle('reservations-show');
    });

    //evento para ocultar reservaciones en responsive
    document.querySelector('.btn-close-reservations').addEventListener('click', () => {
        document.querySelector('.reservations').classList.toggle('reservations-show');
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

function validar() {
    let validated = true;
    let btnSelected = false;

    //evaluamos si los campos poseen datos
    if (
        document.getElementById('idname').value === '' || 
        document.getElementById('iddate').value === '' || 
        document.getElementById('idtime').value === ''
    ) {
        //convertimos la variable a false para señalar que no esta validado
        validated = false;
    }
    
    //recorremos los botones de cantidad para corroborar que uno esta activado
    for (const iterator of document.getElementsByClassName('btnCant')) {
        if (!btnSelected)
            btnSelected = iterator.classList.contains('active');
        else
            break;
    }
    
    if (!btnSelected) {
        validated = false;
    }

    //validamos que algún radiobotton este seleccionado
    if (
        !document.getElementById('idchbx1').checked &&
        !document.getElementById('idchbx2').checked &&
        !document.getElementById('idchbx3').checked
    ) {
        validated = false;
    }

    return validated;
}