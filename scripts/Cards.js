export class Card {
  
  constructor(name, link, templateSelector, handleCardClick) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
    this._handleCardClick = handleCardClick;
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
    this._likeButton.classList.toggle('element__like-button_enabled');
  }

  _setEventListeners = () => {
    // добавим удаление карточки
    this._element.querySelector('.element__trash').addEventListener('click', this._deleteCard);
    // добавим функционал для кнопки лайка
    this._likeButton.addEventListener('click', this._toggleLike);
    // добавим открытие попапа  при клике на картинку
    this._elementImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._likeButton = this._element.querySelector('.element__like-button');


    // добавим данные карточки
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._setEventListeners();
    
    return this._element;
  }

}