import PopupWithForm from './PopupWithForm';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen])

  function handleChangeName(e) {
    setName(e.target.value)
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }


  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit_profile'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="username"
        name="name"
        className="popup__input popup__input_edit_username"
        type="text"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name || ''}
        onChange={handleChangeName}
      />
      <span
        className="username-error popup__text-error">
        Вы пропустили это поле.
      </span>
      <input
        id="subtext"
        name="about"
        className="popup__input popup__input_edit_subtext"
        type="text"
        placeholder="Описание"
        minLength="2"
        maxLength="200"
        required
        value={about || ''}
        onChange={handleChangeAbout}
      />
      <span
        className="subtext-error popup__text-error">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;