import {useEffect, useState} from 'react'; 
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import currentUserContext from "../contexts/CurrentUserContext"
import EditProfilePopup from "../components/popup/EditProfilePopup"
import EditAvatarPopup from "../components/popup/EditAvatarPopup"
import AddPlacePopup from "../components/popup/AddPlacePopup"

import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';

import Login from "./Login";
import Register from "./Register";
import authentication from "../utils/Authentication";
import InfoTooltip from "./popup/InfoTooltip";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [isLoginSuccess, setIsLoginSuccess] = useState(false);
    const emptyCard = {
        name: '',
        link: ''
    }
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltip, setIsInfoTooltip] = useState(false);
    const [selectedCard, setSelectedCard] = useState(emptyCard);
    const [currentUser, setCurrentUser] = useState({});
    const [currentUserInfo, setCurrentUserInfo] = useState({});
    const [cards, setCards] = useState([]);

    const navigate = useNavigate();

    function onAddPlace() {
        setIsAddPlacePopupOpen(true);
    }

    function onEditProfile() {
        setIsEditProfilePopupOpen(true);
    }

    function onEditAvatar() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltip(false);
        setSelectedCard(emptyCard);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleUpdateUser(props) {
        api.patchUserProfile(props).then((updatedUser) => {
            setCurrentUser(updatedUser);
            closeAllPopups();
        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
    }

    function handleUpdateAvatar(props) {
        api.patchNewAvatar(props).then((updatedUser) => {
            setCurrentUser(updatedUser);
            closeAllPopups();
        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
        return;
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setCards((state) =>  state.filter((c) => c._id !== card._id));//После запроса в API, обновите стейт cards с помощью метода filter: 
                                                                         //создайте копию массива, исключив из него удалённую карточку.
        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
        return;
    }

    function handleAddPlaceSubmit(card) {
        api.postNewCard(card).then((newCard) => {
            setCards((state) => [newCard, ...state]); //После завершения API-запроса внутри него обновите стейт cards с помощью расширенной копии текущего массива
                                                      // — используйте оператор ...:
            closeAllPopups();
        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
        return;
    }

    function handleTokenCheck() {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            // проверяем токен пользователя
            authentication.checkToken(token).then((res) => {
                setLoggedIn(true);
                setCurrentUserInfo(res.data);
                navigate('/');
            });
        }
    }

    function loginUser(data) {
        localStorage.setItem('token', data.token);

        handleTokenCheck();
    }

    function logout() {
        localStorage.removeItem('token');
        setLoggedIn(false);
        setCurrentUserInfo({});
        navigate('/sign-in');
    }

    function showResultPopup(res) {
        setIsLoginSuccess(res);
        setIsInfoTooltip(true);
    }

    useEffect(() => {
        api.getUserInfo().then((userInfo) => {
            setCurrentUser(userInfo);
        }).catch((err) => {
            console.log(`Error: ${err}`);
        });

        api.getInitialCards().then((cardsArray) => {//Поднимите стейт cards
            setCards(cardsArray);
        }).catch((err) => {
            console.log(`Error: ${err}`);
        });

        handleTokenCheck();
    }, []);

    return (
        <currentUserContext.Provider value={currentUser}>
            <div className="App">
                <Header isLoggedIn={loggedIn} userInfo={currentUserInfo} logout={logout}/>
                <div className="page-content">
                        <Routes>
                            <Route path="/sign-up" element={<Register showResultPopup={showResultPopup}  />} />
                            <Route path="/sign-in" element={<Login loginSuccessful={loginUser} showResultPopup={showResultPopup} />} />
                            <Route path="/" element={loggedIn ?
                                <Main
                                    handleAddPlaceClick={onAddPlace}
                                    handleEditAvatarClick={onEditAvatar}
                                    handleEditProfileClick={onEditProfile}
                                    handleCardClick={handleCardClick}
                                    cards={cards}
                                    onCardLike={handleCardLike}
                                    onCardDelete={handleCardDelete}
                                />
                                : <Navigate to="/sign-in" />}
                            >
                            </Route>
                        </Routes>
                </div>
                <Footer/>

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}//После завершения запроса обновите стейт currentUser
                    //из полученных данных и закройте все модальные окна.
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

                <InfoTooltip
                    isOpen={isInfoTooltip}
                    isSuccess={isLoginSuccess}
                    onClose={closeAllPopups}
                />

                <div className="popup popup_confirm">
                    <div className="popup__container popup__container_confirm">
                        <button className="popup__close-btn popup__close-btn_confirm" type="button"/>
                        <form className="popup__form popup__form_confirm" name="confirmForm"/>
                        <h2 className="popup__title">Вы уверены?</h2>
                        <button className="popup__button popup__button_submit" type="submit" name="confirm">
                            Да
                        </button>
                    </div>
                </div>
            </div>
        </currentUserContext.Provider>
    );
}

export default App;
