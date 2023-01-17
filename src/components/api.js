import { user, checkResponse } from "./../utils/constants.js";

const config = {
  baseUrl: `https://nomoreparties.co/v1/${user.login}`,
  headers: {
    authorization: "5b45f221-72d7-4784-b785-08afdc8a8197",
    "Content-Type": "application/json",
  },
};

//получение начального массива карточек с сервера
export function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
}

//загрузка пользователя
export function getUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
}

export function saveAvatar(obj) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: obj.link,
    }),
  }).then(checkResponse);
}

//отправка имени и инфы пользователя на сервер
export function saveUsername(info) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: info.name,
      about: info.about,
    }),
  }).then(checkResponse);
}

//добавление новой карточки
export function saveNewCard(card) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: card.name,
      link: card.link,
    }),
  }).then(checkResponse);
}

//удаление карточки
export function dropCard(card) {
  return fetch(`${config.baseUrl}/cards/${card._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

//постановка лайков. для отрисовки брать количество лайков из ответа сервера!!!
export function sendLike(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

export function sendDislike(card) {
  return fetch(`${config.baseUrl}/cards/likes/${card._id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}
