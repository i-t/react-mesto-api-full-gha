const BASE_URL = 'http://localhost:3000';

function getHeaders() {
  return {
    "Content-Type": "application/json",
    authorization: localStorage.getItem('jwt')
  }
}

function getJson(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export function setUserAvatar(data) {
  return fetch(`${BASE_URL}/users/me/avatar`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data),
  })
    .then(getJson);
}


export function setUserData(data) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify(data)
  })
    .then(getJson);
}

export function getCurrentUser() {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: getHeaders()
  })
    .then(getJson);
}

export function getCards() {
  return fetch(`${BASE_URL}/cards`, {
    headers: getHeaders(),
  })
    .then(getJson);
}

export function createCard(item) {
  return fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(item),
  })
    .then(getJson);
}

export function deleteCard(id) {
  return fetch(`${BASE_URL}/cards/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  })
    .then(getJson);
}

export function addLike(id) {
  return fetch(`${BASE_URL}/cards/${id}/likes`, {
    method: "PUT",
    headers: getHeaders(),
  })
    .then(getJson);
}

export function deleteLike(id) {
  return fetch(`${BASE_URL}/cards/${id}/likes`, {
    method: "DELETE",
    headers: getHeaders(),
  })
    .then(getJson);
}

export function changeLikeCardStatus(id, isLiked) {
  if (isLiked) {
    console.log('Лайк')
    return addLike(id)
  } else {
    console.log('Дизлайк')
    return deleteLike(id)
  }
}

// const api = new Api(
//   'https://mesto.nomoreparties.co/v1/cohort-61',
//   'bb7f788f-9a61-4419-94c0-5c9f05b4e131'
// );


// export default api;