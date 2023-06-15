import {FC, useEffect, useState} from "react";
import styles from "./Header.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {UserService} from "../../api/Services/UserService";
import {useAuth} from "../../hooks/useAuth";
import {AxiosTypes} from "../../api/axios/types";
import {AuthDoctorService} from "../../api/Services/AuthDoctorService";

const Header: FC = ()=> {
    const {userId, setUserId} = useAuth()
    const [headerLinks, setHeaderLinks]  = useState<any>()
    console.log(userId)
    const docToken = localStorage.getItem(`${AxiosTypes.doctors}_token`)
    let userService:AuthDoctorService|UserService;
    if (docToken) {
        userService = new AuthDoctorService()
    } else {
        userService = new UserService()
    }
    const nav = useNavigate()

    // console.log(userService.me())
    useEffect(function (){
        if (userId || docToken) {
            userService.me().then((data)=>{
                // console.log(data)
                const admin = data.role === "admin" ? <Link to="/admin">Админ панель</Link> : null
                const doctor = data.code ? <Link to="/doctor">Врачебная панель</Link> : null
                // console.log(doctor)
                // console.log(data)
                const userLinks = (
                    <>
                        <Link to="/">Главная</Link>
                        {admin}
                        {doctor}
                        <Link to="/profile">Профиль</Link>
                        <a href="/sosiEsLint" onClick={(e) => {
                            e.preventDefault()
                            userService.logout()
                            setUserId(0);
                            setUserId(0);
                            nav("/")
                        }}>Выйти</a>
                    </>
                )

                setHeaderLinks(userLinks)
            })
        } else {
            const guestLinks = (
                <>
                    <Link to="login">Войти</Link>
                    <Link to="register">Зарегистрироваться</Link>
                </>
            )
            setHeaderLinks(guestLinks)
        }

    },[userId])

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