import React, {useState} from 'react';
import logo from '../images/logo.svg';
import {Link, useLocation} from 'react-router-dom';

const Header = ({isLoggedIn, userInfo, logout}) => {
    const [burgerClose, setBurgerClose] = useState(true);
    const isSignin = useLocation().pathname === '/sign-in';

    return (
        <header className={`header${isLoggedIn ? ' for-user' : ''}${burgerClose ? ' hide-user' : ''}`}>
            <div className="header__cont">
                <img src={logo} className="header__logo" alt="logo"/>

                <div className={`burger-menu${burgerClose ? '' : ' close'}`} onClick={() => setBurgerClose(!burgerClose)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            {
                isLoggedIn ?
                    <div className="user__info">
                        <span>{userInfo?.email}</span>
                        <button onClick={logout}>Выйти</button>
                    </div>
                    :
                    <div className="header__links">
                        {
                            isSignin ?
                                <Link className="entrance" to="/sign-up">Регистрация</Link>
                                :
                                <Link className="entrance" to="/sign-in">Войти</Link>
                        }
                    </div>
            }
        </header>
    );
}

export default Header;
 