
import {Route, Routes} from "react-router-dom"
import MainLayout from "./components/MainLayout";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const context = createContext({})

async function checkUser() {
    const user = await axios.post("http://127.0.0.1:8000/me", {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Access-Control-Allow-Origin": "*"
        }
    })

    console.log(user)
}

function App() {
    const [userId, setUserId] = useState(0)


    useEffect(()=> {
        checkUser()
    }, [])

  return (
      <context.Provider value={{userId, setUserId}}>
        <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            {/*<Route path="/services" element={<Services/>}/>*/}
            {/*<Route path="/services/:id" element={<Service/>}/>*/}
          </Route>
          {/*<Route path="/admin" element={<AdminLayout/>}>*/}
          {/*  <Route index element={<Admin/>}/>*/}
          {/*</Route>*/}
        </Routes>
      </context.Provider>
  );
}

export default App;
