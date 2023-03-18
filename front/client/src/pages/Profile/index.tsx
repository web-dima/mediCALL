import {FC, useEffect, useState} from "react";
import styles from "./Profile.module.scss"
import {ReceptionsService} from "../../api/Services/ReceptionsService";
import {IReception} from "../../api/Types/IReception";
import Reception from "../../components/Reception";

const Profile: FC = ()=> {
    const respServ = new ReceptionsService()
    const [resp, setResp] = useState<IReception[]>([])

    useEffect(()=>{
        respServ.getReceptionsForUser().then(data=>{
            setResp(data)
        }).catch(e => console.log(e))
    },[])

    return(
        <div className={styles.Profile}>
            <h1>список ваших приемов</h1>
            <div className={styles.list}>
                {resp.map(respSingle => {
                    return <Reception data={respSingle} key={respSingle.id}/>
                })}
            </div>

        </div>
    )
}

export default Profile