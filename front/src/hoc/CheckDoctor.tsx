import {FC} from "react";
import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";

interface CheckAdminProps {
    children: any;
}

const CheckDoctor: FC<CheckAdminProps> = ({children})=> {
    const {isDoctor} = useAuth()
    console.log(isDoctor)
    if (isDoctor) {
        return(
            <div>{children}</div>
        )
    }
    return(
        <Navigate to="/" />
    )
}

export default CheckDoctor