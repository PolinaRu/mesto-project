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

document.addEventListener("keydown", function(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector(".popup_opend")); 
  }
})
document.addEventListener( 'click', (evt) => {
	const openPopup = document.querySelector(".popup_opend");

  if ((openPopup !== null) && (openPopup == evt.target)){ 
    closePopup(openPopup);
  }
 
	/*if ( ! withinBoundaries ) {
		div.style.display = 'none'; // скрываем элемент т к клик был за его пределами
	}*/
})

profileAddButton.addEventListener("click", () => { openPopup(newElementAdd)});

closeButtonEdit.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});
closeButtonAdd.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});
closeButtonImg.addEventListener("click", (evt) => {closePopup(evt.target.closest(".popup"))});

function openPopup(popup) {
  popup.classList.add("popup_opend");
}

function closePopup(popup) {
  popup.classList.remove("popup_opend");
}

function submitEditProfileForm(evt) {
  evt.preventDefault();

  profileName.textContent = profileEditName.value;
  profileAbout.textContent = document.querySelector("#about").value;

  closePopup(formProfile.closest(".popup"));
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

//Отрисовываем текст ошибки и подсветку, span ошибки находим через id соответствующего input
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__text-input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__span-error_active');
};

//аналогично скрываем ошибку
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__text-input_type_error');
  errorElement.classList.remove('popup__span-error_active');
  errorElement.textContent = '';
}; 

//Проверка валидности конкретного поля в форме
const isValid = (formElement, inputElement) => {
  //если это не влезло в регулярку
  if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

//проверка валидности всех полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 
//переключение кнопки отправки формы
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__save-button_inactive');
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove('popup__save-button_inactive');
  }
}; 

//Вешаем обработчик на конкретную форму
const setEventListeners = (formElement) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(formElement.querySelectorAll('.popup__text-input'));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector('.popup__save-button');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
  toggleButtonState(inputList, buttonElement);
}; 

//Перебираем и вешаем обработчик на все формы документа
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию навешивающую обработчик на формы
enableValidation(); 

/* Отрисовка дефолтных карточек из массива*/
initialCards.forEach(function (item) {
  addElement(item.name, item.link);
});