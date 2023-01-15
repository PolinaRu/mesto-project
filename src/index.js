import './styles/index.css';

import {getCards, getUser, saveAvatar, saveUsername, saveNewCard} from './components/api.js';
import enableValidation from './components/validate.js';
import {addElement} from './components/card.js';
import {closePopup, submitEditProfileForm, submitAddCardForm, submitEditAvatarForm,
       profileAbout, profileName, profileAvatar,
       newElementName, newElementLink} from './components/modal.js';

const user = {
  token: '5b45f221-72d7-4784-b785-08afdc8a8197',
  login: 'plus-cohort-18',
  _id: '88e2836e45d124ad63e77fa5'
};

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
//const closeButtonDel = document.querySelector("#closeDelete");

const formProfile = document.querySelector("#form-Profile");
const formAddCard = document.querySelector("#form-Element");
const formEditAvatar = document.querySelector("#form-Avatar");

formProfile.addEventListener("submit", (evt) => {
  submitEditProfileForm(evt);
  saveUsername(user, {name: profileName.textContent, about: profileAbout.textContent})
});
formAddCard.addEventListener("submit", (evt) => {
  saveNewCard(user, {name: newElementName.value, link: newElementLink.value})
    .then((res) => {
      addElement(user, res);
    });
  submitAddCardForm(evt);
});
formEditAvatar.addEventListener("submit", (evt) => {
  submitEditAvatarForm(evt);
  
});

closeButtonEdit.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});
closeButtonAdd.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});
closeButtonImg.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});
//closeButtonDel.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});

// Вызовем функцию навешивающую обработчик на формы
enableValidation(validationConfig); 

// Отрисовка карточек из общего массива с сервера
getCards(user)
  .then((res) => {
    res.forEach(function (item) {
      addElement(user, item); console.log(item);
    });
  })
  .catch((err) => {
    console.error(err);
  });

//Отрисовка пользователя по токену
getUser(user)
  .then((res) => {
    profileName.textContent = res.name;
    profileAbout.textContent = res.about;
    profileAvatar.setAttribute('style', `background-image: url(${res.avatar});`);

    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  });
