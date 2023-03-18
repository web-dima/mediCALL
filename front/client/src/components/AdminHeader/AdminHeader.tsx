import {FC, useContext} from "react";
import styles from "./AdminHeader.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {AuthService} from "../../api/Services/AuthService";
import {AuthContext} from "../../App";
import {useAuth} from "../../hooks/useAuth";

const AdminHeader: FC = ()=> {
    const userService = new AuthService()
    const {setIsAdmin, setUserId} = useAuth()
    const nav = useNavigate()
    return(
        <div className={styles.AdminHeader}>
            <Link to="admin">Админ панель</Link>
            <a href="/sosiEsLint" onClick={(e) => {
                e.preventDefault()
                setUserId(0)
                setIsAdmin(false)
                userService.logout()
                nav("/")
            }}>Выйти</a>
        </div>
    )
}

export default AdminHeader