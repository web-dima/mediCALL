import {FC} from "react";
import styles from "./Admin.module.scss"
import RegisterDoctor from "../../components/RegisterDoctor";
import CreateService from "../../components/CreateSevice";

const Admin: FC = ()=> {
    return(
        <div className={styles.Admin}>
            <RegisterDoctor />
            <CreateService />
        </div>
    )
}

export default Admin