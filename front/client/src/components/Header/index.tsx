import {FC, useContext, useEffect, useState} from "react";
import styles from "./Header.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../App";
import {UserService} from "../../api/Services/UserService";
import {useAuth} from "../../hooks/useAuth";

const Header: FC = ()=> {
    const {userId, setUserId} = useAuth()
    console.log(userId)
    const nav = useNavigate()
    const userService = new UserService()

    const userLinks = (
        <>
            <Link to="/">главная</Link>
            <Link to="/profile">Профиль</Link>
            <a href="/sosiEsLint" onClick={(e) => {
                e.preventDefault()
                userService.logout()
                setUserId(0);
                nav("/")
            }}>Выйти</a>
        </>
    )

    const guestLinks = (
        <>
            <Link to="login">Войти</Link>
            <Link to="register">Зарегистрироваться</Link>
        </>
    )

    const headerLinks = userId ? userLinks : guestLinks
    return(
        <div className={styles.Header}>
                <div className={styles.header__inner}>
                    <Link to="/"><img src="/img/logo.png" alt="" width={100} height={100}/></Link>

                    <div className={styles.header__text}>
                        {headerLinks}
                    </div>

                </div>
        </div>
    )
}

export default Header