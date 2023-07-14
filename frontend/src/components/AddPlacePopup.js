import PopupWithForm from './PopupWithForm';
import { useState } from 'react';


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
  }


  return (
    <PopupWithForm
      name='add_post'
      title='Новое место'
      buttonText='Создать'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="title"
        name="name"
        className="popup__input popup__input_add_title"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={handleChangeName}
      />
      <span
        className="title-error popup__text-error">
        Вы пропустили это поле.
      </span>
      <input
        id="photo"
        name="link"
        className="popup__input popup__input_add_photo"
        type="url"
        placeholder="Ссылка на изображение"
        required
        value={link}
        onChange={handleChangeLink}
      />
      <span
        className="photo-error popup__text-error">
        Введите ссылку на изображение.</span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;