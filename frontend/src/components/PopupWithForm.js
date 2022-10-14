import React from 'react';

const PopupWithForm = ({name, isOpen, onClose, title, children, handleSubmit, buttonTitle, }) => {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    className="popup__close-btn"
                    type="button" onClick={onClose}
                >
                </button>
                <form className={`popup__form popup__form_${name}`} name={`form_${name}`} onSubmit={(e) => handleSubmit(e)} >
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className="popup__button popup__button_submit popup__button_disabled" type="submit"
                            valuue="sbmit">
                        { buttonTitle } 
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm
