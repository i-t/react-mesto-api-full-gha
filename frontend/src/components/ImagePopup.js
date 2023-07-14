function ImagePopup({card, onClose}) {

  return (
    <div className={`popup popup_open_photo ${card.name ? 'popup_opened' : ''}`}>
      <figure className="popup__figure">
        <img className="popup__photo" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
      <button type="button" className="popup__close-btn" onClick={onClose}></button>
    </div>
  )
}

export default ImagePopup;
