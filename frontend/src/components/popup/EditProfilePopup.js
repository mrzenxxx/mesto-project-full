import React, {useState} from 'react';
import PopupWithForm from "../PopupWithForm";
import currentUserContext from "../../contexts/CurrentUserContext"

const EditProfilePopup = (props) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const currentUser = React.useContext(currentUserContext);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
         //добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их управляемыми. 
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }
//// После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    return (
        <PopupWithForm
            name="profile"
            isOpen={props.isOpen}
            onClose={() => props.onClose()}
            title="Редактировать профиль"
            handleSubmit={(e) => handleSubmit(e)}
            buttonTitle = { 'Сохранить' }
        >
            <label>
                <input
                    value={ name || ''}
                    onChange={(e) => setName(e.target.value)} //Не забудьте про обработчики onChange.
                    type="text"
                    name="userName"
                    className="popup__input popup__input_type_name" id="nameInput"
                    required
                    placeholder="Ваше имя" minLength="2" maxLength="40"
                />
                <span className='popup__error' id="nameInputError"/>
            </label>
            <label>
                <input
                    value={description || ''}
                    onChange={(e) => setDescription(e.target.value)}//Не забудьте про обработчики onChange.
                    type="text"
                    name="userJob"
                    className="popup__input popup__input_type_work" id="aboutInput"
                    required
                    placeholder="Ваша профессия" minLength="2" maxLength="200"
                />
                <span className='popup__error' id="aboutInputError"/>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup