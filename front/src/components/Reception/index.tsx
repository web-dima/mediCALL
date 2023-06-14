import {FC} from "react";
import styles from "./Reception.module.scss"
import {IReception} from "../../api/Types/IReception";
import Doctor from "../Doctor";

interface ReceptionProps {
data: IReception
}

const Reception: FC<ReceptionProps> = ({data})=> {
    return(
        <div className={styles.Reception}>
            <div>дата - {data.date}</div>
            <div>результат - {data.result ?? "будет известен после приема"}</div>
            <div>статус - {data.status}</div>
            <div><h2>Врач</h2><Doctor data={data.doctor} fromProfile={true}/></div>
        </div>
    )
}

export default Reception