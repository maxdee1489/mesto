// 1.Открытие и закрытие Popup
const popupElement = document.querySelector('.popup');
const popupCloseButton = popupElement.querySelector('.popup__close');
const popupOpenButton = document.querySelector('.profile__edit-button');

const openPopup = function() {
  popupElement.classList.add('popup_is-opened');
  addInfo();
};

const closePopup = function() {
  popupElement.classList.remove('popup_is-opened');
};

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);


// 2.Значения в полях ввода при открытии Popup
const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileAmplua = profileElement.querySelector('.profile__amplua');
let name = document.getElementById('name');
let amplua = document.getElementById('amplua');

const addInfo = function() {
  name.value = profileName.textContent;
  amplua.value = profileAmplua.textContent;
};


//3.Редактирование имени и информации

// Находим форму в DOM
let formElement = document.querySelector('.popup__info');
// Находим поля формы в DOM
let nameInput = document.getElementById('name');
let jobInput = document.getElementById('amplua');

// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                
    // Получаем значение полей jobInput и nameInput из свойства value
    let name = nameInput.value;
    let job = jobInput.value;

    // Вставляем новые значения с помощью textContent
    profileName.textContent = name; 
    profileAmplua.textContent = job;

    //Закрытие Popup
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
























