import React, {useEffect, useState} from 'react';
import "../css/LoginCSS.css"
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Utils} from "../exported/Utils";

const LogIn = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        var id = event.target.id;
        if (id == "email") {
            setEmail(event.target.value)
        } else if (id == "password") {
            setPassword(event.target.value)
        }


    };

    const login = (e) => {
        e.preventDefault();

        let authDto = {"email": email, "password": password}

        setEmail(document.getElementById("email").value);
        setPassword(document.getElementById("password").value);
        axios.post("http://localhost:8080/auth/login", authDto, {headers: {"Content-Type": "application/json"}}).then(res => {
            const utils = new Utils();
            const originalString = res.data;
            const tokenIndex = originalString.indexOf("token") + "token".length + 1;  // Find the index after the word "token"
            const partAfterToken = originalString.substring(tokenIndex).trim();
            utils.setToken = partAfterToken;
            localStorage.setItem("TOKEN", utils.getToken);
            navigate("/home");
        }).catch((err) => {
            console.log(err);
        });
    }

    return (<div className={"container"}>
        <input type="text" onChange={(event) => handleChange(event)} id={'email'} placeholder={"email"}/>
        <input type="text" onChange={(event) => handleChange(event)} id={'password'} placeholder={"password"}/>
        <button onClick={(event) => login(event)}>LogIn</button>
        <Link to={"/register"}>
            <button>Register here</button>
        </Link>
    </div>);
};

export default LogIn;