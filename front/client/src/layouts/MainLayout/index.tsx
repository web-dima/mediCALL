import {FC} from "react";
import styles from "./MainLayout.module.scss"
import {Outlet} from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MainLayout: FC = ()=> {
    return(
        <div className={styles.MainLayout}>
            <Header adminHeader={false}/>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default MainLayout