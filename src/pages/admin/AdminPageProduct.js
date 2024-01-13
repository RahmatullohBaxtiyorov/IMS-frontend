import React, {useEffect, useState} from 'react';
import axios from "axios";
import {AuthStr} from "../../exported/Utils";

const AdminPageProduct = () => {
    const [currencies, setCurrencies] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [categories, setCategories] = useState([]);

    const [currencyName, setCurrencyName] = useState('');
    const [measurementName, setMeasurementName] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [supplierPhone, setSupplierPhone] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [productName, setProductName] = useState('');
    const [productCurrency, setProductCurrency] = useState('uzs');
    const [productMeasurement, setProductMeasurement] = useState('kilo');
    const [productParentCategoryId, setProductParentCategoryId] = useState('');
    const [productChildCategoryId, setProductChildCategoryId] = useState('');
    const [photoFile, setPhotoFile] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // Update the corresponding state based on the input name
        switch (name) {
            case 'currencyName':
                setCurrencyName(value);
                break;
            case 'measurementName':
                setMeasurementName(value);
                break;
            case 'supplierName':
                setSupplierName(value);
                break;
            case 'supplierPhone':
                setSupplierPhone(value);
                break;
            case 'categoryName':
                setCategoryName(value);
                break;
            case 'parentCategoryId':
                setParentCategoryId(value);
                break;
            case 'productName':
                setProductName(value);
                break;
            case 'productCurrency':
                setProductCurrency(value);
                break;
            case 'productMeasurement':
                setProductMeasurement(value);
                break;
            case 'productParentCategoryId':
                setProductParentCategoryId(value);
                break;
            case 'productChildCategoryId':
                setProductChildCategoryId(value);
                break;
            case 'photoFile':
                setPhotoFile(event.target.files[0]);
                break;
            default:
            // Handle unexpected input names
        }
    };


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

                    <button>Ok</button>
                </div>
                <div className={"container"}>
                    <h3>Photo upload</h3>
                    <input type="file" accept={".jpg"}/>
                    <button>Ok</button>
                </div>

            </div>

        </>
    );
};

export default AdminPageProduct;