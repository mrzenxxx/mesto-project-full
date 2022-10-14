import React from "react";
import authentication from "../utils/Authentication";

const Login = (props) => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    function handleSubmit(e) {
        e.preventDefault();

        authentication.loginUser({
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }).then((data) => {
            props.loginSuccessful(data);
            //props.showResultPopup(true);
        }).catch((err) => {
            props.showResultPopup(false);
            console.log(`Error: ${err}`);
        });
        return;
    }

    return (
        <form className="entrance__form" name="login" onSubmit={(e) => handleSubmit(e)}>
            <div>
                <h2 className="entrance__title">Вход</h2>

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
                    Войти
                </button>
            </div>
        </form>
    );
}

export default Login;