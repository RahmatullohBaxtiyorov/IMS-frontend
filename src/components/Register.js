import React, {useState} from 'react';
import "../css/LoginCSS.css"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Register = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        var id = event.target.id;
        if (id == "email") {
            setEmail(event.target.value)
        } else if (id == "password") {
            setPassword(event.target.value)
        } else if (id == "firstName") {
            setFirstName(event.target.value)
        } else if (id == "lastName") {
            setLastName(event.target.value)
        }


    };

    //{
    //     "firstName":"ali",
    //     "lastName":"aliyev",
    //     "email": "ali3@gmail.com",
    //     "password": "123"
    // }
    const register = (e) => {
        e.preventDefault();

        let authDto = {"email": email, "password": password, "firstName": firstName, "lastName": lastName}

        setEmail(document.getElementById("email").value);
        setPassword(document.getElementById("password").value);
        axios.post("http://localhost:8080/auth/register", authDto, {headers: {"Content-Type": "application/json"}}).then(res => {
            console.log(res);
            navigate("/")
        }).catch((err) => {
            console.log(err);
        });
    }

    return (<div className={"container"}>
        <input type="text" onChange={(event) => handleChange(event)} id={'firstName'} placeholder={"firstName"}/>
        <input type="text" onChange={(event) => handleChange(event)} id={'lastName'} placeholder={"lastName"}/>
        <input type="text" onChange={(event) => handleChange(event)} id={'email'} placeholder={"email"}/>
        <input type="text" onChange={(event) => handleChange(event)} id={'password'} placeholder={"password"}/>
        <button onClick={(event) => register(event)}>Register</button>
        <Link to={"/"}>
            <button>Login here</button>
        </Link>

    </div>);
};

export default Register;