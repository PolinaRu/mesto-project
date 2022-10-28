const profileName = document.querySelector(".profile__name");
const profileEditName = document.querySelector("#name");
const profileAbout = document.querySelector(".profile__about");
const profileEdit = document.querySelector("#edit-Profile");
const profileEditAbout = document.querySelector("#about");
const profileEditButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add-button");

const newElementName = document.querySelector("#nameEl");
const newElementLink = document.querySelector("#linkEl");
const newElementAdd = document.querySelector("#add-Element");

const closeButtonEdit = document.querySelector("#closeEdit");
const closeButtonAdd = document.querySelector("#closeAddEl");
const closeButtonImg = document.querySelector("#closeImg");

const imgPopup = document.querySelector(".img-popup");
const imgBack = imgPopup.querySelector(".img-popup__background");
const imgName = imgPopup.querySelector(".img-popup__name");

const cardTemplate = document.querySelector("#card-template").content;
const elements = document.querySelector(".elements");

const formProfile = document.querySelector("#form-Profile");
const formAddCard = document.querySelector("#form-Element");


formProfile.addEventListener("submit", submitEditProfileForm);
formAddCard.addEventListener("submit", submitAddCardForm);

profileEditButton.addEventListener("click", function () {
  profileEditName.value = profileName.textContent;
  profileEditAbout.value = profileAbout.textContent;
  openPopup(profileEdit);
});

profileAddButton.addEventListener("click", () => { openPopup(newElementAdd)});

closeButtonEdit.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});

closeButtonAdd.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});

closeButtonImg.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});

function openPopup(popup) {
  popup.classList.toggle("popup_opend");
}

function closePopup(popup) {
  popup.classList.remove("popup_opend");
}

function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = profileEditName.value;
  profileAbout.textContent = document.querySelector("#about").value;

  closePopup(evt.target.closest(".popup"));
}

function submitAddCardForm(evt) {
  evt.preventDefault();

  const nameEl = newElementName.value;
  const linkEl = newElementLink.value;

  addElement(nameEl, linkEl);

  newElementName.value = '';
  newElementLink.value = '';

  closePopup(newElementAdd);
}

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
      /*Тут, возможно, надо удалить объект из массива*/
    });
    elementImg.addEventListener("click", function (evt) {
    openPopupImg(evt.target.closest(".element").querySelector(".element__name").textContent, evt.target.style.backgroundImage);
  });

  return cardElement;
}

function addCard(cardElement) {
  elements.prepend(cardElement);
}

function addElement(nameEl, linkEl) {
  addCard(createCard(nameEl, linkEl));
}

/* Отрисовка дефолтных карточек из массива*/
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
});