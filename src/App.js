import LogIn from "./components/LogIn";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./components/Register";
import HomePage from "./pages/HomePage";
import {createContext, useEffect, useState} from "react";
import AdminPageProduct from "./pages/admin/AdminPageProduct";
import AdminPP from "./pages/admin/AdminPP";

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

                <Routes>
                    <Route exact path='/' element={<LogIn/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path='/admin' element={<AdminPP/>}/>
                </Routes>

            </Router>
        </GlobalVariableContext.Provider>


    );
}

export default App;
