import {FC} from "react";
import styles from "./DoctorLayout.module.scss"
import {Outlet} from "react-router-dom";
import Footer from "../../components/Footer";
import DoctorHeader from "../../components/DoctorHeader";

const DoctorLayout: FC = ()=> {
    return(
        <div className={styles.AdminLayout}>
            <DoctorHeader />
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    )
}

export default DoctorLayout