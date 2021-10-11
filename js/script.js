
//script loader
function loader(){
  document.querySelector('.loader-contenedor').classList.add('fade-out');
}

function fadeOut(){
  setInterval(loader, 3000);
}

window.onload = fadeOut;
//fin script loader