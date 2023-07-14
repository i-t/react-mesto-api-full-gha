import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { CurrentUserContext } from '../context/CurrentUserContext';
import loadingIcon from '../images/loading.svg';

import Header from './Header';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';

import * as api from '../utils/Api';
import * as apiAuth from '../utils/apiAuth';


function App() {

  const
    [isSuccess, setSuccess] = useState(false),
    [isLoading, setIsLoading] = useState(true),
    [isLoggedIn, setLoggedIn] = useState(false),
    [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false),
    [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false),
    [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false),
    [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false),

    [userEmail, setUserEmail] = useState(""),
    // [errorMessage, setErrorMessage] = useState(""),

    [selectedCard, setSelectedCard] = useState({}),
    [currentUser, setCurrentUser] = useState({}),
    [cards, setCards] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      apiAuth.checkToken(jwt)
        .then((res) => {
          setUserEmail(res.email);
          setLoggedIn(true);
          navigate('/', { replace: true });
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false);
    }
  }, [navigate])


  function handleSignUp(email, password) {
    apiAuth.signUp(email, password)
      .then((res) => {
        if (res.email) {
          setSuccess(true);
          navigate('/sign-in', { replace: true })
          setInfoTooltipOpen(true);
        }
        return
      })
      .catch((err) => {
        console.log(err)
        // setErrorMessage(err);
        setSuccess(false);
        setInfoTooltipOpen(true);
      })
  }

  function handleSignIn(email, password) {
    apiAuth.signIn(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate('/', { replace: true })
        }
      })
      .catch((err) => {
        console.log(err);
        setSuccess(false);
        setInfoTooltipOpen(true);
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt')
    setLoggedIn(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function closeAllPopups() {
    setInfoTooltipOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard({})
  }


  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(id) {
    api.deleteCard(id)
      .then(() => {
        setCards(cards.filter((card) => id !== card._id));
      })
      .catch(err => console.log(err))
  }

  function handleUpdateUser(data) {
    api.setUserData(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  function handleAddPlaceSubmit(newCard) {
    api.createCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    Promise.all([
      api.getCurrentUser(),
      api.getCards()
    ])
      .then(([user, items]) => {
        setCurrentUser(user);
        setCards(items);
      })
      .catch(err => console.log(err))
  }, [isLoggedIn])

  if (isLoading) {
    return (
      <div className="root">
        <img
          className="root__loading"
          src={loadingIcon}
          alt="Загрузка..."
        ></img>
      </div>
    )
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header
          logout={handleLogout}
          navigate={navigate}
          userEmail={userEmail}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                auth={handleSignUp}
                isLoggedIn={isLoggedIn}
              />}
          ></Route>
          <Route
            path="/sign-in"
            element={
              <Login
                auth={handleSignIn}
                isLoggedIn={isLoggedIn}
              />}
          ></Route>

          {/* <Route
            path="*"
            component=
            {isLoggedIn ?
              navigate('/', { replace: true })
              :
              navigate('/sign-up', { replace: true })
              <Navigate to="/" replace />
              :
              <Navigate to="/sign-up" replace />
            }></Route> */}

          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                cards={cards}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                component={Main}
              />}
          ></Route>
        </Routes>

        <Footer />

        <InfoTooltip
          isSuccess={isSuccess}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        // errorMessage={errorMessage}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;
