
$(document).ready(function(){
    

    $('.menu a').each(function(index, elemento){
        $(this).css({
            'top': '-6000px'
        });

        $(this).animate({
            top: '0'
        }, 3000 + (index * 500));
    });

    //Efecto Header
    if( $(window).width() > 800){
        $('header .textos').css({
            opacity: 0, 
            marginTop: '3000px'
        });

        $('header .textos').animate({
            opacity: 1, 
            marginTop: '-52px'
        }, 5000);
    }

    //Scroll Elementos Menu
    var acercaDe = $('#acerca-de').offset().top,
        menu = $('#platillos').offset().top,
        galeria = $('#galeria').offset().top,
        nosotros = $('#nosotros').offset().top;

    $('#btn-acerca-de').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: acercaDe - 100
        }, 500);
    });

    $('#btn-menu').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: menu
        }, 500);
    });
    
    $('#btn-galeria').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: galeria
        }, 500);
    });
    
    $('#btn-nosotros').on('click', function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop: nosotros + 250
        }, 500);
    });
    

});