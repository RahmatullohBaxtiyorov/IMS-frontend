import LogIn from "./components/LogIn";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./components/Register";
import HomePage from "./pages/HomePage";
import {createContext, useEffect, useState} from "react";
import AdminInputPage from "./pages/admin/AdminInputPage";
import AdminOutputPage from "./pages/admin/AdminOutputPage";
import Navbar from "./components/Navbar";
import "./css/App.css";
import PrivateRoute from "./components/PrivateRoute";
import AdminProductPage from "./pages/admin/AdminProductPage";

export const GlobalVariableContext = createContext(null);

function App() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('contextState')) || {}
    );

    useEffect(() => {
        localStorage.setItem('contextState', JSON.stringify(user));
    }, [user]);
    return (
        <GlobalVariableContext.Provider value={{user, setUser}}>

            <Router>
                <Navbar/>
                <Routes>
                    <Route exact path='/' element={<LogIn/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/home' element={<HomePage/>}/>

                    <Route exact element={<PrivateRoute/>}>
                        <Route exact path="/admin" element={<AdminProductPage/>}/>
                    </Route>
                    <Route exact element={<PrivateRoute/>}>
                        <Route exact path="/admin-input" element={<AdminInputPage/>}/>
                    </Route>
                    <Route exact element={<PrivateRoute/>}>
                        <Route exact path="/admin-output" element={<AdminOutputPage/>}/>
                    </Route>
                </Routes>

            </Router>
        </GlobalVariableContext.Provider>


    );
}

export default App;
