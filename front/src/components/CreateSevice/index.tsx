import React, {FC, useRef, useState} from "react";
import styles from "./CreateService.module.scss"
import {DoctorsService} from "../../api/Services/DoctorsService";
import {ServiceService} from "../../api/Services/ServiceService";
import {useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CreateService: FC = ()=> {
    const serviceService = new ServiceService()
    const nav = useNavigate()
    const [name, setName] = useState("")
    const [afterGP, setAfterGP] = useState("")
    const imgRef = useRef<HTMLInputElement>(null)

    function submitHandler(e) {
        console.log(afterGP)
        e.preventDefault()
        serviceService.createService({name,afterGP, img: imgRef})
            .then(data => {
                alert(data)
                nav("/admin")
            })
            .catch(e => {
                // alert("КВЕРИ ФЕЙЛД")
                console.log(e)
            })
    }
    return(
        <div className={styles.CreateService} style={{width: "400px", margin: "30px auto 0"}}>
            <h1>Создать Сервис</h1>
            <Form onSubmit={submitHandler} >
                <Form.Group className="mb-3">
                    <Form.Label>Запись после терапевта?</Form.Label>
                    <Form.Select defaultValue={afterGP} onChange={(e)=> setAfterGP(e.target.value)}>
                        <option value="" disabled>открыть</option>
                        <option value="true">да</option>
                        <option value="false">нет</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Название Сервиса</Form.Label>
                    <Form.Control value={name}
                                  onChange={(e)=> setName(e.target.value)}
                                  type="text"
                                  placeholder="введите название" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Изображение</Form.Label>
                    <Form.Control ref={imgRef}
                                  type="file"
                                  accept="image/png, image/gif, image/jpeg" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Создать Сервис
                </Button>
            </Form>
        </div>
    )
}

export default CreateService