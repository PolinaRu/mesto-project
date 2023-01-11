import { addElement } from "./card.js";

const newElementAdd = document.querySelector("#add-Element");
const newElementName = document.querySelector("#nameEl");
const newElementLink = document.querySelector("#linkEl");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const profileEditName = document.querySelector("#name");
const profileEdit = document.querySelector("#edit-Profile");
const profileEditAbout = document.querySelector("#about");
const profileEditButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add-button");

export const formProfile = document.querySelector("#form-Profile");
export const formAddCard = document.querySelector("#form-Element");

export function openPopup(popup) {
  popup.classList.add("popup_opend");
};

export function closePopup(popup) {
  popup.classList.remove("popup_opend");
};

export function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = profileEditName.value;
  profileAbout.textContent = document.querySelector("#about").value;

  closePopup(formProfile.closest(".popup"));
};

export function submitAddCardForm(evt) {
  evt.preventDefault();

  const nameEl = newElementName.value;
  const linkEl = newElementLink.value;

  addElement(nameEl, linkEl);

  newElementName.value = '';
  newElementLink.value = '';

  closePopup(newElementAdd);
};

profileEditButton.addEventListener("click", function () {
  profileEditName.value = profileName.textContent;
  profileEditAbout.value = profileAbout.textContent;
  openPopup(profileEdit);
});

profileAddButton.addEventListener("click", () => { openPopup(newElementAdd)});