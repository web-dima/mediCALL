import {FC} from "react";
import styles from "./AdminLayout.module.scss"
import {Outlet} from "react-router-dom";

const AdminLayout: FC = ()=> {
    return(
        <div className={styles.AdminLayout}>
            <header>123</header>
                <Outlet />
            <footer>123</footer>
        </div>
    )
}

export default AdminLayout