export class Card {
  
  constructor(name, link, templateSelector, fillingPopupImage, openPopup, popupImage, closePopup, popupImageCloseButton, closePopupByOverley) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._fillingPopupImage = fillingPopupImage;
    this._openPopup = openPopup;
    this._popupImage = popupImage;
    this._closePopup = closePopup;
    this._popupImageCloseButton = popupImageCloseButton;
    this._closePopupByOverley = closePopupByOverley;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

      return cardElement;
  }
  
  _deleteCard = () => {
    this._element.remove();
  }

  _toggleLike = () => {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_enabled');
  }

  _handleCardClick = () => {
    this._fillingPopupImage(this._element);
    this._openPopup(popupImage); 
  }

  _handleCloseButtonClick = () => {
    this._closePopup(popupImage);
  }


  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');

    // добавим данные карточки
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    // добавим удаление карточки
    this._element.querySelector('.element__trash').addEventListener('click', this._deleteCard);
    // добавим функционал для кнопки лайка
    this._element.querySelector('.element__like-button').addEventListener('click', this._toggleLike);
    // добавим открытие попапа  при клике на картинку
    this._elementImage.addEventListener('click', this._handleCardClick);
    // добавим закрытие попапа  при клике на крестик
    this._popupImageCloseButton.addEventListener('click', this._handleCloseButtonClick);
    // добавим закрытие попапа  при клике на оверлей
    this._popupImage.addEventListener('click', (event) => this._closePopupByOverley(event, this._popupImage));

    return this._element;
  }

}