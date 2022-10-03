// I.Popup редактирования профиля

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


// II.Практическая работа №5

// 1.Добавление 6 карточек

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// получаем содержимое тега Template
const elementTemplate = document.querySelector('#element-template').content;
// выбираем контейнер, куда будем добавлять карточки
const elementsContainer = document.querySelector('.elements');
 
// напишем функцию для создания,наполнения карточек и добавления их в контейнер 
function addInfoCards() {
  initialCards.forEach(function(el) {
    // клонируем содержимое тега Template в переменную
    const Elements = elementTemplate.querySelector('.element').cloneNode(true); 
    Elements.querySelector('.element__title').textContent = el.name;
    Elements.querySelector('.element__image').src = el.link;
    // добавляем в контейнер
    elementsContainer.prepend(Elements);
  });
};

// отображаем на странице
addInfoCards();


// 2.Открытие и закрытие формы добавления карточек

// выбираем нужный Popup
const addCardElement = document.getElementById('addCard');
// выбираем кнопку открытия Popup
const addCardOpenButton = document.querySelector('.profile__add-button');

// выбираем кнопку закрытия Popup
const addCardCloseButton = document.getElementById('addCardClose');

// напишем функцию открытия Popup
const openaddCard = function() {
  addCardElement.classList.add('popup_is-opened');
};

// напишем функцию закрытия Popup
const closeaddCard = function() {
  addCardElement.classList.remove('popup_is-opened');
};

// добавим событие - открытие Popup при клике на кнопку
addCardOpenButton.addEventListener('click', openaddCard);

// добавим событие - закрытие Popup при клике на кнопку
addCardCloseButton.addEventListener('click', closeaddCard);


// 3.Добавление карточки

// Находим форму в DOM
let addFormElement = addCardElement.querySelector('.popup__info');

// Находим поля формы в DOM
let placeInput = document.getElementById('placeName');
let imageInput = document.getElementById('placeImage');

// Обработчик «отправки» формы
function addFormSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                
    // Получаем значение полей placeInput и imageInput из свойства value
    let name = placeInput.value;
    let image = imageInput.value;

   // клонируем содержимое тега Template в переменную
   const Elements = elementTemplate.querySelector('.element').cloneNode(true);

   // выбираем фреймы карточки для вывода контента
   const placeName = Elements.querySelector('.element__title');
   const placeImage = Elements.querySelector('.element__image');

   // Вставляем новые значения с помощью textContent и src
   placeName.textContent = name;
   placeImage.src = image;
   
   // добавляем в контейнер
   elementsContainer.prepend(Elements);
   
   // Закрытие Popup
   closeaddCard();

   // очищаем поля  формы после отправки
   placeInput.value = "";
   imageInput.value = "";
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
addFormElement.addEventListener('submit', addFormSubmitHandler);


// 4.Лайк карточки

// создадим массивоподобный объект из кнопок лайка 
const likeElements = document.querySelectorAll('.element__like-button');

// для каждого элемента массивоподобного объекта применим функцию
likeElements.forEach(function(el) {
  // напишем функцию для добавления/удаления лайка при клике на кнопку 
  function likeCard() { 
    el.classList.toggle('element__like-button_enabled');
  };
    
  // добавим событие - клик по кнопке
  el.addEventListener('click', likeCard);  
});
  

// 5.Удаление карточки

// создадим массивоподобный объект из кнопок удаления карточки
const trashElementButton = document.querySelectorAll('.element__trash');

trashElementButton.forEach(function(el) {
  // добавим событие - клик по кнопке удаления
  el.addEventListener('click', deleteCard);
  
  // напишем функцию удаления карточки
  function deleteCard() {
    // выберем элемент,который нужно удалить(это родительский элемент кнопки удаления, т.е. сама карточка)
    let card = this.parentElement; 
    // удаление элемента
    card.remove();
  };

});


// 6.Открытие попапа с картинкой

// найдем попап 
const popupImageElement = document.querySelector('.popup-image');
// найдем кнопку закрытия попапа
const popupImageCloseButton = popupImageElement.querySelector('.popup-image__close');
// создадим массивоподобный объект из фотографий карточек
const elementImage = document.querySelectorAll('.element__image');

// напишем функцию открытия попапа с картинкой

elementImage.forEach(function(el) {
  // добавим событие - клик по картинке
  el.addEventListener('click', openPopupImage);
  // напишем функцию открытия попапа
  function openPopupImage() {
    popupImageElement.classList.add('popup-image_is-opened');

  };

  // добавим событие - клик по кнопке закрытия
  popupImageCloseButton.addEventListener('click', closePopupImage)
  // напишем функцию закрытия попапа
  function closePopupImage() {
    popupImageElement.classList.remove('popup-image_is-opened');
  };
});


// напишем функцию наполнения полей попапа релевантной информацией из карточки

elementImage.forEach(function(el) {
  // добавим событие - клик по картинке
  el.addEventListener('click', fillingPopupImage);
  
  // напишем функцию заполнения попапа информацией из карточки
  function fillingPopupImage() {
    // укажем в переменной, что карточка - это родительский элемент по отношению к фото
    let card = this.parentElement;
    // выбираем поля карточки, из которых будем передавать информацию в попап
    let nameCard = card.querySelector('.element__title');
    let imageCard = card.querySelector('.element__image');
    // выбираем фреймы попапа, в которые будем передавать информацию из карточки
    const placeName = popupImageElement.querySelector('.popup-image__title');
    const placeImage = popupImageElement.querySelector('.popup-image__image');
    // вставляем новые значения с помощью textContent и src
    placeName.textContent = nameCard.textContent;
    placeImage.src = imageCard.src;    
  };  
});
































