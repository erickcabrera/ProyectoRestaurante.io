
//script loader
function loader(){
  document.querySelector('.loader-contenedor').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);

  if (localStorage.getItem("messages") === null) {
    localStorage.setItem("messages", JSON.stringify([]));
  }

  //función para extraer datos de los platillos
  getPlatillosData();

  //agregando evento al formulario
  document.querySelector(".form-contactUs").addEventListener('submit', (e) => {
    e.preventDefault();
    //función para guardar el mensaje
    saveMessage();
  });
}

window.onload = fadeOut;
//fin script loader

function getPlatillosData() {
  //usos de ajax para extraer los datos
  $.ajax({
    type: "GET",
    url: "https://erickcabrera.github.io/ProyectoRestaurante.io/data/dataPlatillos.json",
    success: function (response) {
      renderPlatillos(response);
    }
  });
}

function renderPlatillos(data) {
  data.forEach(element => {
    document.querySelector(".menu-secundario-container").innerHTML += `
      <div class="menu-secundario-item">
        <p class="menu-item-price">$${element.price}</p>
        <img src="img/${element.img}" alt="menu-item">
        <div class="menu-item-info">
            <p class="menu-item-title">${element.name}</p>
            <p class="menu-item-description">
              ${element.description}
            </p>
        </div>
      </div>
    `;
  });
}

function saveMessage() {
  //creando objeto de mensaje
  let message = {
    name: '',
    email: '',
    message: ''
  }

  //expresión regular
  let regx = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  if (regx.test($('.inptEmail').val())) {
    message.name = $('.inptName').val();
    message.email = $('.inptEmail').val();
    message.message = $('.inptMessage').val();

    //guardamos los datos en local Storage
    let mensajes = JSON.parse(localStorage.getItem("messages"));
    mensajes.push(message);

    localStorage.setItem("messages", JSON.stringify(mensajes));

    Swal.fire({
      title: '¡Éxito!',
      text: 'Se envio su mensaje exitosamente',
      icon: 'success',
      confirmButtonColor: '#432309',
      confirmButtonText: 'Aceptar'
    })

    //limpiamos el formulario
    document.querySelector(".form-contactUs").reset();
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Debe de ingresar datos correctos',
      confirmButtonColor: '#262626',
      confirmButtonText: 'Aceptar'
    })
  }
}