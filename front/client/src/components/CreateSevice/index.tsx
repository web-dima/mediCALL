import {FC, useRef, useState} from "react";
import styles from "./CreateService.module.scss"
import {DoctorsService} from "../../api/Services/DoctorsService";
import {ServiceService} from "../../api/Services/ServiceService";
import {useNavigate} from "react-router-dom";

const CreateService: FC = ()=> {
    const serviceService = new ServiceService()
    const nav = useNavigate()
    const [name, setName] = useState("")
    const [afterGP, setAfterGP] = useState("")
    const imgRef = useRef<HTMLInputElement>(null)

    function submitHandler(e) {
        console.log(afterGP)
        e.preventDefault()
        serviceService.createService({name,afterGP, img: imgRef})
            .then(data => {
                alert(data)
                nav("/admin")
            })
            .catch(e => {
                console.log(e)
            })
    }
    return(
        <div className={styles.CreateService}>
            <h1>Создать Сервис</h1>
            <form onSubmit={submitHandler}>
                <select defaultValue={afterGP} onChange={(e)=> setAfterGP(e.target.value)}>
                    <option value="" disabled>после терапевта?</option>
                    <option value="true">да</option>
                    <option value="false">нет</option>
                </select>

                <input
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    type="text"
                    placeholder="введите название"
                />

                <input
                    ref={imgRef}
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                />

                <button>Создать</button>
            </form>
        </div>
    )
}

export default CreateService