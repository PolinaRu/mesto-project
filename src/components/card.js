import {openPopup} from './modal.js';
import {dropCard, sendLike, sendDislike} from './api.js';
import {userId} from '../index.js';

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

//переключение лайка
function toggleLike(card, evt){
  if (evt.target.classList.contains("element__like_active")) {
    // отправляем дизлайк, отрисовываем новое количество, убираем заливку
    sendDislike(card)
      .then((res) => {
        evt.target.nextElementSibling.textContent = res.likes.length;
        evt.target.classList.remove("element__like_active");
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
  } else {
    sendLike(card)
      .then((res) => {
        evt.target.nextElementSibling.textContent = res.likes.length;
        evt.target.classList.add("element__like_active");
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
  }
}

/* Отрисовка элемента на странице */
function createCard(card) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImg = cardElement.querySelector(".element__image");
  const elementLike = cardElement.querySelector(".element__like");
  const elementDrop = cardElement.querySelector(".element__drop");

  cardElement.querySelector(".element__name").textContent = card.name;
  cardElement.querySelector(".element__likes-count").textContent = card.likes.length;
  elementImg.style.backgroundImage = `url(${card.link})`;
  elementImg.setAttribute('alt', `${card.name}`);

  elementLike.addEventListener("click", function (evt) {
    toggleLike(card, evt);
    });
//отрисовываем лайк, если он был
  if (card.likes.some(item => {return item._id === userId})) {
    elementLike.classList.add("element__like_active");
  }

  //проверяем рисовать ли корзину
  if (userId == card.owner._id) {
    elementDrop.addEventListener("click", function (evt) {  
      dropCard(card)
        .then(() => evt.target.closest(".element").remove());      
    })} else {
      elementDrop.style.display = 'none';
    };

    elementImg.addEventListener("click", function (evt) {
    openPopupImg(card.name, card.link);
  });

  return cardElement;
}

function addCard(cardElement) {
  elements.prepend(cardElement);
}

export function addElement(cardElement) {
  addCard(createCard(cardElement));
}