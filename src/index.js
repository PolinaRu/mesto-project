import './pages/index.css';

import enableValidation from './components/validate.js';
import {initialCards, addElement} from './components/card.js';
import {openPopup, closePopup, submitEditProfileForm, submitAddCardForm, formProfile, formAddCard} from './components/modal.js';

const closeButtonEdit = document.querySelector("#closeEdit");
const closeButtonAdd = document.querySelector("#closeAddEl");
const closeButtonImg = document.querySelector("#closeImg");

formProfile.addEventListener("submit", submitEditProfileForm);
formAddCard.addEventListener("submit", submitAddCardForm);


document.addEventListener("keydown", function(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(".popup_opend")); 
  }
})
document.addEventListener( 'click', (evt) => {
	const openPopup = document.querySelector(".popup_opend");

  if ((openPopup !== null) && (openPopup == evt.target)){ 
    closePopup(openPopup);
  }
})


closeButtonEdit.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});
closeButtonAdd.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});
closeButtonImg.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});

// Вызовем функцию навешивающую обработчик на формы
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__span-error_active'
}); 

// Отрисовка дефолтных карточек из массива
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
});