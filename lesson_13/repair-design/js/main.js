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
});