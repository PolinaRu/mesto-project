export const user = {
  token: "5b45f221-72d7-4784-b785-08afdc8a8197",
  login: "plus-cohort-18",
};

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__text-input_type_error",
  errorClass: "popup__span-error_active",
  errorSpan: ".popup__span-error",
};

//проверка корректности ответа от промиса
export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}
