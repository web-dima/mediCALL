import {createContext, FC, useState} from "react";
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Service from "./pages/Service";
import {Context} from "./types/Context";
import Admin from "./pages/Admin";
import AdminLayout from "./layouts/AdminLayout";

export const AuthContext = createContext<Context>({}as Context)

const App: FC = ()=> {
    const [userId, setUserId] = useState(0)

    return(
        <AuthContext.Provider value={{userId, setUserId}}>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/services/:id" element={<Service/>}/>
                </Route>
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={<Admin/>}/>
                </Route>
            </Routes>
        </AuthContext.Provider>
    )
}

export default App
