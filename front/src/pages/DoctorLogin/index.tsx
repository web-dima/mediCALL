import React, {FC, useState} from "react";
import styles from "./DoctorLogin.module.scss"
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {AuthDoctorService} from "../../api/Services/AuthDoctorService";

const DoctorLogin: FC = ()=> {
    const authService = new AuthDoctorService()
    const context = useAuth()
    const navigate = useNavigate()
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")

    function submitHandler(e) {
        e.preventDefault()
        authService.login({code,password}).then((result)=> {
			if (typeof result === "string") {
				alert(result)
				return
			}

            context.setUserId(result.id)
            context.setIsDoctor(true)
            navigate("/doctor")
        })
    }

    return(
        <div className={styles.Login} style={{width: "400px", margin: "0 auto"}}>

            <Form onSubmit={submitHandler} >
                <Form.Group className="mb-3">
                    <Form.Label>Введите ваш код доступа</Form.Label>
                    <Form.Control value={code} onChange={(e)=> setCode(e.target.value)} type="text" placeholder="введите code" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="введите пароль" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Войти
                </Button>
            </Form>
        </div>
    )
}

export default DoctorLogin