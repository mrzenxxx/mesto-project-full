import React from 'react';
import Card from './Card'
import addProfile from '../images/profile-add-image.svg';
import currentUserContext from "../contexts/CurrentUserContext"

const Main = (props) => {
    const currentUser = React.useContext(currentUserContext); // подписываем его на CurrentUserContext и получаем значение контекста.
    //Используйте его поля name, about и avatar вместо стейт-переменных userName, userDescription и userAvatar, соответственно.
    return (
        <main className="content">
            <section className="profile">
                <div className="profile__block">
                    <div className="profile__block-img" onClick={props.handleEditAvatarClick}>
                        <img className="profile__avatar"
                            src={currentUser.avatar}
                            alt="аватарка"
                        />
                    </div>
                </div>
                <div className="profile__info">

                    <h1 className="profile__title"> {currentUser.name} </h1>

                    <button onClick={props.handleEditProfileClick}
                        className="profile__edit-button profile__open-button"
                        aria-label="Edit" type="button" />
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>

                <button onClick={props.handleAddPlaceClick}
                    className="profile__add-button profile__open-button"
                    type="button">
                    <img className="profile__add-image" src={addProfile}
                        alt="Кнопка добавления новых записей"
                    />
                </button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                    // Без указания атрибута `key`, React выдаст предупреждение об его отсутствии
                    <React.Fragment key={card._id}>
                        <Card key={card._id} card={card} onCardClick={(card) => props.handleCardClick(card)} onCardLike={() => props.onCardLike(card)} onCardDelete={() => props.onCardDelete(card)} />
                    </React.Fragment>
                ))}
            </section>
        </main>
    );
}

export default Main;