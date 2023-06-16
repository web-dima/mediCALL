import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from "react";
import styles from "./Receptions.module.scss"
import Doctor from "../Doctor";
import {IDoctor} from "../../api/Types/IDoctor";
import {ReceptionsService} from "../../api/Services/ReceptionsService";
import {AxiosTypes} from "../../api/axios/types";
import DoctorReception from "../DoctorReception";
import {DoctorReceptionType} from "../../api/Types/IReception";
import { Form } from "react-bootstrap";
import {ReceptionStatus} from "../../enums/ReceptionStatus";
import {useReceptions} from "../../hooks/useReceptions";

export const statuses = [ReceptionStatus.active, ReceptionStatus.accept, ReceptionStatus.complete, ReceptionStatus.cancel];
const Doctors: FC = ()=> {
    const receptionService = new ReceptionsService(AxiosTypes.doctors)
    const {receptions, setReceptions} = useReceptions()

    function getAllReceptions(){
        receptionService.getAllReceptions().then(data => {
            setReceptions(data)
            localStorage.setItem("receptions", JSON.stringify(data))
        }).catch(e=> console.log(e))
    }
    useEffect(()=> {
        getAllReceptions()
    }, [])

    function changeHandler(e:any){
        if (e.target.value === "all") {
            getAllReceptions()
        } else {
            receptionService.getByStatus(e.target.value).then(data => {
                setReceptions(data)
            }).catch(e=> console.log(e))
        }
    }

    return(
        <>
            <h1>Ваши приемы</h1>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} className="mb-5">
                <span style={{fontStyle: "20px"}}>отфильтровать заявки по статусу</span>
                <Form.Select defaultValue="all" style={{width: "30%"}} onChange={changeHandler}>
                    <option value="all">все</option>
                    {statuses.map(item=> {
                        return <option value={item} key={item}>{item}</option>
                    })}
                </Form.Select>
            </div>
            {!receptions.length ? "нет приемов с таким статусом" : ""}
            <div className={styles.wrapper}>
                {receptions.map((reception)=> {
                    return <DoctorReception doc={reception} key={reception.id} />
                })}
            </div>
        </>

    )
}

export default Doctors