import "./styles/index.css";
import { validationConfig } from "./utils/constants.js";

import {
  getCards,
  getUser,
  saveAvatar,
  saveUsername,
  saveNewCard,
} from "./components/api.js";
import enableValidation from "./components/validate.js";
import { addElement } from "./components/card.js";
import { closePopup,  handleSubmit,
  profileEditAbout, profileEditName, profileEditAvatarLink,
  profileEdit, profileEditAvatar, newElementAdd,
  profileName, profileAvatar, profileAbout,
  newElementName, newElementLink,
} from "./components/modal.js";

export let userId;

//тут достаются формы по именам
const formProfile = document.forms["form-Profile"];
const formAddCard = document.forms["form-Element"];
const formEditAvatar = document.forms["form-Avatar"];

// находим все кнопки закрытия модалок по универсальному селектору
const closeButtons = document.querySelectorAll(".popup__close-button");
// устанавливаем обработчик закрытия на крестик
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

//обработчик сабмита формы редактирования профиля
function handleSubmitProfileForm(evt) {
  function makeRequest() {
    return saveUsername({
      name: profileEditName.value,
      about: profileEditAbout.value,
    })
      .then((userData) => {
        profileName.textContent = userData.name;
        profileAbout.textContent = userData.about;
        closePopup(profileEdit);
      });
  }
  handleSubmit(makeRequest, evt);
}
//обработчик сабмита формы смены аватара
function handleSubmitAvatarForm(evt) {
  function makeRequest() {
    return saveAvatar({ link: profileEditAvatarLink.value })
      .then((userData) => {
        profileAvatar.setAttribute(
          "style",
          `background-image: url(${userData.avatar});`
        );
        closePopup(profileEditAvatar);
      });
  }
  handleSubmit(makeRequest, evt);
}
//обработчик сабмита формы добавления карточки
function handleSubmitNewCardForm(evt) {
  function makeRequest() {
    return saveNewCard({
      name: newElementName.value,
      link: newElementLink.value,
    })
      .then((userData) => {
        addElement(userData);
        closePopup(newElementAdd);
      });
  }
  handleSubmit(makeRequest, evt);
}

formProfile.addEventListener("submit", handleSubmitProfileForm);
formEditAvatar.addEventListener("submit", handleSubmitAvatarForm);
formAddCard.addEventListener("submit", handleSubmitNewCardForm);

// Вызовем функцию навешивающую валидатор на формы
enableValidation(validationConfig);

//загрузка и отрисовка первоначальных данных
Promise.all([getUser(), getCards()])
  .then(([userData, cards]) => {
    // установка данных пользователя
    profileName.textContent = userData.name;
    profileAbout.textContent = userData.about;
    profileAvatar.setAttribute(
      "style",
      `background-image: url(${userData.avatar});`
    );
    userId = userData._id;
    //Отрисовка карточек из общего массива с сервера
    cards.forEach(function (item) {
      addElement(item); //console.log(item);
    });
  })
  .catch((err) => {
    console.error(err);
  });
