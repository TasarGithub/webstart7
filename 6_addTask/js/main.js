document.addEventListener("DOMContentLoaded", function(event){
  // console.log ("klkl");
  const modal = document.querySelector('.modal');
  const modalBtn = document.querySelectorAll('[data-toggle=modal]');
  const switchModal = () =>{
    modal.classList.toggle('modal--visible');
  };
  const closeBtn = document.querySelector('.modal__close');

  modalBtn.forEach(element => {
    element.addEventListener('click', switchModal);
  });
  console.log (modal);
  closeBtn.addEventListener('click', switchModal);
});
