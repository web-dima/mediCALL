import {Link, useNavigate} from "react-router-dom"
import {useState} from "react";
import axios from "axios";

const Login = ()=> {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    async function submitHandler(e) {
        e.preventDefault()

        const data = await axios.post("http://127.0.0.1:8000/login/user")
        console.log(data)
        // authService.login({email,password}).then((result)=> {
        //     if (typeof result === "number") {
        //         context.setUserId(result)
        //         navigate("/")
        //     } else {
        //         alert(result)
        //     }
        // })
    }

    return(
        <div>
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