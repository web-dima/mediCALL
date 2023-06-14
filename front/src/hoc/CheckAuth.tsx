import {FC} from "react";
import {useAuth} from "../hooks/useAuth";
import {Navigate, useLocation} from "react-router-dom";

interface AuthHocProps {
    children: any;
}

const CheckAuth: FC<AuthHocProps> = ({children})=> {
    const {userId} = useAuth()
    const location = useLocation()
    const isLoginPages = location.pathname === "/login" || location.pathname === "/register"

    if (userId && isLoginPages) {
        return(
            <Navigate to="/" />
        )
    }

    if (userId) {
        return <div>{children}</div>
    }

    if (isLoginPages && !userId) {
        return <div>{children}</div>
    }

    return(
        <Navigate to="/" />
    )
}
//@ts-ignore
export default CheckAuth