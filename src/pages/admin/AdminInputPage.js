import React, {useEffect, useState} from 'react';
import axios from "axios";
import {AuthStr} from "../../exported/Utils";

const AdminInputPage = () => {

    const [currencies, setCurrencies] = useState([]);
    const [products, setProducts] = useState([]);
    const [inputs, setInputs] = useState([]);
    const [inputProduct, setInputProduct] = useState({});
    const [currencyName, setCurrencyName] = useState('');
    const [supplier, setSupplier] = useState({name: '', phoneNumber: ''});
    const [suppliers, setSuppliers] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [warehouse, setWarehouse] = useState({name: ''});
    const [warehouseI, setWarehouseI] = useState('');
    const [inputData, setInputData] = useState({
        currencyId: '',
        warehouseId: '',
        supplierId: '',
    });


    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/currency', {headers: {Authorization: AuthStr}})
            .then(res => {
                setCurrencies(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('http://localhost:8080/api/warehouse', {headers: {Authorization: AuthStr}})
            .then(res => {
                setWarehouses(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('http://localhost:8080/api/admin/supplier', {headers: {Authorization: AuthStr}})
            .then(res => {
                setSuppliers(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('http://localhost:8080/api/admin/product', {headers: {Authorization: AuthStr}})
            .then(res => {
                setProducts(res.data)
            })
            .catch(err => {
                console.log(err);
            });
        axios.get('http://localhost:8080/api/admin/input', {headers: {Authorization: AuthStr}})
            .then(res => {
                setInputs(res.data)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        console.log(name + "--" + value)
        switch (name) {
            case 'currencyName':
                setCurrencyName(value);
                break;
            default:
            // Handle unexpected input names
        }
    };
    const handleAddCurrency = async () => {
        if (currencyName.length > 0) {
            await axios.post('http://localhost:8080/api/admin/currency', {name: currencyName}, {headers: {Authorization: AuthStr}})
                .then(res => {
                    console.log(res)
                    setCurrencies([...currencies, res.data]);
                    setCurrencyName(''); // Clear input after successful addition
                }).catch(err => {
                    console.log(err)
                });
        } else {
            console.log("size error")
        }
    };

    const handleSupplierChange = (event) => {
        setSupplier({...supplier, [event.target.name]: event.target.value});
    };

    // Function to handle adding a new supplier
    const handleAddSupplier = async () => {
        await axios.post('http://localhost:8080/api/admin/supplier', supplier, {
            headers: {Authorization: AuthStr, "Content-Type": "application/json"},
        }).then(res => {
            setSupplier({name: '', phoneNumber: ''});
        }).catch(err => {
            console.log(err)
        });
    };

    const handleWarehouseChange = (event) => {
        setWarehouse({...warehouse, [event.target.name]: event.target.value});
    };

    // Function to handle adding a new warehouse
    const handleAddWarehouse = async () => {
        await axios.post('http://localhost:8080/api/warehouse', warehouse, {
            headers: {Authorization: AuthStr},
        }).then(res => {
            setWarehouse({name: ''});
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    };


    const handleAddInput = async () => {
        await axios.post('http://localhost:8080/api/admin/input', inputData, {
            headers: {Authorization: AuthStr},
        }).then(res => {
            setInputData({
                currencyId: '',
                warehouseId: '',
                supplierId: '',
            });
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    };

    const handleInputChangeI = (event) => {
        let b = true;
        let filter = "";
        let warehouset = "";
        let supplier = "";
        // setInputData({ ...inputData, [event.target.name+"Id"]: event.target.value});
        const {name, value} = event.target;
        switch (name) {
            case 'currency':
                filter = currencies.filter((i) => i.name === value).map((i) => i.id).toString();
                setCurrencyName(filter);
                break;
            case 'warehouse':
                warehouset = warehouses.filter((i) => i.name === value).map((i) => i.id).toString();
                setWarehouseI({name: warehouset})
                console.log(warehouset)
                break;
            case 'supplier':
                supplier = suppliers.filter((i) => i.name === value).map((i) => i.id).toString();
                break;
            default:
                b = false;
        }
        if (b) {
            setInputData({
                currencyId: currencyName,
                warehouseId: warehouseI,
                supplierId: supplier,
            })
        }

    };

    const handleInputChangeInput = (event) => {
        setInputProduct({...inputProduct, [event.target.name]: event.target.value});
    }


    const sendInputProduct = async () => {
        await axios.post('http://localhost:8080/api/admin/inputproduct', inputProduct, {
            headers: {Authorization: AuthStr},
        }).then(res => {
            setInputProduct({});
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    };
    return (
        <div className={"forms-container"}>

            <div className="form-section">
                <h2 className="form-header">Add currency</h2>
                <div className="input-wrapper">
                    <input
                        id="currencyInput"
                        name="currencyName"
                        placeholder="name"
                        type="text"
                        onChange={handleInputChange}
                        className="form-input"
                    />
                </div>
                <button className="submit-button" onClick={() => handleAddCurrency()}>
                    Ok
                </button>
            </div>

            <div className="form-section" >
                <h2 className="form-header">Add supplier</h2>
                <div className="input-wrapper">
                    <input
                        id="supplierName"
                        name="name"
                        placeholder="name"
                        type="text"
                        value={supplier.name}
                        onChange={handleSupplierChange}
                        className="form-input"
                    />
                    <input
                        id="supplierPhone"
                        name="phoneNumber"
                        placeholder="phone number"
                        type="text"
                        value={supplier.phone}
                        onChange={handleSupplierChange}
                        className="form-input"
                    />
                </div>
                <button className="submit-button" onClick={handleAddSupplier}>
                    Ok
                </button>
            </div>

            <div className="form-section">
                <h2 className="form-header">Add warehouse</h2>
                <div className="input-wrapper">
                    <input
                        id="warehouseName"
                        name="name"
                        placeholder="name"
                        type="text"
                        value={warehouse.name}
                        onChange={handleWarehouseChange}
                        className="form-input"
                    />
                    {/*    to bind warehouse to user we need edit user function and set user warehouseId to this id   */}
                </div>
                <button className="submit-button" onClick={handleAddWarehouse}>
                    Ok
                </button>
            </div>

            <div className="form-section" >
                <h2 className="form-header">Add Input</h2>
                <div className="input-wrapper">
                    <input
                        value={"date (auto generated)"}
                        disabled={true}
                        className="form-input"
                    />
                </div>
                <div className="input-wrapper">
                    <select name="currency" onChange={handleInputChangeI} defaultValue={''}
                            className="form-input">
                        <option id={""} key={"index"}></option>
                        {currencies.map((value, index, array) => (
                            <option id={value.id} key={index}>{value.name}</option>
                        ))}
                    </select>
                </div>

                <div className="input-wrapper">
                    <select name="warehouse" onChange={handleInputChangeI} defaultValue={''}
                            className="form-input">
                        <option id={""} key={"index"}></option>
                        {warehouses.map((value, index, array) => (
                            <option id={value.id} key={index}>{value.name}</option>
                        ))}
                    </select>
                </div>

                <div className="input-wrapper">
                    <select name="supplier" onChange={handleInputChangeI} defaultValue={''}
                            className="form-input">
                        <option id={""} key={"index"}></option>
                        {suppliers.map((value, index, array) => (
                            <option id={value.id} key={index}>{value.name}</option>
                        ))}
                    </select>
                </div>


                <button className="submit-button" onClick={() => handleAddInput()}>Ok</button>
            </div>

            <div className="form-section">
                <h2 className="form-header">Add Input Product</h2>
                <div className="input-wrapper">
                    <input
                        value={"date (auto generated)"}
                        disabled={true}
                        className="form-input"
                    />
                </div>
                <div className="input-wrapper">
                    <select name="productId" onChange={handleInputChangeInput} defaultValue={''}
                            className="form-input">
                        <option id={""} key={"index"}></option>
                        {products.map((value, index, array) => (
                            <option id={value.id} key={index} value={value.id}>{value.name}</option>
                        ))}
                    </select>
                </div>

                <div className="input-wrapper">
                    <select name="inputId" onChange={handleInputChangeInput} defaultValue={''}
                            className="form-input">
                        <option id={""} key={"index"}></option>
                        {inputs.map((value, index, array) => (
                            <option id={value.id} key={index} value={value.id}>{value.code}</option>
                        ))}
                    </select>
                </div>
                <div className="input-wrapper">
                    <input
                        id="price"
                        name="price"
                        placeholder="price"
                        type="text"
                        onChange={handleInputChangeInput}
                        className="form-input"
                    />
                </div>
                <div className="input-wrapper">
                    <input
                        id="amount"
                        name="amount"
                        placeholder="amount"
                        type="text"
                        onChange={handleInputChangeInput}
                        className="form-input"
                    />
                </div>


                <button className="submit-button" onClick={() => sendInputProduct()}>Ok</button>
            </div>


        </div>
    );
};

export default AdminInputPage;