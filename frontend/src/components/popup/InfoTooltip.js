import React from 'react';
import abort from '../../images/abort.svg';
import success from '../../images/success.svg';

const InfoTooltip = ({isOpen, onClose, isSuccess}) => {
    return(
        <div className={`popup popup_type_result ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button
                    className="popup__close-btn"
                    type="button" onClick={onClose}
                >
                </button>

                <div className="cont">
                    <img src={
                        isSuccess ? success : abort
                    } alt={isSuccess ? 'Успех' : 'Что-то не так'}/>
                    <div className="text">
                        {
                            isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;