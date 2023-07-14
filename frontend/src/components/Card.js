import React from "react";
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = (
    `post__like-btn ${isLiked && 'post__like-btn_pushed'}`
  )

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    console.log('клик по лайку')
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card._id)
  }


  return (
    <article className="post">
      {isOwn && <button className='post__del-btn' onClick={handleDeleteClick} />}
      <span className="post__photo-container" onClick={handleClick}>
        <img className="post__photo" src={card.link} alt={card.name} />
      </span>
      <h2 className="post__title">{card.name}</h2>
      <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}>{card.likes.length}</button>
    </article>
  )
}

export default Card;