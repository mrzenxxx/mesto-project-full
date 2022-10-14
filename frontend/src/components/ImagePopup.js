import React from 'react';

const ImagePopup = (props) => {
    return (
        <div className={'popup popup_image' + (props.card.link && ' popup_opened')}>
            <figure className="figure">
                <button className="popup__close-btn popup__close-btn_image" type="button" onClick={props.onClose} />
                <img src={props.card.link} alt={props.card.name} className="figure__image" />
                <figcaption className="figure__caption">{props.card.name}</figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup
