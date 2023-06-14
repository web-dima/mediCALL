import React, {FC, useState} from "react";
import styles from "./Register.module.scss"
import {Link, useNavigate} from "react-router-dom";
import {AuthService} from "../../api/Services/AuthService";
import {UserRole} from "../../api/Types/UserRole";
import {useAuth} from "../../hooks/useAuth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register: FC = ()=> {
    const context = useAuth()
    const navigate = useNavigate()
    // if (context.auth) navigate("/");

    const authService = new AuthService()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function submitHandler(e) {
        e.preventDefault()
        authService.register({name,email,password}).then((result)=> {
			if (typeof result === "string") {
				alert(result)
				return
			}
            if (result.role === UserRole.admin) {
                context.setUserId(result)
                navigate("/admin")
            } else {
                context.setUserId(result)
                navigate("/")
            }
        })
    }

    return(
        <div className={styles.Register} style={{width: "400px", margin: "0 auto"}}>
            <Form onSubmit={submitHandler} >
                <Form.Group className="mb-3">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="введите имя" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(e)=> setEmail(e.target.value)} type="email" placeholder="введите email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="введите пароль" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Зарегистрироваться
                </Button>
            </Form>
            <span>есть аккаунт?<Link to="../login">Войдите</Link></span>
        </div>
    )
}

export default Register