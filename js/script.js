
//script loader
function loader(){
  document.querySelector('.loader-contenedor').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);

  //función para extraer datos de los platillos
  getPlatillosData();
}

window.onload = fadeOut;
//fin script loader

function getPlatillosData() {
  //usos de ajax para extraer los datos
  $.ajax({
    type: "GET",
    url: "../data/dataPlatillos.json",
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