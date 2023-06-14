import {FC} from "react";
import styles from "./Admin.module.scss"
import RegisterDoctor from "../../components/RegisterDoctor";
import CreateService from "../../components/CreateSevice";

const Admin: FC = ()=> {
    return(
        <div className={styles.Admin}>
            <div className={styles.create_row}>
                <RegisterDoctor />
                <CreateService />
            </div>
        </div>
    )
}

export default Admin