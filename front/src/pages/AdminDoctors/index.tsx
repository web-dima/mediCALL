import {createContext, FC, useState} from "react";
import styles from "./AdminDoctor.module.scss"
import Receptions from "../../components/Receptions";
import {DoctorReceptionType} from "../../api/Types/IReception";
import {IDoctor} from "../../api/Types/IDoctor";
import AdminDoctorsList from "../../components/AdminDoctorsList";




const AdminDoctor: FC = ()=> {


    return(
        <div className={styles.Admin}>
            <div className={styles.container}>
                <AdminDoctorsList/>
            </div>
        </div>
    )
}

export default AdminDoctor