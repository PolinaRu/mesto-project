import './components/index.css';
import {initialCards} from './components/initCards.js';

import enableValidation from './components/validate.js';
import {addElement} from './components/card.js';
import {closePopup, submitEditProfileForm, submitAddCardForm, formProfile, formAddCard} from './components/modal.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text-input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__text-input_type_error',
  errorClass: 'popup__span-error_active',
  errorSpan: '.popup__span-error'
};

const closeButtonEdit = document.querySelector("#closeEdit");
const closeButtonAdd = document.querySelector("#closeAddEl");
const closeButtonImg = document.querySelector("#closeImg");

formProfile.addEventListener("submit", submitEditProfileForm);
formAddCard.addEventListener("submit", submitAddCardForm);

closeButtonEdit.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});
closeButtonAdd.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});
closeButtonImg.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});

// Вызовем функцию навешивающую обработчик на формы
enableValidation(validationConfig); 

// Отрисовка дефолтных карточек из массива
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
});