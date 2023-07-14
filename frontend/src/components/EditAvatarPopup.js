import PopupWithForm from './PopupWithForm';
import { useEffect, useRef } from 'react';


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const ref = useRef();

  useEffect(() => {
    ref.current.value = ''
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: ref.current.value });
  }


  return (
    <PopupWithForm
      title='Обновить аватар'
      name='edit_avatar'
      buttonText='Сохранить'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="avatar"
        name="avatar"
        className="popup__input popup__input_edit_avatar"
        type="url"
        placeholder="Ссылка на изображение"
        required
        ref={ref}
      />
      <span
        className="avatar-error popup__text-error">
        Введите ссылку на изображение.
      </span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;