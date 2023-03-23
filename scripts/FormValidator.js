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

  _hideError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._classes.inputErrorClass);
    errorElement.classList.remove(this._classes.errorClassVisible);
    errorElement.textContent = '';  
  }

  _showError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._classes.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._classes.errorClassVisible);
  }

  _addSubmitButtonCondition = () => {
    const isValid = this._formElement.checkValidity();

    if (isValid) {
      this._button.removeAttribute('disabled');
      this._button.classList.remove(this._classes.inactiveButtonClass);

    } else {
      this._button.setAttribute('disabled', true);
      this._button.classList.add(this._classes.inactiveButtonClass);
    }
  }
  
  _setEventListeners = () => {
    this._button = this._formElement.querySelector(this._classes.submitButtonSelector);
  
    // Создадим массив из инпутов
    this._inputList = Array.from(this._formElement.querySelectorAll(this._classes.inputSelector));
    // деактивируем кнопку при первой загрузке сайта
    this._addSubmitButtonCondition();

    //для каждого элемента массива установим слушатель
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._addSubmitButtonCondition();
      });
    });

    this._formElement.addEventListener('reset', () => {
      setTimeout(() => {
        this._addSubmitButtonCondition(); 
      }, 0) 
    });
  }

  _checkInputValidity = (inputElement) => {
  
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }

  // отменим стандартную отправку формы
  _handleFormSubmit = (event) => {
    event.preventDefault();
  }

  enableValidation() {
    //Установим слушатели для формы
    this._formElement.addEventListener('submit', this._handleFormSubmit);
    this._setEventListeners();
  }
}