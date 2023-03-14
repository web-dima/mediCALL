import {FC, useContext, useState} from "react";
import styles from "./Header.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../../App";
import {UserService} from "../../api/Services/UserService";

const Header: FC<{adminHeader:boolean}> = ({adminHeader})=> {
    const {userId, setUserId} = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false)

    const nav = useNavigate()
    const userService = new UserService()
    userService.me().then(data => setIsAdmin(data.role === "admin")).catch(e=> console.log(e))

    const adminLinks = (
        <>
            <Link to="admin">Админ панель</Link>
        </>
    )

    const userLinks = (
        <>
            <Link to="/">главная</Link>
            <Link to="">Профиль</Link>
            <a href="/sosiEsLint" onClick={(e) => {
                e.preventDefault()
                userService.logout()
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

    const adminchickhueta = (
        <div className={styles.Header}>
            {userId ? userLinks : guestLinks}
        </div>
    )

    const userhueta = (
        <div className={styles.Header}>
            {isAdmin ? adminLinks : ""}
            {userId ? userLinks : guestLinks}
        </div>
    )

    const header = adminHeader ? adminchickhueta : userhueta

    return(
        <>
            {header}
        </>
    )
}

export default Header