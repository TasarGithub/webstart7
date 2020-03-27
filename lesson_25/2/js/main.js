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
  modalBtn = $('[data-toggle="modal"]'),
  closeBtn = $('.modal__close');

  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });

  closeBtn.on('click', function() {
    modal.toggleClass('modal--visible');
  });


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

  next.css('left',prev.width() + 10 + bullets.width() + 10);
  bullets.css('left',prev.width() + 10);

  //anime
  new WOW().init();


  // Валидация форм
  //, .footer__form, .control__form

  //Замена встроенного меторда проверки емейла на лучший , с проверкой точки
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
          // console.log('Ajax сработал. Ответ сервера: ' + response);
          alert('Форма отправлена, мы свяжемся с вами через 10 минут');
          $('form')[2].reset();
          // modal.toggleClass('modal--visible');
          modal.removeClass('modal--visible');
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
      controlPolicyCheckbox: {
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
          console.log('Ajax сработал. Ответ сервера: ' + response);
        }
      });
    }

  });



  $('.footer__form').validate({
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
        footerPolicyCheckbox: {
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
            console.log('Ajax сработал. Ответ сервера: ' + response);
          }
        });
      }

  });




  //$('.phone').mask('0000-0000');
  // маска для телефона
  $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});
  
  
  // Яндекс карта с меткой с собственным изображением




  // window.addEventListener(`resize`, event => {
  //   if (window.width() < 550) {

  //   }
  // }, false);
    


    ymaps.ready(function () {
      var myMap = new ymaps.Map('map', {
              center: [55.743676, 37.592230],
              zoom: 15
          }, {
              searchControlProvider: 'yandex#search'
          }),

          // Создаём макет содержимого.
          MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
              '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
          ),

          myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
              hintContent: 'Офис Design repair LTD',
              balloonContent: 'Парковка во дворе'
          }, {
              // Опции.
              // autoFitToViewport: 'ifNull',
              // searchControlProvider: 'yandex#search',
              // Необходимо указать данный тип макета.
              iconLayout: 'default#image',
              // Своё изображение иконки метки.
              iconImageHref: 'img/location.png',
              // Размеры метки.
              iconImageSize: [32, 32],
              // Смещение левого верхнего угла иконки относительно
              // её "ножки" (точки привязки).
              iconImageOffset: [-5, -38]
          });
          myMap.behaviors.disable('scrollZoom');
      // myMap.container.fitToViewport();

      myMap.geoObjects
          .add(myPlacemark);
      
  });


});
