import React from 'react';
import PopupWithForm from "../PopupWithForm";

const AddPlacePopup = (props) => {
    const nameRef = React.createRef();
    const imageLinkRef = React.createRef();


    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name: nameRef.current.value,
            link: imageLinkRef.current.value,
        });

    }

    React.useEffect(() => {
        nameRef.current.value = '';
        imageLinkRef.current.value = '';
    }, [props.isOpen]
    )

    return (
        <PopupWithForm
            name="mesto"
            isOpen={props.isOpen}
            onClose={() => props.onClose()}
            title="Новое место"
            handleSubmit={(e) => handleSubmit(e)}
            buttonTitle={'Сохранить'}
        >
            <label>
                <input
                    ref={nameRef}
                    type="text"
                    name="name"
                    className="popup__input popup__input_image_name"
                    id="imageInput"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    required
                />
                <span className="popup__error" id="imageInputError" />
            </label>
            <label>
                <input
                    ref={imageLinkRef}
                    type="url" name="link"
                    className="popup__input popup__input_image_src"
                    id="srcInput"
                    placeholder="Ссылка на картинку"
                    required
                />
                <span className="popup__error" id="srcInputError" />
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup