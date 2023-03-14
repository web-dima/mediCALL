import {FC, useEffect, useState} from "react";
import styles from "./Services.module.scss"
import {ServiceService} from "../../api/Services/ServiceService";

const Services: FC = ()=> {
    const service = new ServiceService()
    const [services, setServices] = useState([])

    useEffect(()=> {
        service.getServices().then((data)=> {
            setServices(data)
        })
    }, [])

    console.log(services)

    return(
        <div className={styles.Services}>
            {services.map(serv => {
                return (
                    <div style={{marginBottom: "10px"}} key={serv.id}>
                        <h2>{serv.name}</h2>
                        <span>{serv.after_GP ? "только после терапевта" : "свободная запись"}</span>
                        <img src={serv.img} alt=""/>
                    </div>
                )
            })}
        </div>
    )
}

export default Services