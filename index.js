const profile__name = document.querySelector('.profile__name');
const profile__about = document.querySelector('.profile__about');
const elements = document.querySelector('.elements');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

document.querySelector('.profile__edit').addEventListener('click', function() {
  document.querySelector('#name').value = profile__name.textContent;
  document.querySelector('#about').value = profile__about.textContent;
  document.querySelector('#editProfile').classList.toggle('popup_opend');
})

document.querySelector('.profile__add-button').addEventListener('click', function() {
  document.querySelector('#addElement').classList.toggle('popup_opend');
})

document.querySelector('#closeEdit').addEventListener('click', function() {
  document.querySelector('#editProfile').classList.remove('popup_opend');
})

document.querySelector('#closeAddEl').addEventListener('click', function() {
  document.querySelector('#addElement').classList.remove('popup_opend');
})

document.querySelector('#form-saveProf').addEventListener('submit', formSubmitHandler); 
document.querySelector('#form-saveEl').addEventListener('submit', formSubmitElement);

function formSubmitHandler(evt) {
  evt.preventDefault();

  profile__name.textContent = document.querySelector('#name').value;
  profile__about.textContent = document.querySelector('#about').value;

  document.querySelector('.popup').classList.toggle('popup_opend');
}

function formSubmitElement(evt) {
  evt.preventDefault();
  addElement(document.querySelector('#nameEl').value, document.querySelector('#linkEl').value);
}

function addElement(nameEl, linkEl) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__name').textContent = nameEl;
  cardElement.querySelector('.element__image').style.backgroundImage = `url(${linkEl})`;
  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  elements.append(cardElement);

}

for (let i in initialCards) {
  addElement(initialCards[i].name, initialCards[i].link);
}