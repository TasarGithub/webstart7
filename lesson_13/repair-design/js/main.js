// document.addEventListener("DOMContentLoaded", function(event){
//   // console.log ("klkl");
//   const modal = document.querySelector('.modal');
//   const modalBtn = document.querySelectorAll('[data-toggle=modal]');
//   const switchModal = () =>{
//     modal.classList.toggle('modal--visible');
//   };
//   const closeBtn = document.querySelector('.modal__close');

//   modalBtn.forEach(element => {
//     element.addEventListener('click', switchModal);
//   });
//   console.log (modal);
//   closeBtn.addEventListener('click', switchModal);
// });

$(document).ready(function () {

  var modal =$('.modal'),
  modalThanks =$('.modal-thanks'),
  formModal =$('.modal__form'),
  formControl =$('.control__form'),
  formFooter =$('.footer__form'),
  btnControl =$('.control__button'),
  btnFooter =$('.footer__button'),
  modalBtn = $('[data-toggle="modal"]'),
  closeBtnThanks = $('.modal-thanks__close'),
  closeBtn = $('.modal__close');


  var modalAll = document.querySelectorAll('[data-close="modal"]'),
    modaljs = document.querySelector('.modal');

  //console.log('modaljs: ', modaljs);





  //Close modal windows
  $('[data-close="modal"]').each(function(index, item){
    console.log('item: ', item);

    $(item).click(function(event) {
      var target = event.target;
  
      console.log('target', target); 
     
          if  ($(target).hasClass("modal--visible")) {
            $(target).removeClass("modal--visible");
          }
    });
    $(document).keydown(function(event) {
      if (event.code === 'Escape' && ( $(item).hasClass("modal--visible"))) {
        $(item).removeClass("modal--visible");
      }
    });

  });


  modalBtn.on('click', function () {
    if ($('div').is('#glo_vksubscribe')) {
      $('#glo_vksubscribe').remove();
      $('.modal__title').text('Оставьте заявку и наш менеджер свяжется с вами ');
    }
    $('.modal__form').css('display',"flex");
    $('.modal__title').css('display',"block");
    $('.modal__thanks-block').css('display',"none");
    $('.modal__form').css('opacity',1);
    $('.modal__title').css('opacity',1); 

    modal.toggleClass('modal--visible');
  });

  closeBtn.on('click', function() {
    modal.removeClass('modal--visible');
  });

  closeBtnThanks.on('click', function() {
    modalThanks.removeClass('modal-thanks--visible');
  });



  let flyInterval,
    count = 1;


  //initialize swiper when document ready
  var mySwiper = new Swiper ('.swiper-container', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination');
  
  next.css('left',prev.width() + 6 + bullets.width() + 32);
  bullets.css('left',prev.width() + 21);



  //anime
  new WOW().init();


  // Валидация форм
  //, .footer__form, .control__form

  //Замена встроенного метода проверки емейла на лучший , с проверкой точки
  $.validator.methods.email = function( value, element ) {
    return this.optional( element ) || /[A-z0-9._]+@[A-z0-9.-]+\.[a-z]+/.test( value );
  };

  $('.modal__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило simple rule, converted to {required:true}
      userName: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhone: {
        required: true,
        minlength: 17
      },
      //правило - объект
      userEmail: {
        required: true,
        email: true
      },

      modalPolicyCheckbox: {
        required: true
      }
    },
    //сообщения
    messages: {
      userName: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не длинее 15ти букв"
      },
      userPhone: {
        required: "Заполните поле",
        minlength: "Введите корректный телефон",
      },      
      userEmail: {
        required: "Заполните поле",
        email: "Введите корректный email"
      },
      modalPolicyCheckbox: {
        required: "Заполните поле"
      }
    },

    submitHandler: function(form) {
      
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          $('.modal__form').hide(); //css('display',"none");
          $('form')[2].reset();
          $('.modal__title').text("Форма отправлена");
          $(".modal__dialog").append("<div id=\"glo_vksubscribe\"> <script type=\"text/javascript\">VK.Widgets.Group(\"glo_vksubscribe\", {mode: 3, width: \"220\", no_cover: 1 }, 123083697)</script></div>");
          $('#glo_vksubscribe').css('height', '400px');
          $('#glo_vksubscribe').css('width', '220px');
          
               //$(".modal__dialog").append("<div id=\"vk_subscribe\"></div><script type=\"text/javascript\">VK.Widgets.Subscribe(\"vk_subscribe\", {}, -123083697);</script>");
        },
        erorr: function(responce) {
          console.error('Ошибка запроса' + responce);
        }
        
      });
    }
  });

  $('.control__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило simple rule, converted to {required:true}
      userNameControl: {
        required: true,
        minlength: 2,
        maxlength: 15
      },
      userPhoneControl: {
        required: true,
        minlength: 17
      },
      //правило - объект
      userEmailControl: {
        required: true,
        email: true
      },
      controlPolicyCheckbox: {
        required: true
      }
    },
    //сообщения
    messages: {
      userNameControl: {
        required: "Заполните поле",
        minlength: "Имя не короче двух букв",
        maxlength: "Имя не длинее 15ти букв"
      },
      userPhoneControl: {
        required: "Заполните поле",
        minlength: "Введите корректный телефон",
      },      
      userEmailControl: {
        required: "Заполните поле",
        email: "Введите корректный email"
      },
      controlPolicyCheckbox: {
        required: "Заполните поле"
      }
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          //console.log('Ajax сработал. Ответ сервера: ' + response);
          modalThanks.toggleClass('modal--visible');
          $('form')[0].reset();
        }
      });
    }

  });



  $('.footer__form').validate({
      errorClass: "invalid",
      errorElement: "div",
      rules: {
        // строчное правило simple rule, converted to {required:true}
        userNameFooter: {
          required: true,
          minlength: 2,
          maxlength: 15
        },
        userPhoneFooter: {
          required: true,
          minlength: 17
        },
        //правило - объект
        footerPolicyCheckbox: {
          required: true
        }
      },
      //сообщения
      messages: {
        userNameFooter: {
          required: "Заполните поле",
          minlength: "Имя не короче двух букв",
          maxlength: "Имя не длинее 15ти букв"
        },
        userPhoneFooter: {
          required: "Заполните поле",
          minlength: "Введите корректный телефон",
        },      
        footerPolicyCheckbox: {
          required: "Заполните поле"
        }
      },

      submitHandler: function(form) {
        $.ajax({
          type: "POST",
          url: "send.php",
          data: $(form).serialize(),
          success: function (response) {
            //console.log('Ajax сработал. Ответ сервера: ' + response);
            // modalThanks.toggleClass('modal-thanks--visible');
            // $('form')[1].reset();
            // // modal.removeClass('modal--visible');
            $('.footer__form').css('display',"none");
            $('.footer__title').css('display',"none");
            $('.footer__thanks-block').css('display', "block");
            count = 1;
            function flyAnimate (){
              flyInterval = requestAnimationFrame(flyAnimate);
              console.log(count);
              count=count - 0.01;
              console.log('.modal__form opacity',$('.modal__form').css('opacity'));
              if ($('.footer__thanks-block').css('opacity') > 0) {
                    $('.footer__thanks-block').css('opacity',count); 
                  } else {
                    cancelAnimationFrame(flyInterval);
                    $('form')[1].reset();
                    $('.footer__form').css('display',"flex");
                    $('.footer__thanks-block').css('display', "none");
                    $('.footer__title').css('display',"block");
                    $('.footer__thanks-block').css('opacity',1);
                  }
            } 
            flyInterval = requestAnimationFrame(flyAnimate);
          }
        });
      }

  });




  //$('.phone').mask('0000-0000');
  // маска для телефона
  $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});
  
  
  // Яндекс карта с меткой с собственным изображением
    //перенесена в html
  ///

  //подключение YouTube
  var player;
  $('.video__play').on('click', function onYouTubeIframeAPIReady(){
    player = new YT.Player('player', {
      height: '465',
      width: '100%',
      videoId: 'TvVYeLvujLk',
      events: {
        'onReady': videoPlay,
      }
    });
  });
  function videoPlay(event) {
    event.target.playVideo();
  }

