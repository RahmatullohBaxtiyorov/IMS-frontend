import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {GlobalVariableContext} from "../App";

const HomePage = () => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem("TOKEN"));
    const {user} = useContext(GlobalVariableContext);
    const [warehouses, setWarehouses] = useState([]);

    useEffect(() => {
            axios.get("http://localhost:8080/api/users/" + user, {headers: {"Authorization": AuthStr}}).then(res => {
                console.log(res)
                setWarehouses(res.data.warehouses);
            }).catch(err => {
                console.log(err)
            })
        },
        []
    )

    return (
        <div>
            {warehouses.map((item, index) => (
                <h1 key={item.id}>
                    {item.name}
                </h1>
            ))}
        </div>
    );
};

export default HomePage;