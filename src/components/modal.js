import { addElement } from "./card.js";

const newElementAdd = document.querySelector("#add-Element");
const newElementName = document.querySelector("#nameEl");
const newElementLink = document.querySelector("#linkEl");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileEdit = document.querySelector("#edit-Profile");
const profileEditName = document.querySelector("#name");
const profileEditAbout = document.querySelector("#about");
const profileEditButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add-button");


export const formProfile = document.querySelector("#form-Profile");
export const formAddCard = document.querySelector("#form-Element");
const formAddCardButton = document.querySelector("#form-saveEl");

function closeOnEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(".popup_opend")); 
  }
};
function closeOnEnotherclick (evt){
	const openPopup = document.querySelector(".popup_opend");

  if ((openPopup !== null) && (openPopup == evt.target)){ 
    closePopup(openPopup);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opend");
  //включить слушатели
  document.addEventListener("keydown", closeOnEsc);
  document.addEventListener("click", closeOnEnotherclick);
};

export function closePopup(popup) {
  popup.classList.remove("popup_opend");
  //выключить слушатели
  document.removeEventListener("keydown", closeOnEsc);
  document.removeEventListener("click", closeOnEnotherclick);
};

export function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = profileEditName.value;
  profileAbout.textContent = profileEditAbout.value;

  closePopup(profileEdit);
};

export function submitAddCardForm(evt) {
  evt.preventDefault();

  const nameEl = newElementName.value;
  const linkEl = newElementLink.value;

  addElement(nameEl, linkEl);

  closePopup(newElementAdd);
};

profileEditButton.addEventListener("click", function () {
  profileEditName.value = profileName.textContent;
  profileEditAbout.value = profileAbout.textContent;
  openPopup(profileEdit);
});

profileAddButton.addEventListener("click", () => { openPopup(newElementAdd)});