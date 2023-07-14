import React from "react";
import errorIcon from '../images/popup__error.svg';
import successIcon from '../images/popup__success.svg';

function InfoTooltip({ isSuccess, isOpen, onClose }) {

  const infoIcon = isSuccess ? successIcon : errorIcon;
  const iconName = isSuccess ? `Успех` : `Ошибка`;
  const infoText = isSuccess ? `Вы успешно зарегистрировались!` : `Что-то пошло не так!
  Попробуйте ещё раз.`;


  return (
    <div className={`popup popup_infoTooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <img className="popup__auth-icon" src={infoIcon} alt={iconName}></img>
        <h2 className="popup__message">{infoText}</h2>
      </div>
      <button type="button" className="popup__close-btn" onClick={onClose}></button>
    </div>
  )
}

export default InfoTooltip;