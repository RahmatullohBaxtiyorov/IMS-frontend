import React, {useEffect, useState} from 'react';
import axios from "axios";
import {AuthStr} from "../exported/Utils";

const AdminPage = () => {
    const [currencies, setCurrencies] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/admin/currency", {headers: {"Authorization": AuthStr}}).then(res => {
            setCurrencies(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })

        axios.get("http://localhost:8080/api/admin/category", {headers: {"Authorization": AuthStr}}).then(res => {
            console.log(res.data)
            setCategories(res.data)
        }).catch(err => {
            console.log(err)
        })

        axios.get("http://localhost:8080/api/admin/measurement", {headers: {"Authorization": AuthStr}}).then(res => {
            setMeasurements(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <div className={"forms"}>
                <div className={"container"}>
                    <h3>Add currency</h3>
                    <input id={"currency"} placeholder={"name"} type="text"/>
                    <button>Ok</button>
                </div>
                <div className={"container"}>
                    <h3>Add measurement</h3>
                    <input id={"measurement"} placeholder={"name"} type="measurement"/>
                    <button>Ok</button>
                </div>
                <div className={"container"}>
                    <h3>Add supplier</h3>
                    <input id={"supplier"} placeholder={"name"} type="text"/>
                    <input id={"supplierPhone"} placeholder={"phone number"} type="text"/>
                    <button>Ok</button>
                </div>

            </div>
            <div className={"forms"}>
                <div className={"container"}>
                    <h3>Add category</h3>
                    <input id={""} placeholder={"name"} type="text"/>
                    <label htmlFor="">parentCategory</label>
                    <select name="category" defaultValue={""}>
                        <option id={""} key={"index"}></option>
                        {categories
                            .filter((category) => category.parentCategory === null)
                            .map((value, index, array) => (
                                <option id={value.id} key={index}>{value.name}</option>
                            ))}
                    </select>
                    <button>Ok</button>
                </div>
                <div className={"container"}>
                    <h3>Add product</h3>
                    <input placeholder={"name"} type="text"/>
                    <select name="currency" defaultValue={'uzs'}>
                        {currencies.map((value, index, array) => (
                            <option id={value.id} key={index}>{value.name}</option>
                        ))}
                    </select>
                    {/*<input type="file"/>*/}
                    <select name="measurement" defaultValue={"kilo"}>
                        {measurements.map((value, index, array) => (
                            <option id={value.id} key={index}>{value.name}</option>
                        ))}
                    </select>
                    <label htmlFor="">parent</label>
                    <select name="category" defaultValue={""}>
                        {categories
                            .filter((category) => category.parentCategory === null)
                            .map((value, index, array) => (
                                <option id={value.id} key={index}>{value.name}</option>
                            ))}
                    </select>
                    <label htmlFor="">child</label>
                    <select name="" id="">
                        {categories
                            .filter((category) => category.parentCategory !== null)
                            .map((value, index, array) => (
                                <option id={value.id} key={index}>{value.name}</option>
                            ))}
                    </select>

                    <input type="text"/>
                    <button>Ok</button>
                </div>
                <div className={"container"}>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <button>Ok</button>
                </div>

            </div>

        </>
    );
};

export default AdminPage;