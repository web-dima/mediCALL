import React, {FC, useState} from "react";
import styles from "./Login.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {AuthService} from "../../api/Services/AuthService";
import {UserRole} from "../../api/Types/UserRole";
import {useAuth} from "../../hooks/useAuth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login: FC = ()=> {
    const authService = new AuthService()
    const context = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    function submitHandler(e) {
        e.preventDefault()
        authService.login({email,password}).then((result)=> {
			if (typeof result === "string") {
				alert(result)
				return
			}
            if (result.role === UserRole.admin) {
                context.setIsAdmin(true)
                context.setUserId(result.id)
                navigate("/admin")
            } else {
                context.setUserId(result.id)
                navigate("/")
            }
        })
    }

    return(
        <div className={styles.Login} style={{width: "400px", margin: "0 auto"}}>

            <Form onSubmit={submitHandler} >
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="введите email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="введите пароль" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Войти
                </Button>
            </Form>
            <span>нет аккаунта?<Link to="../register">Зарегистрируйтейсь</Link></span>
        </div>
    )
}

export default Login