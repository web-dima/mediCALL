import {FC} from "react";
import styles from "./Home.module.scss"
import {Axios} from "../../api/axios/Axios";
import {UserService} from "../../api/Services/UserService";

const Home: FC = ()=> {

    const apies = new UserService()
    const ax = apies.getApies()

    console.log(ax.public.get("/service").then(d => console.log("noAuth")))

    console.log(ax.private.get("/service").then(d => console.log("Auth")))

    console.log(ax.public.get("/service").then(d => console.log("noAuth")))


    console.log(ax.private.get("/service").then(d => console.log("Auth")))

    return(
        <div className={styles.Home}>Home</div>
    )
}

export default Home