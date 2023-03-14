import {FC, useContext, useState} from "react";
import styles from "./Login.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {AuthService} from "../../api/Services/AuthService";
import {AuthContext} from "../../App";

const Login: FC = ()=> {
    const authService = new AuthService()
    const context = useContext(AuthContext);
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    function submitHandler(e) {
        e.preventDefault()
        authService.login({email,password}).then((result)=> {
            if (typeof result === "number") {
                context.setUserId(result)
                navigate("/")
            } else {
                alert(result)
            }
        })
    }

    return(
        <div className={styles.Login}>
            <form onSubmit={submitHandler}>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="введите email"/>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="введите пароль"/>
                <button>Войти</button>
            </form>
            <span>нет аккаунта?<Link to="../register">Зарегистрируйтейсь</Link></span>
        </div>
    )
}

export default Login