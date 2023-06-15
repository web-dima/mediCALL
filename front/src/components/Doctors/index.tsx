import {FC, useEffect, useRef, useState} from "react";
import styles from "./Doctors.module.scss"
import {DoctorsService} from "../../api/Services/DoctorsService";
import Doctor from "../Doctor";
import {IDoctor} from "../../api/Types/IDoctor";

const Doctors: FC = ()=> {
    const doctorsService = new DoctorsService()
    const [doctors, setDoctors] = useState<IDoctor[]>([])

    useEffect(()=> {
        doctorsService.getDoctors().then(data => {
            // console.log(data)
            setDoctors(data)
            // console.log(doctors)
        }).catch(e=> console.log(e))
    }, [])



    return(
        <>
            <h1>наши врачи</h1>
            <div className={styles.Doctors}>
                {doctors.map(doc=> {
                    return <Doctor data={doc} key={doc.id} />
                })}
            </div>
        </>

    )
}

export default Doctors