import {FC} from "react";
import {useAuth} from "../hooks/useAuth";
import {Navigate} from "react-router-dom";

interface CheckAdminProps {
    children: any;
}

const CheckAdmin: FC<CheckAdminProps> = ({children})=> {
    const {isAdmin} = useAuth()
    if (isAdmin) {
        return(
            <div>{children}</div>
        )
    }
    return(
        <Navigate to="/" />
    )
}

export default CheckAdmin