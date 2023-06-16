import React, {FC} from "react";
import styles from "./AdminDoctor.module.scss"
import {AxiosTypes} from "../../api/axios/types";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {IDoctor} from "../../api/Types/IDoctor";
import {useDoctors} from "../../hooks/useDoctors";
import {DoctorsService} from "../../api/Services/DoctorsService";
import {useAuth} from "../../hooks/useAuth";

interface DoctorProps {
    doctor: IDoctor
}

const AdminDoctor: FC<DoctorProps> = ({doctor})=> {
    const doctorsService = new DoctorsService()
    const nav = useNavigate()
    const {setDoctors} = useDoctors()
    const {setIsDoctor, setUserId, setIsAdmin} = useAuth()

    function authHandler(){
        doctorsService.AuthByAdmin(doctor.code).then(data=> {
            setIsDoctor(true)
            setUserId(data.data.doctor.id)
            localStorage.setItem(`${AxiosTypes.doctors}_token`, data.data.token)
            localStorage.removeItem(`${AxiosTypes.users}_token`)
            setIsAdmin(false)
            nav("/doctor")
        })
    }
    function deleteHandler(){
        doctorsService.delete(doctor.id).then(data=> {
            console.log(data)
            if (data.success) {
                console.log("some")
                const arr = JSON.parse(localStorage.getItem("doctors")).filter((doc:IDoctor)=> doc.id !== parseInt(data.data))
                setDoctors(arr)
                localStorage.setItem("doctors", JSON.stringify(arr))
            } else {
                console.log(data)
            }
        })
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <img className={styles.img} src={doctorsService.getImgUrl + doctor.photo} alt=""/>
            </div>

            <div className={styles.doctors}>
                <div>ФИО - {doctor.fio}</div>
                <div>Специализация - {doctor.services.name}</div>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button variant={"primary"} onClick={authHandler}>Авторизоваться</Button>
                    <Button variant={"danger"} onClick={deleteHandler}>Удалить</Button>
                </div>
            </div>
        </div>

    )
}

export default AdminDoctor