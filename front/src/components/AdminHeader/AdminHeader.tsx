import {FC, useContext} from "react";
import styles from "./AdminHeader.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {AuthService} from "../../api/Services/AuthService";
// import {AuthContext} from "../../App";
import {useAuth} from "../../hooks/useAuth";

const AdminHeader: FC = ()=> {
    const userService = new AuthService()
    const {setIsAdmin, setUserId} = useAuth()
    const nav = useNavigate()
    return(
        <div className={styles.Header}>
            <div className={styles.header__inner}>
                <Link to="/"><img src="/img/logo.png" alt="" width={100} height={100}/></Link>

                <div className={styles.header__text}>
                    <Link to="/">Главная</Link>
                    <a href="/sosiEsLint" onClick={(e) => {
                        e.preventDefault()
                        setUserId(0)
                        setIsAdmin(false)
                        userService.logout()
                        nav("/")
                    }}>Выйти</a>
                </div>

            </div>
        </div>
    )
}

export default AdminHeader