import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {AuthStr} from '../../exported/Utils';

const AdminPageProduct = () => {
    const [currencies, setCurrencies] = useState([]);
    const [measurements, setMeasurements] = useState([]);
    const [categories, setCategories] = useState([]);

    // States for input values
    const [currencyName, setCurrencyName] = useState('');
    const [measurementName, setMeasurementName] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [supplierPhone, setSupplierPhone] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [productName, setProductName] = useState('');
    const [productCurrency, setProductCurrency] = useState('');
    const [productMeasurement, setProductMeasurement] = useState('');
    const [productParentCategoryId, setProductParentCategoryId] = useState('');
    const [productChildCategoryId, setProductChildCategoryId] = useState('');
    const [photoFile, setPhotoFile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/currency', {headers: {Authorization: AuthStr}})
            .then(res => {
                setCurrencies(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('http://localhost:8080/api/admin/category', {headers: {Authorization: AuthStr}})
            .then(res => {
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
    }, []);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        console.log(name + "--" + value)
        switch (name) {
            case 'currency':
                let filter = currencies.filter((i) => i.name === value).map((i) => i.id).toString();
                setCurrencyName(filter);
                break;
            case 'measurement':
                let measurement = measurements.filter((i) => i.name === value).map((i) => i.id).toString();
                setMeasurementName(measurement);
                console.log(measurement);
                break;
            case 'supplierName':
                setSupplierName(value);
                console.log(value);
                break;
            case 'supplierPhone':
                setSupplierPhone(value);
                console.log(value);
                break;
            case 'categoryName':
                setCategoryName(value);
                console.log(value);
                break;
            case 'parentCategoryId':
                let pCategory = categories.filter((i) => i.name === value).map((i) => i.id).toString();
                setParentCategoryId(pCategory);
                console.log(pCategory);
                break;
            case 'productName':
                setProductName(value);
                console.log(value);
                break;
            case 'productCurrency':
                setProductCurrency(value);
                console.log(value);
                break;
            case 'productMeasurement':
                setProductMeasurement(value);
                console.log(value);
                break;
            case 'productParentCategoryId':
                setProductParentCategoryId(value);
                console.log(value);
                break;
            case 'productChildCategoryId':
                let pCategory2 = categories.filter((i) => i.name === value).map((i) => i.id).toString();
                setProductChildCategoryId(pCategory2);
                console.log(pCategory2);
                break;
            case 'photoFile':
                setPhotoFile(event.target.files[0]);
                break; // No need to log the file object
            default:
            // Handle unexpected input names
        }
    };


    // const handleAddCurrency = async () => {
    //     const response = await axios.post('http://localhost:8080/api/admin/currency', {name: currencyName}, {headers: {Authorization: AuthStr}});
    //     if (response.data.success) {
    //         setCurrencies([...currencies, response.data.currency]);
    //         setCurrencyName(''); // Clear input after successful addition
    //     } else {
    //         // Handle error
    //     }
    // };

    const handleAddSupplier = async () => {
        const response = await axios.post('http://localhost:8080/api/admin/supplier', {
            name: supplierName,
            phone: supplierPhone
        }, {headers: {Authorization: AuthStr}});
        if (response.data.success) {
            // Update states or perform actions based on successful supplier addition
            setSupplierName('');
            setSupplierPhone('');
        } else {
            // Handle error
        }
    };

    const handleAddCategory = async () => {
        const response = await axios.post('http://localhost:8080/api/admin/category', {
            name: categoryName,
            parentId: parentCategoryId
        }, {headers: {Authorization: AuthStr}});
        console.log(response)
        if (response === "successfull") {
            // Update states or perform actions based on successful category addition
            setCategories([...categories, response.data.category]);
            alert(response)
            setCategoryName('');
            setParentCategoryId('');
        } else {
            // Handle error
        }
    };

    const handleAddProduct = async () => {
        const formData = new FormData();
        formData.append('name', productName);
        formData.append('measurementId', measurementName);
        formData.append('categoryId', productChildCategoryId);

        const response = await axios.post('http://localhost:8080/api/admin/product', formData, {
            headers: {
                Authorization: AuthStr,
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        });
        if (response?.data?.size > 0) {
            // Update states or perform actions based on successful product addition
            setProductName('');
            setProductCurrency(''); // Reset to default currency
            setProductMeasurement(''); // Reset to default measurement
            setProductParentCategoryId('');
            setProductChildCategoryId('');
            setPhotoFile(null);
        } else {
            // Handle error
        }
    };
    const handleAddMeasurement = async () => {
        const response = await axios.post('http://localhost:8080/api/admin/measurement', {name: measurementName}, {headers: {Authorization: AuthStr}});
        if (response.data.success) {
            // Update states or perform actions based on successful measurement addition
            setMeasurements([...measurements, response.data.measurement]);
            setMeasurementName(''); // Clear input after successful addition
        } else {
            // Handle error
        }
    };


    const handleUploadPhoto = async () => {
        const photo = new FormData();
        photo.append('name', photoFile);
        await axios.post("http://localhost:8080/api/attachment/upload", photo, {
            headers: {
                Authorization: AuthStr, "Content-Type": "multipart/form-data"
            },
        }).then(res => {
            setPhotoFile(null);
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    };


    return (
        <>
            <div className="forms-container">
                {/*<div className="form-section">*/}
                {/*    <h2 className="form-header">Add currency</h2>*/}
                {/*    <div className="input-wrapper">*/}
                {/*        <input*/}
                {/*            id="currencyInput"*/}
                {/*            name="currencyName"*/}
                {/*            placeholder="name"*/}
                {/*            type="text"*/}
                {/*            onChange={handleInputChange}*/}
                {/*            className="form-input"*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <button className="submit-button" onClick={() => handleAddCurrency()}>*/}
                {/*        Ok*/}
                {/*    </button>*/}
                {/*</div>*/}

                <div className="form-section">
                    <h2 className="form-header">Add measurement</h2>
                    <div className="input-wrapper">
                        <input
                            id="measurementInput"
                            name="measurementName"
                            placeholder="name"
                            type="text"
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <button className="submit-button" onClick={() => handleAddMeasurement()}>
                        Ok
                    </button>
                </div>

                <div className="form-section">
                    <h2 className="form-header">Add supplier</h2>
                    <div className="input-wrapper">
                        <input
                            id="supplierNameInput"
                            name="supplierName"
                            placeholder="name"
                            type="text"
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <div className="input-wrapper">
                        <input
                            id="supplierPhoneInput"
                            name="supplierPhone"
                            placeholder="phone number"
                            type="text"
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <button className="submit-button" onClick={() => handleAddSupplier()}>
                        Ok
                    </button>
                </div>

                <div className="form-section">
                    <h2 className="form-header">Add category</h2>
                    <div className="input-wrapper">
                        <input

                            id="categoryNameInput"
                            name="categoryName"
                            placeholder="name"
                            type="text"
                            onChange={handleInputChange}
                            className="form-input"
                        />
                    </div>
                    <label htmlFor="parentCategory">parentCategory</label>
                    <select name="parentCategoryId" onChange={handleInputChange} defaultValue={""}
                            className="form-input">
                        <option id={""} key={"index"}></option>
                        {categories
                            .filter((category) => category.parentCategory === null)
                            .map((value, index, array) => (
                                <option id={value.id} key={index}>{value.name}</option>
                            ))}
                    </select>
                    <button className="submit-button" onClick={() => handleAddCategory()}>
                        Ok
                    </button>
                </div>

                <div className="form-section">
                    <h2 className="form-header">Add product</h2>
                    <div className="input-wrapper">
                        <input
                            placeholder="name"
                            type="text"
                            onChange={handleInputChange}
                            name="productName"
                            className="form-input"
                        />
                    </div>
                    <div className="input-wrapper">
                        <select name="currency" onChange={handleInputChange} defaultValue={'uzs'}
                                className="form-input">
                            <option id={""} key={"index"}></option>
                            {currencies.map((value, index, array) => (
                                <option id={value.id} key={index}>{value.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-wrapper">
                        <select name="measurement" onChange={handleInputChange} defaultValue={"kilo"}
                                className="form-input">
                            <option id={""} key={"index"}></option>

                            {measurements.map((value, index, array) => (
                                <option id={value.id} key={index}>{value.name}</option>
                            ))}
                        </select>
                    </div>
                    <label htmlFor="child">category</label>
                    <select name="productChildCategoryId" onChange={handleInputChange} id="" className="form-input">
                        <option id={""} key={"index"}></option>

                        {categories
                            .filter((category) => category.parentCategory !== null)
                            .map((value, index, array) => (
                                <option id={value.id} key={index}>{value.name}</option>
                            ))}
                    </select>
                    <button className="submit-button" onClick={() => handleAddProduct()}>
                        Ok
                    </button>
                </div>

                <div className="form-section">
                    <h2 className="form-header">Photo upload</h2>
                    <div className="input-wrapper">
                        <input
                            type="file"
                            accept=".jpg"
                            onChange={handleInputChange}
                            name="photoFile"
                            className="file-input"
                        />
                    </div>
                    <button className="submit-button" onClick={() => handleUploadPhoto()}>
                        Ok
                    </button>
                </div>
            </div>
        </>
    );
};

export default AdminPageProduct;
