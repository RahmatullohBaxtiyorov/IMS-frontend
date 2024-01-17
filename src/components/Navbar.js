import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {GlobalVariableContext} from "../App";


function Navbar() {
    const AuthStr = 'Bearer '.concat(localStorage.getItem("TOKEN"));
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const {user} = useContext(GlobalVariableContext);

    useEffect(() => {
        axios.get("http://localhost:8080/api/users/" + user, {headers: {"Authorization": AuthStr}}).then(res => {
            console.log(res)
            if (res.data.authorities[0].authority === "ROLE_USER") {
                setIsAdmin(false);

            } else if (res.data.authorities[0].authority === "ROLE_ADMIN") {
                setIsAdmin(true)
            }
        }).catch(err => {
            console.log(err)
            setIsAdmin(false)
        })
    }, [isAdmin, user])

    return (
        <div className="admin-nav">
            {(
                <div className="nav-wrapper">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link">
                                Main Page
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin" className="nav-link">
                                Product
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin-input" className="nav-link">
                                Input
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin-output" className="nav-link">
                                Output
                            </Link>
                        </li>
                    </ul>
                    <button className={"nav-btn"} onClick={() => {
                        localStorage.clear();
                        navigate("/");
                        setIsAdmin(false)
                        window.location.reload(true)
                    }}>log in <br/> log out
                    </button>
                </div>

            )}

        </div>
    );
}

export default Navbar;