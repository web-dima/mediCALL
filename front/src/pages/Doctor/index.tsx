import {createContext, FC, useState} from "react";
import styles from "./Doctor.module.scss"
import Receptions from "../../components/Receptions";
import {DoctorReceptionType} from "../../api/Types/IReception";
interface Context {
    receptions: DoctorReceptionType[],
    setReceptions:Function
}
export const ReceptionArray = createContext<Context>({}as Context)



const Doctor: FC = ()=> {
    const [receptions, setReceptions] = useState<DoctorReceptionType[]>([])
    const [idx, setIdx] = useState<number>(0)

    return(
        <div className={styles.Admin}>
            <div className={styles.container}>
                <ReceptionArray.Provider value={{receptions, setReceptions}}>
                    <Receptions/>
                </ReceptionArray.Provider>
            </div>
        </div>
    )
}

export default Doctor