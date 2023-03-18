import {FC} from "react";
import styles from "./Home.module.scss"
import Doctors from "../../components/Doctors";

const Home: FC = ()=> {
    return(
        <div className={styles.Home}>
            <Doctors />
        </div>
    )
}

export default Home