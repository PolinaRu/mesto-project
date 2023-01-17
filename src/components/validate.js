//Отрисовываем текст ошибки и подсветку, span ошибки находим через id соответствующего input
const showInputError = (settings, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
};

//аналогично скрываем ошибку
const hideInputError = (settings, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

//Проверка валидности конкретного поля в форме
const isValid = (settings, formElement, inputElement) => {
  //если это не влезло в регулярку
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      settings,
      formElement,
      inputElement,
      inputElement.validationMessage
    );
  } else {
    hideInputError(settings, formElement, inputElement);
  }
};

//проверка валидности всех полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
//переключение кнопки отправки формы
const toggleButtonState = (settings, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};

//очистка сообщений ошибки валидации
const removeValidationErrors = (settings, formElement) => {
  const errorSpanList = Array.from(
    formElement.querySelectorAll(settings.errorSpan)
  );
  errorSpanList.forEach((inputElement) => {
    inputElement.textContent = "";
  });
};

//Вешаем обработчик на конкретную форму
const setEventListeners = (settings, formElement) => {
  // Найдём все поля формы и сделаем из них массив
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(settings, formElement, inputElement);
      toggleButtonState(settings, inputList, buttonElement);
    });
  });

  // деактивируем кнопку при 1й загрузке сайта
  toggleButtonState(settings, inputList, buttonElement);

  formElement.addEventListener("reset", () => {
    removeValidationErrors(settings, formElement);
    // `setTimeout` нужен для того, чтобы дождаться очищения формы (вызов уйдет в конце стэка)
    setTimeout(() => {
      toggleButtonState(settings, inputList, buttonElement);
    }, 0);
  });
};

//Перебираем и вешаем обработчик на все формы документа
export default function (settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
    setEventListeners(settings, formElement);
  });
}
