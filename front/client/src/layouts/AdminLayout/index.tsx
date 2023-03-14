import {FC} from "react";
import styles from "./AdminLayout.module.scss"
import {Outlet} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AdminLayout: FC = ()=> {
    return(
        <div className={styles.AdminLayout}>
            <Header adminHeader/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    )
}

export default AdminLayout