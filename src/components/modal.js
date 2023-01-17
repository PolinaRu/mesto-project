export const newElementAdd = document.querySelector("#add-Element");
export const newElementName = document.querySelector("#nameEl");
export const newElementLink = document.querySelector("#linkEl");

export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");
export const profileAvatar = document.querySelector(".profile__avatar");
export const profileEdit = document.querySelector("#edit-Profile");
export const profileEditAvatar = document.querySelector("#edit-Avatar");
export const profileEditName = document.querySelector("#name");
export const profileEditAbout = document.querySelector("#about");
export const profileEditAvatarLink = document.querySelector("#linkAva");
const profileEditButton = document.querySelector(".profile__edit");
const profileAddButton = document.querySelector(".profile__add-button");

function closeOnEsc (evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(".popup_opend")); 
  }
};
function handleOverlay (evt){
  if (evt.target.classList.contains('popup_opend')){ 
    closePopup(evt.target);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opend");
  //включить слушатели
  document.addEventListener("keydown", closeOnEsc);
  document.addEventListener("mousedown", handleOverlay);
};

export function closePopup(popup) {
  popup.classList.remove("popup_opend");
  //выключить слушатели
  document.removeEventListener("keydown", closeOnEsc);
  document.removeEventListener("mousedown", handleOverlay);
};

//смена текста на кнопке при загрузке
function renderLoading(isLoading, button, buttonText='Сохранить', loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText
  } else {
    button.textContent = buttonText
  }
}

//обработка отправления формы
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      // форму нужно очищать после успешного ответа от сервера
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

export function submitAddCardForm() {
  closePopup(newElementAdd);
};

profileEditButton.addEventListener("click", function () {
  profileEditName.value = profileName.textContent;
  profileEditAbout.value = profileAbout.textContent;
  openPopup(profileEdit);
});

profileAddButton.addEventListener("click", () => { openPopup(newElementAdd)});
profileAvatar.addEventListener("click", () => { openPopup(profileEditAvatar)});