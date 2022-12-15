const editProfileForm = {
  formSelector: '.popup__info[name="editForm"]',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',
  errorClassVisible: 'popup__error_visible'
};

const addCardForm = {
  formSelector: '.popup__info[name="addForm"]',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error',
  errorClassVisible: 'popup__error_visible'
};


function enableValidation(classes) {
  //Найдем форму в документе
  const form = document.querySelector(classes.formSelector);
  //Установим слушатели
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', (event) => checkInputValidity(event, classes));
};


function handleFormSubmit(event) {
  event.preventDefault();
};


function checkInputValidity(event, classes) {
  // Определим инпут, в который в данный момент происходит ввод данных
  const input = event.target;
  // Определим форму, на которой в данный момент происходит ввод данных в инпут
  const form = event.currentTarget;

  showError(input, classes);
  addSubmitButtonCondition(form, classes);
};


function showError(input, classes) {
  const isValid = input.checkValidity();
  const span = input.nextElementSibling;
  
  if (!isValid) {
    span.textContent = input.validationMessage;
    input.classList.add(classes.inputErrorClass);
    span.classList.add(classes.errorClassVisible);
  } else {
    input.classList.remove(classes.inputErrorClass);
    span.classList.remove(classes.errorClassVisible);
  }
 
};


function addSubmitButtonCondition(form, classes) {
  const button = form.querySelector(classes.submitButtonSelector);
  const isValid = form.checkValidity();

  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.remove(classes.inactiveButtonClass);

  } else {
    button.setAttribute('disabled', true);
    button.classList.add(classes.inactiveButtonClass);
  }
};

enableValidation(editProfileForm);
enableValidation(addCardForm);