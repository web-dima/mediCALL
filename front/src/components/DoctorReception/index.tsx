import React, {FC, useEffect, useReducer, useState} from "react";
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
import {ReceptionStatus} from "../../enums/ReceptionStatus";
import {useReceptions} from "../../hooks/useReceptions";

interface ReceptionProps {
    doc: DoctorReceptionType
}

const DoctorReception: FC<ReceptionProps> = ({doc})=> {
    const receptionService = new ReceptionsService(AxiosTypes.doctors)
    const statusesWithoutthis = statuses.filter(item => item !== doc.status)
    const [status, setStatus] = useState(doc.status)
    const [html, setHtml] = useState<any>()
    const nav = useNavigate()
    const {receptions, setReceptions} = useReceptions()

    useEffect(function () {
        switch (status) {
            case ReceptionStatus.active : {
                setHtml(<div style={{display: "flex", justifyContent: "space-around"}}>
                    <Button variant="success" onClick={()=> updateStatus(ReceptionStatus.accept,doc.id)}>подтвердить</Button>
                    <Button variant="danger" onClick={()=> updateStatus(ReceptionStatus.cancel,doc.id)}>отменить</Button>
                </div>)
                break;
            }
            case ReceptionStatus.accept : {
                setHtml(<Form onSubmit={submitHandler} >
                            <Form.Label>Опишите результат приема</Form.Label>
                            <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                            />
                            <input type="hidden" value={doc.id}/>
                            <Button variant="primary" type="submit" className="mt-3">
                                Сохранить
                            </Button>
                        </Form>)
                break;
            }
            case ReceptionStatus.complete : {
                // @ts-ignore
                setHtml(<div style={{display: "flex", flexDirection: "column", flexGrow: "1"}}>
                            <div  className={styles.reception2}>итог - {doc.result}</div>
                            <Button style={{alignSelf: "baseline"}} variant={"danger"} onClick={()=>doingAfterCanceling(true, doc.id)}>удалить</Button>
                        </div>)
                break;
            }
            case ReceptionStatus.cancel : {
                setHtml(<div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button variant={"primary"} onClick={()=>doingAfterCanceling(false, doc.id)}>возобновить</Button>
                    <Button variant={"danger"} onClick={()=>doingAfterCanceling(true, doc.id)}>удалить</Button>
                </div>)
                break;
            }
        }
    }, [status])

    function submitHandler(e){
        e.preventDefault()
        const resultOfAppointment = e.target[0].value
        const id = e.target[1].value

        receptionService.makeComplete(resultOfAppointment, parseInt(id)).then((data)=> {
            // force(132)
            console.log(data)
            setStatus(data.data.status)
            doc.result = data.data.result
            console.log(status)
            console.log(doc.result)

            nav("/doctor")
        }).catch(e=> console.log(e))
    }
    function updateStatus(statuss:string, id:number) {
        receptionService.updateStatus(statuss,id)
            .then(data => {
                setStatus(data.data)
            })
            .catch(e => {
                console.log(e)
            })
    }
    function doingAfterCanceling(isDelete:boolean, id:number) {
        receptionService.deleteOrComeback(isDelete,id)
            .then(data => {
                if (!isDelete) {
                    setStatus(data.data)
                } else {
                    const arr = JSON.parse(localStorage.getItem("receptions")).filter((doc)=> doc.id !== parseInt(data.data))
                    setReceptions(arr)
                    localStorage.setItem("receptions", JSON.stringify(arr))
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    return(
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <img className={styles.img} src="./img/user.png" alt=""/>
                <div>{doc.user.name}</div>
            </div>

            <div className={styles.reception}>
                <div className={styles.date}>дата - {doc.date}</div>
                {html}
            </div>
        </div>

    )
}

export default DoctorReception