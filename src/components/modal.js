const newElementAdd = document.querySelector("#add-Element");
export const newElementName = document.querySelector("#nameEl");
export const newElementLink = document.querySelector("#linkEl");

export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");
export const profileAvatar = document.querySelector(".profile__avatar");
const profileEdit = document.querySelector("#edit-Profile");
const profileEditAvatar = document.querySelector("#edit-Avatar");
const profileEditName = document.querySelector("#name");
const profileEditAbout = document.querySelector("#about");
const profileEditAvatarLink = document.querySelector("#linkAva");
const profileEditButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add-button");

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
  closePopup(newElementAdd);
};

export function submitEditAvatarForm(evt) {
  evt.preventDefault();
  profileAvatar.setAttribute('style', `background-image: url(${profileEditAvatarLink.value});`);

  closePopup(profileEditAvatar);
};

profileEditButton.addEventListener("click", function () {
  profileEditName.value = profileName.textContent;
  profileEditAbout.value = profileAbout.textContent;
  openPopup(profileEdit);
});

profileAddButton.addEventListener("click", () => { openPopup(newElementAdd)});
profileAvatar.addEventListener("click", () => { openPopup(profileEditAvatar)});