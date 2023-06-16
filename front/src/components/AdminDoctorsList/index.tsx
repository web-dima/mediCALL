import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from "react";
import styles from "./AdminDoctorsList.module.scss"
import Doctor from "../Doctor";
import {IDoctor} from "../../api/Types/IDoctor";
import {ReceptionsService} from "../../api/Services/ReceptionsService";
import {AxiosTypes} from "../../api/axios/types";
import DoctorReception from "../DoctorReception";
import {DoctorReceptionType} from "../../api/Types/IReception";
import { Form } from "react-bootstrap";
import {ReceptionStatus} from "../../enums/ReceptionStatus";
import {useReceptions} from "../../hooks/useReceptions";
import {AuthDoctorService} from "../../api/Services/AuthDoctorService";
import {DoctorsService} from "../../api/Services/DoctorsService";
import {useDoctors} from "../../hooks/useDoctors";
import AdminDoctor from "../AdminDoctor";

const AdminDoctorsList: FC = ()=> {
    const doctorsService = new DoctorsService()
    const {doctors, setDoctors} = useDoctors()

    function getAllReceptions(){
        doctorsService.getDoctors().then(data => {
            setDoctors(data)
            localStorage.setItem("doctors", JSON.stringify(data))
        }).catch(e=> console.log(e))
    }
    useEffect(()=> {
        getAllReceptions()
    }, [])

    return(
        <>
            <h1>Наши врачи</h1>
            {!doctors.length ? "нет врачей" : ""}
            <div className={styles.wrapper}>
                {doctors.map((doctor)=> {
                    return <AdminDoctor doctor={doctor} key={doctor.id} />
                })}
            </div>
        </>

    )
}

export default AdminDoctorsList