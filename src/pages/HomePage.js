import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {GlobalVariableContext} from "../App";
import "../css/HomeCSS.css"

const HomePage = () => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem("TOKEN"));
    const {user} = useContext(GlobalVariableContext);
    const [warehouses, setWarehouses] = useState([]);
    const [fullname, setFullname] = useState({
        firstName: "",
        lastName: ""
    });
    const [role, setRole] = useState("")
    const [currencies, setCurrencies] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [categories, setCategories] = useState([]);
    const [IP, setIP] = useState([]);


    useEffect(() => {

            axios.get("http://localhost:8080/api/users/" + user, {headers: {"Authorization": AuthStr}}).then(res => {
                setRole(res.data.authorities[0].authority)
                localStorage.setItem("role", res.data.authorities[0].authority)
                setFullname({firstName: res.data.firstName, lastName: res.data.lastName})
                if (res.data.authorities[0].authority === "ROLE_ADMIN") {
                    axios.get("http://localhost:8080/api/warehouse", {headers: {"Authorization": AuthStr}}).then(res => {
                        console.log(res)
                        setWarehouses(res.data)
                    }).catch(err => console.log(err))
                } else {
                    setWarehouses(res.data.warehouses);
                }
            }).catch(err => {
                console.log(err)
            })

            axios.get('http://localhost:8080/api/admin/currency', {headers: {Authorization: AuthStr}})
                .then(res => {
                    setCurrencies(res.data);
                })
                .catch(err => {
                    console.log(err);
                });

            axios.get('http://localhost:8080/api/admin/category', {headers: {Authorization: AuthStr}})
                .then(res => {
                    console.log(res)
                    setCategories(res.data);
                })
                .catch(err => {
                    console.log(err);
                });

            axios.get('http://localhost:8080/api/admin/measurement', {headers: {Authorization: AuthStr}})
                .then(res => {
                    setMeasurements(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
            axios.get('http://localhost:8080/api/admin/inputproduct', {headers: {Authorization: AuthStr}})
                .then(res => {
                    setIP(res.data);
                    console.log(res)
                })
                .catch(err => {
                    console.log(err);
                });

        },
        []
    )

    return (
        <div>
            <h1>Welcome{fullname.firstName.length > 0 ? " " + fullname.firstName : " guest"}</h1>

            {
                role === "ROLE_ADMIN" ? (<div >
                    <table className="styled-table">
                        <thead>
                        <tr>
                            <th>Currencies</th>
                            <th>Warehouses</th>
                            <th>Measurements</th>
                            <th>Categories</th>
                            <th>Products</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{currencies?.map((currency, index) => (
                                <div className={"table-element"} key={index}>{currency.name}</div>
                            ))}</td>
                            <td>{warehouses?.map((currency, index) => (
                                <div className={"table-element"} key={index}>{currency.name}</div>
                            ))}</td>
                            <td>{measurements?.map((measurement, index) => (
                                <div className={"table-element"} key={index}>{measurement.name}</div>
                            ))}</td>
                            <td>{categories?.map((category, index) => (
                                <div
                                    className={"table-element"}
                                    key={index}>{category.parentCategory == null ? category.name + "*" : category.name}</div>
                            ))}</td>
                            <td>
                                {IP?.map((product, index) => (
                                    <div className={"table-element"} key={index}>
                                        {"input code :" + product.input.code}<br/>
                                        {"name: " + product.product.name}<br/>
                                        {"warehouse: " + product.input.warehouse.name}
                                        <hr/>
                                    </div>
                                ))}
                            </td>

                        </tr>
                        </tbody>
                    </table>
                </div>) : ""
            }

            {role === "ROLE_USER" ? (

                <div>
                    <table className="styled-table">
                        <thead>
                        <tr>
                            {/*<th>Currencies</th>*/}
                            {/*<th>Measurements</th>*/}
                            <th>Warehouses</th>
                            {/*<th>Categories</th>*/}
                            <th>Products</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {/*<td>{currencies?.map((currency, index) => (*/}
                            {/*    <div key={index}>{currency.name}</div>*/}
                            {/*))}</td>*/}
                            <td>{warehouses?.map((currency, index) => (
                                <div key={index}>{currency.name}</div>
                            ))}</td>
                            {/*<td>{measurements?.map((measurement, index) => (*/}
                            {/*    <div key={index}>{measurement.name}</div>*/}
                            {/*))}</td>*/}
                            {/*<td>{categories?.map((category, index) => (*/}
                            {/*    <div*/}
                            {/*        key={index}>{category.parentCategory == null ? category.name + "*" : category.name}</div>*/}
                            {/*))}</td>*/}
                            <td>
                                {IP?.filter((product) =>
                                    warehouses?.some((warehouse) => warehouse.name === product.input.warehouse.name)
                                ).map((product, index) => (
                                    <div key={index}>
                                        {"input code :" + product.input.code}<br/>
                                        {"name: " + product.product.name}<br/>
                                        {"warehouse: " + product.input.warehouse.name}
                                    </div>
                                ))}
                            </td>

                        </tr>
                        </tbody>
                    </table>
                </div>
            ) : (""
                // Display content for other roles or unauthorized users
            )}
        </div>
    );


};

export default HomePage;