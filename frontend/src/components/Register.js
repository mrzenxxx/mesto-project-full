import React from "react";
import {Link, useNavigate} from "react-router-dom";
import authentication from "../utils/Authentication";

const Register = (props) => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        authentication.addNewUser({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }).then(() => {
            props.showResultPopup(true);
            navigate('/sign-in');
        }).catch((err) => {
            props.showResultPopup(false);
            console.log(`Error: ${err}`);
        });
        return;
    }

    return (
        <form className="entrance__form" name="login" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <h2 className="entrance__title">Регистрация</h2>

                <label>
                    <input
                        ref={emailRef}
                        type="email"
                        name="email"
                        className="entrance__field"
                        required
                        placeholder="Email"
                    />
                </label>
                <label>
                    <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        className="entrance__field"
                        required
                        placeholder="Пароль"
                    />
                </label>
            </div>

            <div>
                <button className="entrance__button popup__button popup__button_submit popup__button_disabled"
                        type="submit"
                        value="submit">
                    Зарегистрироваться
                </button>
                <a className="entrance__button entrance__link">
                    <Link to="/sign-in">Уже зарегистрированы? Войти</Link>
                </a>
            </div>
        </form>
    );
}

export default Register;