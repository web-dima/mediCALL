import React, {FC, useEffect, useRef, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {ServiceService} from "../../api/Services/ServiceService";
import {DoctorsService} from "../../api/Services/DoctorsService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const RegisterDoctor: FC = ()=> {
    const nav = useNavigate()
    const doctorService = new DoctorsService()
    const [service_id, setServId] = useState("")
    const [servList, setServList] = useState([])
    const [fio, setFio] = useState("")
    const imgRef = useRef<HTMLInputElement>(null)
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")

    const servService = new ServiceService();

    useEffect(()=>{
        servService.getServices().then((data)=>{
            console.log(data)
            setServList(data)
        })
    }, [])

    function submitHandler(e) {
        e.preventDefault()
        doctorService.createDoctor({service_id,fio, img: imgRef, code, password})
            .then(data => {
                console.log(data)
                alert("успешно")
            })
            .catch(e => {
                console.log(e)
            })
    }


    return(
        <div style={{width: "400px", margin: "0 auto"}}>
            <h1>Регистрация врача</h1>
            <Form onSubmit={submitHandler} >
                <Form.Group className="mb-3">
                    <Form.Label>выберите специализацию врача</Form.Label>
                    <Form.Select defaultValue={service_id} onChange={(e)=> setServId(e.target.value)}>
                        <option value="" disabled>открыть</option>
                        {servList.map(serv => {
                            return <option value={serv.id} key={serv.id}>{serv.name}</option>
                        })}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>ФИО врача</Form.Label>
                    <Form.Control value={fio}
                                  onChange={(e)=> setFio(e.target.value)}
                                  type="text"
                                  placeholder="Введите ФИО" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>фото врача</Form.Label>
                    <Form.Control ref={imgRef}
                                  type="file"
                                  accept="image/png, image/gif, image/jpeg" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Код для авторизации</Form.Label>
                    <Form.Control value={code}
                                  onChange={(e)=> setCode(e.target.value)}
                                  type="text"
                                  placeholder="Введите код для авторизации врача" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control value={password}
                                  onChange={(e)=> setPassword(e.target.value)}
                                  type="password"
                                  placeholder="введите пароль" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Создать врача
                </Button>
            </Form>
            {/*<form onSubmit={submitHandler}>*/}
            {/*    <select defaultValue={service_id} onChange={(e)=> setServId(e.target.value)}>*/}
            {/*        <option value="" disabled>выберите специализацию</option>*/}
            {/*        {servList.map(serv => {*/}
            {/*            return <option value={serv.id} key={serv.id}>{serv.name}</option>*/}
            {/*        })}*/}
            {/*    </select>*/}
            {/*    <input*/}
            {/*        value={fio}*/}
            {/*        onChange={(e)=> setFio(e.target.value)}*/}
            {/*        type="text"*/}
            {/*        placeholder="введите ФИО"*/}
            {/*    />*/}
            {/*    <input*/}
            {/*        ref={imgRef}*/}
            {/*        type="file"*/}
            {/*        accept="image/png, image/gif, image/jpeg"*/}
            {/*    />*/}
            {/*    <input*/}
            {/*        value={code}*/}
            {/*        onChange={(e)=> setCode(e.target.value)}*/}
            {/*        type="text"*/}
            {/*        placeholder="введите код для авторизации врача"*/}
            {/*    />*/}
            {/*    <input*/}
            {/*        value={password}*/}
            {/*        onChange={(e)=> setPassword(e.target.value)}*/}
            {/*        type="password"*/}
            {/*        placeholder="введите пароль"*/}
            {/*    />*/}
            {/*    <button>Войти</button>*/}
            {/*</form>*/}
        </div>
    )
}

export default RegisterDoctor