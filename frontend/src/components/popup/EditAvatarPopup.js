import React, { useState } from 'react';
import PopupWithForm from "../PopupWithForm";

const EditAvatarPopup = (props) => {
    const [imageLink, setImageLink] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: imageLink, 
        });
    }

    React.useEffect(() => {
        setImageLink('');
    }, [props.isOpen]);

    return (
        <PopupWithForm
            name="avatar" title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={() => props.onClose()}
            handleSubmit={(e) => handleSubmit(e)}
            buttonTitle={'Сохранить'}
        >
            <label className="popup__field">
                <input
                    value={imageLink}
                    onChange={(e) => setImageLink(e.target.value)}
                    type="url"
                    className="popup__input popup__input_avatar"
                    id="avatar"
                    name="avatar"
                    required
                    placeholder="Ссылка на картинку"
                />
                <span className="popup__error" id="avatarError" />
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup