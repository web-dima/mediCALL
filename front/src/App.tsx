import {FC} from "react";
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Service from "./pages/Service";
import Admin from "./pages/Admin";
import AdminLayout from "./layouts/AdminLayout";
import CheckAuth from "./hoc/CheckAuth";
import CheckAdmin from "./hoc/CheckAdmin";
import AuthProvider from "./providers/AuthProvider";
import Profile from "./pages/Profile";
import DoctorLogin from "./pages/DoctorLogin";
import Doctor from "./pages/Doctor";
import DoctorLayout from "./layouts/DoctorLayout";
import CheckDoctor from "./hoc/CheckDoctor";
export const imgFolder = "http://localhost:8000/uploads/img/"
const App: FC = ()=> {
    return(
        <AuthProvider>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Home/>}/>
                        <Route path="/login" element={
                            <CheckAuth>
                                <Login/>
                            </CheckAuth>
                        }/>
                        <Route path="/register" element={
                            <CheckAuth>
                                <Register/>
                            </CheckAuth>
                        }/>
                        <Route path="/doctor/login" element={
                            <CheckAuth>
                                <DoctorLogin/>
                            </CheckAuth>
                        }/>
                    <Route path="/profile" element={
                        <CheckAuth>
                            <Profile/>
                        </CheckAuth>
                    }/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/services/:id" element={<Service/>}/>
                </Route>

                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index element={
                        <CheckAdmin>
                            <Admin/>
                        </CheckAdmin>
                    }/>
                </Route>

                <Route path="/doctor" element={<DoctorLayout/>}>
                    <Route index element={
                        <CheckDoctor>
                            <Doctor/>
                        </CheckDoctor>}
                    />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default App
