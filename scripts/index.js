// I.Popup редактирования профиля

// 1.Открытие и закрытие Popup
const popupEditProfile = document.getElementById('editProfile');
const profileCloseButton = popupEditProfile.querySelector('.popup__close');
const profileOpenButton = document.querySelector('.profile__edit-button');

// напишем общую функцию для открытия попапов
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  // повесим слушатель события - нажатие на клавишу Esc
  document.addEventListener('keydown', closePopupByEsc); 
};

// напишем общую функцию для закрытия попапов
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  // удалим слушатель события - нажатие на клавишу Esc
  document.removeEventListener('keydown', closePopupByEsc);
};

// напишем функцию для закрытия попапа редактирования профиля
const closePopupEditProfile = function () {
  closePopup(popupEditProfile)
};

// добавим событие - открытие Popup при клике на кнопку
profileOpenButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
});

// Напишем функцию закрытия попапа кликом на оверлей
const closePopupByOverley = function (event, actualPopup) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(actualPopup);
};

// Напишем функцию закрытия попапа нажатием на клавишу Esc
function closePopupByEsc(event) {
  if (event.key === "Escape") {
    // найдем DOM-элемент с классом popup_opened и передадим его в функцию закрытия
    const openedPopup = document.querySelector('.popup_is-opened'); 
    closePopup(openedPopup);
  }
};

// добавим событие - закрытие Popup при клике на кнопку
profileCloseButton.addEventListener('click',closePopupEditProfile);
// добавим событие - закрытие Popup при клике на оверлей
popupEditProfile.addEventListener('click', (event) => closePopupByOverley(event, popupEditProfile));


// 2.Значения в полях ввода при открытии Popup
const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileAmplua = profileElement.querySelector('.profile__amplua');
// Находим поля формы в DOM
const nameInputProfilePopup = document.getElementById('name');
const ampluaInputProfilePopup = document.getElementById('amplua');

const addInfoInputsProfilePopup = function() {
  nameInputProfilePopup.value = profileName.textContent;
  ampluaInputProfilePopup.value = profileAmplua.textContent;
};

// настроим запуск функции наполнения полей ввода при нажатии на кнопку открытия попап
profileOpenButton.addEventListener('click', addInfoInputsProfilePopup);

//3.Редактирование имени и информации

// Находим форму в DOM
const formEditProfilePopup = document.forms["editForm"];

