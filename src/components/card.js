import {openPopup} from './modal.js';
import {dropCard, sendLike, sendDislike} from './api.js';

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
function toggleLike(user, card, evt){
  if (evt.target.classList.contains("element__like_active")) {
    // отправляем дизлайк, отрисовываем новое количество, убираем заливку
    sendDislike(user, card)
      .then((res) => {
        evt.target.nextElementSibling.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
    evt.target.classList.remove("element__like_active");
  } else {
    sendLike(user, card)
      .then((res) => {
        evt.target.nextElementSibling.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
    evt.target.classList.add("element__like_active");
  }
}

/* Отрисовка элемента на странице */
function createCard(user, card) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const elementImg = cardElement.querySelector(".element__image");

  cardElement.querySelector(".element__name").textContent = card.name;
  cardElement.querySelector(".element__likes-count").textContent = card.likes.length;
  elementImg.style.backgroundImage = `url(${card.link})`;
  elementImg.setAttribute('alt', `${card.name}`);

  cardElement.querySelector(".element__like").addEventListener("click", function (evt) {
    toggleLike(user, card, evt);
    });
//отрисовываем лайк, если он был
  if (card.likes.some(item => {return item._id === user._id})) {
    cardElement.querySelector(".element__like").classList.add("element__like_active");
  }

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