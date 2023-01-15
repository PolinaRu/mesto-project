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
  .then((res) => {
    return res.json();
  }); 
};

export function dropCard (user, card) {
  return fetch(`https://nomoreparties.co/v1/${user.login}/cards/${card._id}`, {
    method: 'DELETE',
    headers: {
      authorization: user.token,
      'Content-Type': 'application/json'
    }
  })
}