// Обработчик «отправки» формы
function submitEditProfileForm (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                
  // Получаем значение полей jobInput и nameInput из свойства value
  const name = nameInputProfilePopup.value;
  const job = ampluaInputProfilePopup.value;

  // Вставляем новые значения с помощью textContent
  profileName.textContent = name; 
  profileAmplua.textContent = job;

  // Закрытие попапа
  closePopupEditProfile();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfilePopup.addEventListener('submit', submitEditProfileForm);


// II.Практическая работа №5

// напишем общую функцию для создания карточек из массива и попапа добавления карточек
function createCard(nameCardValue, imageCardLink) {
  // клонируем содержимое тега Template в переменную
  const newPlaceCard = elementTemplate.querySelector('.element').cloneNode(true);
  // выбираем фреймы карточки для вывода контента
  const placeName = newPlaceCard.querySelector('.element__title');
  const placeImage = newPlaceCard.querySelector('.element__image');
  // Вставляем новые значения
  placeName.textContent = nameCardValue;
  placeImage.src = imageCardLink;
  placeImage.alt = nameCardValue;
  // из шаблона выбираем кнопки
  const trashButton = newPlaceCard.querySelector('.element__trash');
  const likeButton = newPlaceCard.querySelector('.element__like-button');
  //добавляем на кнопки и фото слушатели
  trashButton.addEventListener('click', () => {
    deleteCard(newPlaceCard)
  });
  likeButton.addEventListener('click', () => {
    toggleLike(likeButton)
  });
  
  placeImage.addEventListener('click', () => {
    fillingPopupImage(newPlaceCard);
    openPopup(popupImage);
  });
  
  //возвращаем готовую карточку
  return newPlaceCard;
}

// 1.Добавление карточек

const initialCards = [
  {
    name: 'Карачаевск',
    link: "./images/kirill-pershin-1088404-unsplash.jpg"
  },
  {
    name: 'Гора Эльбрус',
    link: "./images/kirill-pershin-1404681-unsplash.jpg"
  },
  {
    name: 'Домбай',
    link: "./images/kirill-pershin-1556355-unsplash.jpg"
  },
  {
    name: 'Гора Эльбрус',
    link: "./images/kirill-pershin-1404681-unsplash.jpg"
  },
  {
    name: 'Домбай',
    link: "./images/kirill-pershin-1556355-unsplash.jpg"
  },
  {
    name: 'Карачаево-Черкесия',
    link: "./images/kirill-pershin-1088404-unsplash.jpg"
  },
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
const cardsContainer = document.querySelector('.elements');

// напишем функцию для создания,наполнения карточек и добавления их в контейнер 
function createInitialCards() {
  initialCards.forEach(function(el) { 
    
    // передаем значения объектов массива в функцию создания карточек
    const newCard = createCard(el.name, el.link);
    
    // добавляем в контейнер
    cardsContainer.prepend(newCard);
  });
};

// отображаем на странице
createInitialCards();


// 2.Открытие и закрытие формы добавления карточек

// выбираем нужный Popup
const addCardPopup = document.getElementById('addCard');
// выбираем кнопку открытия Popup
const addCardPopupOpenButton = document.querySelector('.profile__add-button');

// выбираем кнопку закрытия Popup
const addCardPopupCloseButton = document.getElementById('addCardClose');

// напишем функцию для закрытия попапа добавления карточки
const closeAddCardPopup = function () {
  closePopup(addCardPopup)
};

// добавим событие - открытие Popup при клике на кнопку
addCardPopupOpenButton.addEventListener('click', () => {
  openPopup(addCardPopup);
});

// добавим событие - закрытие Popup при клике на кнопку
addCardPopupCloseButton.addEventListener('click', closeAddCardPopup);
// добавим событие - закрытие Popup при клике на оверлей
addCardPopup.addEventListener('click', (event) => closePopupByOverley(event, addCardPopup));


// 3.Добавление карточки

// Находим форму в DOM
const formAddCardPopup = addCardPopup.querySelector('.popup__info');

// Находим поля формы в DOM
const placeInput = document.getElementById('placeName');
const imageInput = document.getElementById('placeImage');

// Обработчик «отправки» формы
function submitAddCardForm (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // передаем значения из полей формы добавления карточек в функцию создания карточек
  const newCard = createCard(placeInput.value, imageInput.value, placeInput.value);

  // добавляем в контейнер
  cardsContainer.prepend(newCard);
   
  // Закрытие Popup
  closeAddCardPopup();

  // очищаем поля  формы после отправки
  formAddCardPopup.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formAddCardPopup.addEventListener('submit', submitAddCardForm);


// 4.Лайк карточки

// напишем функцию для добавления/удаления лайка при клике на кнопку 
function toggleLike(el) { 
  el.classList.toggle('element__like-button_enabled');
};


// 5.Удаление карточки

// напишем функцию удаления карточки
function deleteCard(actualCard) {
  actualCard.remove();
};


// 6.Открытие попапа с картинкой

// найдем попап 
const popupImage = document.getElementById('popupImage');
// найдем кнопку закрытия попапа
const popupImageCloseButton = document.getElementById('popupImageClose');
// выбираем фреймы попапа, в которые будем передавать информацию из карточки
const placeNamePopupImage = popupImage.querySelector('.popup-image__title');
const placeImagePopupImage = popupImage.querySelector('.popup-image__image');

// добавим событие - клик по кнопке закрытия
popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage)
});
// добавим событие - закрытие Popup при клике на оверлей
popupImage.addEventListener('click', (event) => closePopupByOverley(event, popupImage));

// напишем функцию заполнения попапа информацией из карточки
function fillingPopupImage(actualCard) {
  const card = actualCard;
  // выбираем поля карточки, из которых будем передавать информацию в попап
  const nameCard = card.querySelector('.element__title');
  const imageCard = card.querySelector('.element__image');
  // вставляем новые значения с помощью textContent и src
  placeNamePopupImage.textContent = nameCard.textContent;
  placeImagePopupImage.src = imageCard.src;
  placeImagePopupImage.alt =  nameCard.textContent;  
};





























