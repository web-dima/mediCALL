import {FC} from "react";
import styles from "./AdminLayout.module.scss"
import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer";
import AdminHeader from "../../components/AdminHeader/AdminHeader";

const AdminLayout: FC = ()=> {
    return(
        <div className={styles.AdminLayout}>
            <AdminHeader />
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    )
}

export default AdminLayout