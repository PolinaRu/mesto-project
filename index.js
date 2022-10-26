const profile__name = document.querySelector(".profile__name");
const profile__about = document.querySelector(".profile__about");
const elements = document.querySelector(".elements");
const initialCards = [
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

document.querySelector(".profile__edit").addEventListener("click", function () {
  document.querySelector("#name").value = profile__name.textContent;
  document.querySelector("#about").value = profile__about.textContent;
  document.querySelector("#edit-Profile").classList.toggle("popup_opend");
});

document
  .querySelector(".profile__add-button")
  .addEventListener("click", function () {
    document.querySelector("#add-Element").classList.toggle("popup_opend");
  });

document.querySelector("#closeEdit").addEventListener("click", function () {
  document.querySelector("#edit-Profile").classList.remove("popup_opend");
});

document.querySelector("#closeAddEl").addEventListener("click", function () {
  document.querySelector("#add-Element").classList.remove("popup_opend");
});

document.querySelector("#closeImg").addEventListener("click", function () {
  document.querySelector(".img-popup").classList.remove("popup_opend");
});

function formSubmitHandler(evt) {
  evt.preventDefault();

  profile__name.textContent = document.querySelector("#name").value;
  profile__about.textContent = document.querySelector("#about").value;

  document.querySelector("#edit-Profile").classList.remove("popup_opend");
}

function formSubmitElement(evt) {
  evt.preventDefault();

  const nameEl = document.querySelector("#nameEl").value;
  const linkEl = document.querySelector("#linkEl").value;

  addElement(nameEl, linkEl);
  /* Добавление элемента в масси - а надо ли?
  initialCards.push({ name: nameEl, link: linkEl });*/

  document.querySelector("#add-Element").classList.remove("popup_opend");
}

function openImgPopup(nameEl, linkEl) {
  const popupEl = document.querySelector(".img-popup");
  const img = popupEl.querySelector(".img-popup__background");
  const name = popupEl.querySelector(".img-popup__name");

  name.textContent = nameEl;
  img.style.backgroundImage = linkEl;
  popupEl.classList.toggle("popup_opend");
}

document.querySelector("#form-Profile").addEventListener("submit", formSubmitHandler);
document.querySelector("#form-Element").addEventListener("submit", formSubmitElement);

/* Отрисовка элемента на странице */
function addElement(nameEl, linkEl) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

  cardElement.querySelector(".element__name").textContent = nameEl;
  cardElement.querySelector(".element__image").style.backgroundImage = `url(${linkEl})`;
  cardElement.querySelector(".element__like").addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like_active");
    });
  cardElement.querySelector(".element__drop").addEventListener("click", function (evt) {
      evt.target.closest(".element").remove();
      /*Тут, возможно, надо удалить объект из массива*/
    });
  cardElement.querySelector(".element__image").addEventListener("click", function (evt) {
    openImgPopup(evt.target.closest(".element").querySelector(".element__name").textContent, evt.target.style.backgroundImage);
  });

  elements.prepend(cardElement);
}

/* Отрисовка дефолтных карточек из массива*/
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
});

console.log();