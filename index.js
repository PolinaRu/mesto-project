const profile__name = document.querySelector('.profile__name');
const profile__about = document.querySelector('.profile__about')

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