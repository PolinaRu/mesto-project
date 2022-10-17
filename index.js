const profile__name = document.querySelector('.profile__name');
const profile__about = document.querySelector('.profile__about');
let elements = document.querySelector('.elements');
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
  document.querySelector('.popup').classList.toggle('popup_opend');
})

document.querySelector('.popup__close-button').addEventListener('click', function() {
  document.querySelector('.popup').classList.toggle('popup_opend');
})

document.querySelector('.popup__save-button').addEventListener('submit', formSubmitHandler); 

function formSubmitHandler(evt) {
  evt.preventDefault();

  profile__name.textContent = document.querySelector('#name').value;
  profile__about.textContent = document.querySelector('#about').value;

  document.querySelector('.popup').classList.toggle('popup_opend');
}