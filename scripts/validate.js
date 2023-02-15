const formClasses = {
  formSelector: '.popup__info',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',
  errorClassVisible: 'popup__error_visible'
};


function showError(formElement, inputElement, classes, errorMessage) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(classes.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classes.errorClassVisible);
};


function hideError(formElement, inputElement, classes) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(classes.inputErrorClass);
  errorElement.classList.remove(classes.errorClassVisible);
  errorElement.textContent = '';
};


function checkInputValidity(formElement, inputElement, classes) {
  if (!inputElement.validity.valid) {
    showError(formElement, inputElement, classes, inputElement.validationMessage);
  } else {
    hideError(formElement, inputElement, classes);
  }
};


function setEventListeners(formElement, classes) {
  // Создадим массив из инпутов
  const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
  // деактивируем кнопку при первой загрузке сайта
  addSubmitButtonCondition(formElement, classes);

  //для каждого элемента массива установим слушатель
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, classes);
      addSubmitButtonCondition(formElement, classes);
    });
  });

  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      addSubmitButtonCondition(formElement, classes);
    }, 0)
  });
};


function enableValidation(classes) {
  //Создадим массив из форм
  const formList = Array.from(document.querySelectorAll(classes.formSelector));
  formList.forEach((formElement) => {
    //Установим слушатели для каждого элемента массива
    formElement.addEventListener('submit', handleFormSubmit);
    formElement.addEventListener('input', function () {
      setEventListeners(formElement, classes);
    });
  });
};


function handleFormSubmit(event) {
  event.preventDefault();
};


function addSubmitButtonCondition(formElement, classes) {
  const button = formElement.querySelector(classes.submitButtonSelector);
  const isValid = formElement.checkValidity();
  
  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.remove(classes.inactiveButtonClass);

  } else {
    button.setAttribute('disabled', true);
    button.classList.add(classes.inactiveButtonClass);
  }

};


enableValidation(formClasses);