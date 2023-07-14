import React from "react";

function PopupWithForm({ title, name, buttonText, isOpen, onClose, onSubmit, children }) {

  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form name={name} className="popup__form" method="get" action="#" noValidate onSubmit={onSubmit}>
          {children}
          <button className="popup__save-btn" type="submit">{buttonText}</button>
        </form>
      </div>
      <button type="button" className="popup__close-btn" onClick={onClose}></button>
    </div>
  )
}

export default PopupWithForm;