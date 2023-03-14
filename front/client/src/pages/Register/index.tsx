import {FC, useContext, useState} from "react";
import styles from "./Register.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {AuthService} from "../../api/Services/AuthService";
import {AuthContext} from "../../App";

const Register: FC = ()=> {
    const context = useContext(AuthContext);
    const navigate = useNavigate()
    // if (context.auth) navigate("/");

    const authService = new AuthService()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function submitHandler(e) {
        e.preventDefault()
        authService.register({name,email,password}).then((result)=> {
            if (typeof result === "number") {
                context.setUserId(result)
                navigate("/")
            } else {
                alert(result)
            }
        })
    }

    return(
        <div className={styles.Register}>
            <form onSubmit={submitHandler}>
                <input value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="введите имя"/>
                <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="введите email"/>
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="введите пароль"/>
                <button>Зарегистрироваться</button>
            </form>
            <span>есть аккаунт?<Link to="../login">Войдите</Link></span>
        </div>
    )
}

export default Register