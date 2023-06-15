import {FC} from "react";
import styles from "./Doctor.module.scss"
import Receptions from "../../components/Receptions";

const Doctor: FC = ()=> {
    return(
        <div className={styles.Admin}>
            <div className={styles.container}>
                <Receptions/>
            </div>
        </div>
    )
}

export default Doctor