// <iframe width="560" height="315" src="https://www.youtube.com/embed/TvVYeLvujLk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


 function topArrow(){
    const totop = document.querySelector('.totop'),
      hero = document.querySelector('.hero');
 
    totop.style.opacity = 0;
     
    const base = hero.offsetTop;
    modalAll

     window.addEventListener('scroll', function(){    
      if (window.pageYOffset > base ) {
        totop.style.opacity = 1;
      } else {
        totop.style.opacity = 0;
      }
    });
  }
  
  topArrow();

  $("#totop").click(function(){
    //Необходимо прокрутить в начало страницы
    var curPos=$(document).scrollTop();
    var scrollTime=curPos/1.73;
    $("body,html").animate({"scrollTop":0},scrollTime);
    });


    const mySwiperSix = new Swiper('.six-step__swiper-container', {
      loop: true,
      pagination: {
         el: '.swiper-pagination',
         type: 'bullets',
         clickable: true,
      },
   
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      }

  });
  var nextSix = $('.six-step__swiper-button-next');
  var prevSix = $('.six-step__swiper-button-prev');
  var bulletsSix = $('.six-step__swiper-pagination');
  
  nextSix.css('left',prevSix.width() + 6 + bulletsSix.width() + 32);
  bulletsSix.css('left',prevSix.width() + 21);


  $('.six-step__swiper-menu').on('click', '.six-step__swiper-menu-item', function() {
    const index = $(this).data('index');
    console.log('index: ', index);
    mySwiperSix.slideTo(index);
 });
 
  mySwiperSix.on('transitionEnd', function() {
    
    var firstPart = $('#six-step__first');
    
    firstPart.fadeTo(1, 0);
    
   $('#six-step__first').text(mySwiperSix.realIndex+1);

    firstPart.fadeTo(700, 1);
    //$('.six-step__swiper-menu-item')[mySwiperSix.realIndex].fadeTo(700, 1);
    $('.six-step__swiper-menu-item').fadeTo(1, 0.3);
    $('.six-step__swiper-menu-item').each(function(index, element){
      
      if (index === mySwiperSix.realIndex ) {
        console.log('element: ', element);
        $(element).fadeTo(700, 1);
        
      }
    });

 

  });


});
