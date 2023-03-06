import {FC} from "react";
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Service from "./pages/Service";

const App: FC = ()=> {
    return(
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/services" element={<Services/>}/>
                <Route path="/services/:id" element={<Service/>}/>
            </Route>
        </Routes>
    )
}

export default App
