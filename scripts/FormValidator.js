export const formClasses = {
  formSelector: '.popup__info',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',
  errorClassVisible: 'popup__error_visible'
};


export class FormValidator {
  constructor(classes, formElement) {
    this._classes = classes;
    this._formElement = formElement; 
  }

  _hideError = (formElement, inputElement, classes) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(classes.inputErrorClass);
    errorElement.classList.remove(classes.errorClassVisible);
    errorElement.textContent = '';  
  }

  _showError = (formElement, inputElement, classes, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(classes.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(classes.errorClassVisible);
  }

  _addSubmitButtonCondition = (formElement, classes) => {
    const button = formElement.querySelector(classes.submitButtonSelector);
    const isValid = formElement.checkValidity();
  
    if (isValid) {
      button.removeAttribute('disabled');
      button.classList.remove(classes.inactiveButtonClass);

    } else {
      button.setAttribute('disabled', true);
      button.classList.add(classes.inactiveButtonClass);
    }
  }
  
  _setEventListeners = (formElement, classes) => {
    // Создадим массив из инпутов
    const inputList = Array.from(formElement.querySelectorAll(classes.inputSelector));
    // деактивируем кнопку при первой загрузке сайта
    this._addSubmitButtonCondition(formElement, classes);

    //для каждого элемента массива установим слушатель
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement, classes);
        this._addSubmitButtonCondition(formElement, classes);
      });
    });

    formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._addSubmitButtonCondition(formElement, classes);
      }, 0)
    });
  }

  _checkInputValidity = (formElement, inputElement, classes) => {
    if (!inputElement.validity.valid) {
      this._showError(formElement, inputElement, classes, inputElement.validationMessage);
    } else {
      this._hideError(formElement, inputElement, classes);
    }
  }

  // отменим стандартную отправку формы
  _handleFormSubmit = (event) => {
    event.preventDefault();
  }

  enableValidation() {
    //Установим слушатели для формы
    this._formElement.addEventListener('submit', this._handleFormSubmit);
    this._formElement.addEventListener('input', this._setEventListeners(this._formElement, this._classes));
  }
}