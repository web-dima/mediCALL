import React, {FC, useState} from "react";
import styles from "./DoctorReception.module.scss"
import {DoctorReceptionType} from "../../api/Types/IReception";
import Form from "react-bootstrap/Form";
import {ReceptionsService} from "../../api/Services/ReceptionsService";
import {AxiosTypes} from "../../api/axios/types";
import Button from "react-bootstrap/Button";
import {FloatingLabel} from "react-bootstrap";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import {statuses} from "../Receptions";
import {log} from "util";
import {useNavigate} from "react-router-dom";

interface ReceptionProps {
data: DoctorReceptionType
}
// const statuses = ["активен", "приянт", "завершен", "отменен"]
const DoctorReception: FC<ReceptionProps> = ({data})=> {
    const receptionService = new ReceptionsService(AxiosTypes.doctors)
    const statusesWithoutthis = statuses.filter(item => item !== data.status)
    const [status, setStatus] = useState(data.status)
    const nav = useNavigate()
    let html;
    switch (status) {
        case "активен" : {
            html = <div style={{display: "flex", justifyContent: "space-around"}}>
                <Button variant="success">подтвердить</Button>
                <Button variant="danger">отменить</Button>
            </div>
            break;
        }
        case "принят" : {
            html = <Form onSubmit={submitHandler} >
                <Form.Label>Опишите результат приема</Form.Label>
                    <Form.Control
                        as="textarea"
                        style={{ height: '100px' }}
                    />
                <input type="hidden" value={data.id}/>
                <Button variant="primary" type="submit" className="mt-3">
                    Сохранить
                </Button>
            </Form>
            break;
        }
        case "завершен" : {
            // @ts-ignore
            const date = new Date(Date.parse(data.updated_at)).toISOString().split('T')[0]
            html = <div>итог - {data.result}</div>
            break;
        }
        case "отменен" : {
            html = <div style={{textAlign: "center"}}><Button variant={"primary"}>удалить</Button></div>
            break;
        }
    }
    function submitHandler(e){
        e.preventDefault()
        const resultOfApoiment = e.target[0].value
        const id = e.target[1].value

        receptionService.makeComplete(resultOfApoiment, parseInt(id)).then((data)=> {
            console.log(data)
            setStatus(data.data)
            nav("/doctor")
        }).catch(e=> console.log(e))
    }
    function updateStatus(e) {
        if (e.target.value === "") return;
        receptionService.updateStatus(e.target.value)
            .then(data => {
                console.log(data)
            })
            .catch(e => {
                console.log(e)
            })
    }
    return(
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <img className={styles.img} src="./img/user.png" alt=""/>
                <div>{data.user.name}</div>
            </div>

            <div className={data.status === "завершен" ? styles.reception2 : styles.reception}>
                <div className={styles.date}>дата - {data.date}</div>
                {/*<Form.Select defaultValue={data.status} onChange={updateStatus}>*/}
                {/*    <option value="">{data.status}</option>*/}
                {/*    {statusesWithoutthis.map((str)=> {*/}
                {/*       return <option value={str} key={str}>{str}</option>*/}
                {/*    })}*/}
                {/*</Form.Select>*/}
                <div>
                    {html}
                </div>

                {/*<div><h2>Врач</h2></div>*/}
            </div>
        </div>

    )
}

export default DoctorReception