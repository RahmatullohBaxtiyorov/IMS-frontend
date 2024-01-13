import React, {useEffect} from 'react';
import axios from "axios";

const HomePage = () => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem("TOKEN"));

    useEffect(() => {
        axios.get("http://localhost:8080/api/users/admin", {headers: {Authorization: AuthStr}}).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div>

        </div>
    );
};

export default HomePage;