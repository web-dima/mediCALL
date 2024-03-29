import {FC} from "react";
import styles from "./DoctorLayout.module.scss"
import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer";
import AdminHeader from "../../components/AdminHeader";

const DoctorLayout: FC = ()=> {
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

export default DoctorLayout