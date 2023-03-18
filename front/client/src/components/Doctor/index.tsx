import {FC, useEffect, useState} from "react";
import styles from "./Doctor.module.scss"
import {IDoctor} from "../../api/Types/IDoctor";
import {imgFolder} from "../../App";
import {ReceptionsService} from "../../api/Services/ReceptionsService";
import {useNavigate} from "react-router-dom";

interface DoctorProps {
    data: IDoctor,
    fromProfile?: boolean
}

const Doctor: FC<DoctorProps> = ({data, fromProfile})=> {
    const respServ = new ReceptionsService()

    const nav = useNavigate()

    const [dateInput, setDateInput] = useState("")
    const [image, setImage] = useState("")

    function clickHandler(e:MouseEvent) {
        e.preventDefault()
        const date = dateInput.split("-");
        const dateExpired = new Date().getDate() <= Number(date[2]);

        if (!dateExpired) {
            alert("нельзя выбрать дату которая прошла, ты в адеквате вообще?")
            return
        }

        respServ.createReceptions({date: dateInput, doctorId: Number(e.target.dataset.id)}).then((data)=>{
            if (data.success) {
                nav("/profile")
            }
        }).catch(e => {
            alert(e.response.data.status)
            nav("/login")
        })
    }

    console.log(data.photo)
//127.0.0.1:8000/uploads/img/doctors/0sufMu7EXgpKLJG3O4OZcCoTNRHHUfkO.png
    //onError={(e) => e.target.src = "/img/doc.jpg"}
    return(
        <div key={data.id} className={styles.doctor}>
            <div className={styles.img}><img src={data.photo} alt="" onError={(e) => e.target.src = "/img/doc.jpg"}/></div>
            <div className={styles.fio}>ФИО - {data.fio}</div>
            <div className={styles.service}>Сервис - {data.services.name}</div>
            {!fromProfile &&
                <>
                    <input
                    type="date"
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}/>

                    <button onClick={clickHandler} data-id={data.id}>записаться</button>
                </>
            }

        </div>
    )
}

export default Doctor