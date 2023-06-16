import {createContext, FC, useState} from "react";
import styles from "./Admin.module.scss"
import RegisterDoctor from "../../components/RegisterDoctor";
import CreateService from "../../components/CreateSevice";
import AdminDoctors from "../AdminDoctors";
import {IDoctor} from "../../api/Types/IDoctor";
import {IService} from "../../api/Types/IService";

interface Context {
    doctors: IDoctor[],
    setDoctors:Function
    services: IService[],
    setServices:Function
}
export const DoctorsArray = createContext<Context>({}as Context)

const Admin: FC = ()=> {
    const [doctors, setDoctors] = useState<IDoctor[]>([])
    const [services, setServices] = useState<IService[]>([])

    return(
        <div className={styles.Admin}>
            <DoctorsArray.Provider value={{doctors, setDoctors,services, setServices}}>
                <div className={styles.create_row}>
                    <RegisterDoctor />
                    <CreateService />
                </div>
                <div className={styles.create_row}>
                    <AdminDoctors />
                </div>
            </DoctorsArray.Provider>
        </div>
    )
}

export default Admin