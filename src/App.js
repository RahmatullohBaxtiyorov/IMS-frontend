import LogIn from "./components/LogIn";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from "./components/Register";
import HomePage from "./pages/HomePage";

function App() {
    return (

        <Router>

            <Routes>
                <Route exact path='/' element={<LogIn/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/home' element={<HomePage/>}/>
            </Routes>

        </Router>

    );
}

export default App;
