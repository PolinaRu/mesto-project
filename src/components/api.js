//получение начального массива карточек с сервера
export function getCards (user) {
  return fetch(`https://nomoreparties.co/v1/${user.login}/cards`, {
  headers: {
    authorization: user.token
  }
})
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

//загрузка пользователя
export function getUser (user) {
  return fetch(`https://nomoreparties.co/v1/${user.login}/users/me`, {
    headers: {
      authorization: user.token
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export function saveAvatar (user, url) {};

//отправка имени и инфы пользователя на сервер
export function saveUsername (user, info) {
return fetch(`https://nomoreparties.co/v1/${user.login}/users/me`, {
  method: 'PATCH',
  headers: {
    authorization: user.token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: info.name,
    about: info.about
  })
}); 
};

//добавление новой карточки
export function saveNewCard (user, card) {
  return fetch(`https://nomoreparties.co/v1/${user.login}/cards`, {
    method: 'POST',
    headers: {
      authorization: user.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: card.name,
      link: card.link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//удаление карточки
export function dropCard (user, card) {
  return fetch(`https://nomoreparties.co/v1/${user.login}/cards/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: user.token,
      'Content-Type': 'application/json'
    }
  })
}

//постановка лайков. для отрисовки брать количество лайков из ответа сервера!!!
export function sendLike (user, card) {
  return fetch(`https://nomoreparties.co/v1/${user.login}/cards/likes/${card._id}`, {
    method: 'PUT',
    headers: {
      authorization: user.token,
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export function sendDislike (user, card) {
  return fetch(`https://nomoreparties.co/v1/${user.login}/cards/likes/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: user.token,
      'Content-Type': 'application/json'
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};