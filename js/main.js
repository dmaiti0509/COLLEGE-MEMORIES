const responsive = {
    0: {
        items: 1
    },
    320: {
        items: 1
    },
    560: {
        items: 2
    },
    960: {
        items: 3
    }
}

const toggleCollapse = document.querySelector('.toggle-collapse span');
const nav = document.querySelector('nav');

toggleCollapse.onclick = (e) => {
    nav.classList.toggle("collapse");
    e.target.classList.toggle("toggle-click");
}


$(document).ready(function(){

    /*$nav = $('nav');
    $toggleCollapse = $('.toggle-collapse');


    $toggleCollapse.click(function(){

        $nav.toggleClass('collapse');
    })*/



    $(".site-title .btn").click(function(){
        $(this).hide();
        $(".site-title .btn").fadeIn();
        $("#myMusic")[0].play();
    });



    $(".wrapper .container .title .buttons").click(function(){
        $(this).hide();
        $(".wrapper .container .title .buttons").fadeIn();
        $("#rewindMusic")[0].play();
    });



    $(".bg-music .btn .fa-play-circle").click(function(){
        $(this).hide();
        $(".bg-music .btn .fa-pause-circle").fadeIn();
        $("#musicone")[0].play();
    });

    $(".bg-music .btn .fa-pause-circle").click(function(){
        $(this).hide();
        $(".bg-music .btn .fa-play-circle").fadeIn();
        $("#musicone")[0].pause();
    });



    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: false,
        autoplayTimeout: 3000,
        dots: false,
        nav: true,
        navText: [$('.owl-navigation .owl-nav-prev'), $('.owl-navigation .owl-nav-next')],
        responsive: responsive
    });


    $('.site-title .btn').click(function(){
        $('html,body').animate({
            scrollTop: $('main .blog').offset().top
        }, 3000);
    })


    $('.wrapper .container .title .buttons').click(function(){
        $('html,body').animate({
            scrollTop: $('#app').offset().top
        }, 3000);
    })


    $('.move-up span').click(function(){
        $('html,body').animate({
            scrollTop: 0
        }, 3000);
    })


    AOS.init();
});



var typed = new Typed('#typed' , {
    strings: [
        'Utkrisht Kumar Verma',
        'Aryan Vyas',
        'Eva Jaiswal',
        'Hrishikesh Sahu',
        'Siddharth Manna'
    ],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true
});