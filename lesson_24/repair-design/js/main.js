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
      }
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
      }
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
        }
      }
    

  });


  

  //$('.phone').mask('0000-0000');
  // маска для телефона
  $('[type=tel]').mask('+7(000) 000-00-00', {placeholder: "+7 (___) ___-__-__"});

});
