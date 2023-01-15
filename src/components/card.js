import {openPopup} from './modal.js';
import {dropCard} from './api.js';

const cardTemplate = document.querySelector("#card-template").content;
const elements = document.querySelector(".elements");

const imgPopup = document.querySelector(".img-popup");
const imgBack = imgPopup.querySelector(".img-popup__background");
const imgName = imgPopup.querySelector(".img-popup__name");

const popupDeleteElement = document.querySelector("#delete-Element");

function openPopupImg(nameEl, linkEl) {
  imgName.textContent = nameEl;
  imgBack.style.backgroundImage = `url(${linkEl})`;
  imgBack.setAttribute('alt', `${nameEl}`);
  openPopup(imgPopup);
}

/*function openPopupDelete(user, cardId){
  openPopup(popupDeleteElement);
  //тут фигня какая-то не представляю как через подтверждение модалки запускать удаление((
  dropCard(user, cardId);
}*/

/* Отрисовка элемента на странице */
function createCard(user, card) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImg = cardElement.querySelector(".element__image");

  cardElement.querySelector(".element__name").textContent = card.name;
  cardElement.querySelector(".element__likes-count").textContent = card.likes.length;
  elementImg.style.backgroundImage = `url(${card.link})`;
  elementImg.setAttribute('alt', `${card.name}`);

  cardElement.querySelector(".element__like").addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });

  //проверяем рисовать ли корзину
  if (user._id == card.owner._id) {
  cardElement.querySelector(".element__drop").addEventListener("click", function (evt) {
  
      dropCard(user, card);
      evt.target.closest(".element").remove();
    })} else {
      cardElement.querySelector(".element__drop").style.display = 'none';
    };

    elementImg.addEventListener("click", function (evt) {
    openPopupImg(card.name, card.link);
  });

  return cardElement;
}

function addCard(cardElement) {
  elements.prepend(cardElement);
}

export function addElement(user, cardElement) {
  addCard(createCard(user, cardElement));
}