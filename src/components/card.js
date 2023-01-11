import {openPopup} from './modal.js';

const cardTemplate = document.querySelector("#card-template").content;
const elements = document.querySelector(".elements");

const imgPopup = document.querySelector(".img-popup");
const imgBack = imgPopup.querySelector(".img-popup__background");
const imgName = imgPopup.querySelector(".img-popup__name");

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openPopupImg(nameEl, linkEl) {
  imgName.textContent = nameEl;
  imgBack.style.backgroundImage = linkEl;
  imgBack.setAttribute('alt', `${nameEl}`);
  openPopup(imgPopup);
}

/* Отрисовка элемента на странице */
function createCard(nameEl, linkEl) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImg = cardElement.querySelector(".element__image");

  cardElement.querySelector(".element__name").textContent = nameEl;
  elementImg.style.backgroundImage = `url(${linkEl})`;
  cardElement.querySelector(".element__like").addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
  cardElement.querySelector(".element__drop").addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
    });
    elementImg.addEventListener("click", function (evt) {
    openPopupImg(evt.target.closest(".element").querySelector(".element__name").textContent, evt.target.style.backgroundImage);
  });

  return cardElement;
}

function addCard(cardElement) {
  elements.prepend(cardElement);
}

export function addElement(nameEl, linkEl) {
  addCard(createCard(nameEl, linkEl));
}