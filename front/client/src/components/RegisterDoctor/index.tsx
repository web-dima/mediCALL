import {FC, useEffect, useRef, useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {ServiceService} from "../../api/Services/ServiceService";
import {DoctorsService} from "../../api/Services/DoctorsService";
const RegisterDoctor: FC = ()=> {
    const nav = useNavigate()
    const doctorService = new DoctorsService()
    const [service_id, setServId] = useState("")
    const [servList, setServList] = useState([])
    const [fio, setFio] = useState("")
    const imgRef = useRef<HTMLInputElement>(null)
    const [code, setCode] = useState("")
    const [password, setPassword] = useState("")

    const servService = new ServiceService();

    useEffect(()=>{
        servService.getServices().then((data)=>{
            console.log(data)
            setServList(data)
        })
    }, [])

    function submitHandler(e) {
        e.preventDefault()
        doctorService.createDoctor({service_id,fio, img: imgRef, code, password})
            .then(data => {
                console.log(data)
                nav("/admin")
            })
            .catch(e => {
                console.log(e)
            })
    }


    return(
        <div>
            <h1>Регистрация врача</h1>
            <form onSubmit={submitHandler}>
                <select defaultValue={service_id} onChange={(e)=> setServId(e.target.value)}>
                    <option value="" disabled>выберите специализацию</option>
                    {servList.map(serv => {
                        return <option value={serv.id} key={serv.id}>{serv.name}</option>
                    })}
                </select>
                <input
                    value={fio}
                    onChange={(e)=> setFio(e.target.value)}
                    type="text"
                    placeholder="введите ФИО"
                />
                <input
                    ref={imgRef}
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                />
                <input
                    value={code}
                    onChange={(e)=> setCode(e.target.value)}
                    type="text"
                    placeholder="введите код для авторизации врача"
                />
                <input
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    type="password"
                    placeholder="введите пароль"
                />
                <button>Войти</button>
            </form>
            <span>нет аккаунта?<Link to="../register">Зарегистрируйтейсь</Link></span>
        </div>
    )
}

export default RegisterDoctor