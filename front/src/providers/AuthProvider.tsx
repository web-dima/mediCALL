import {createContext, FC, useEffect, useState} from "react";
import {UserService} from "../api/Services/UserService";
import {Context} from "../types/Context";
import {UserRole} from "../api/Types/UserRole";

import {ClipLoader} from "react-spinners";

export const AuthContext = createContext<Context>({}as Context)

interface ChildrenProps {
    children: any;
}

const AuthProvider: FC<ChildrenProps> = ({children})=> {
    const userService = new UserService()
    const [userId, setUserId] = useState(0)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isDoctor, setIsDoctor] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(()=> {
        userService.me().then(data => {
            setIsAdmin(data.role === UserRole.admin)
            setUserId(data.id)
            setLoading(false)
        }).catch(err => {
            setUserId(0)
            setIsAdmin(false)
            setLoading(false)
        })
    }, [])

    const value = {userId, setUserId, isAdmin, setIsAdmin, isDoctor, setIsDoctor};

    if (!loading) {
        return <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    }

    return (
        <ClipLoader
            color="black"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default AuthProvider