import React, {useEffect, useState} from 'react';
import axios from "axios";

const AdminOutputPage = () => {
    const AuthStr = 'Bearer '.concat(localStorage.getItem("TOKEN"));
    const [client, setClient] = useState({name: '', phoneNumber: ''});
    const handleClientChange = (event) => {
        setClient({...client, [event.target.name]: event.target.value});
    };
    const [currencies, setCurrencies] = useState([]);
    const [products, setProducts] = useState([]);
    const [currencyName, setCurrencyName] = useState('');
    const [clients, setClients] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [warehouseI, setWarehouseI] = useState('');
    const [inputData, setInputData] = useState({
        currencyId: '',
        warehouseId: '',
        clientId: '',
    });
    const [inputProduct, setInputProduct] = useState({});
    const [outputs, setOutputs] = useState([]);


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

        axios.get('http://localhost:8080/api/client', {headers: {Authorization: AuthStr}})
            .then(res => {
                setClients(res.data);
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
        axios.get('http://localhost:8080/api/admin/output', {headers: {Authorization: AuthStr}})
            .then(res => {
                setOutputs(res.data)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handleAddClient = async () => {
        await axios.post('http://localhost:8080/api/client', client, {
            headers: {Authorization: AuthStr, "Content-Type": "application/json"},
        }).then(res => {
            console.log(res)
            setClient({name: '', phoneNumber: ''});
        }).catch(err => {
            console.log(err)
        });
    };
    const handleAddInput = async () => {
        await axios.post('http://localhost:8080/api/admin/output', inputData, {
            headers: {Authorization: AuthStr},
        }).then(res => {
            setInputData({
                currencyId: '',
                warehouseId: '',
                clientId: '',
            });
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    };
    const handleInputChangeInput = (event) => {
        setInputProduct({...inputProduct, [event.target.name]: event.target.value});
    }
    const handleInputChangeI = (event) => {
        let b = true;
        let filter = "";
        let warehouset = "";
        let client = "";
        const {name, value} = event.target;
        switch (name) {
            case 'currency':
                filter = currencies.filter((i) => i.name === value).map((i) => i.id).toString();
                setCurrencyName(filter);
                break;
            case 'warehouse':
                warehouset = warehouses.filter((i) => i.name === value).map((i) => i.id).toString();
                setWarehouseI(warehouset)
                console.log(warehouset)
                break;
            case 'client':
                client = clients.filter((i) => i.name === value).map((i) => i.id).toString();
                break;
            default:
                b = false;
        }
        if (b) {
            setInputData({
                currencyId: currencyName,
                warehouseId: warehouseI,
                clientId: client,
            })
        }

    };
    const sendInputProduct = async () => {
        await axios.post('http://localhost:8080/api/admin/outputproduct', inputProduct, {
            headers: {Authorization: AuthStr},
        }).then(res => {
            setInputProduct({});
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
        console.log(inputProduct)
    };


    return (localStorage.getItem("role") === "ROLE_ADMIN" ? (<>
            <div className={"forms-container"}>
                <div className="form-section" style={{height: "200px"}}>
                    <h2 className="form-header">Add client</h2>
                    <div className="input-wrapper">
                        <input
                            id="clientName"
                            name="name"
                            placeholder="name"
                            type="text"
                            value={client.name}
                            onChange={handleClientChange}
                            className="form-input"
                        />
                        <input
                            id="clientPhone"
                            name="phoneNumber"
                            placeholder="phone number"
                            type="text"
                            value={client.phoneNumber}
                            onChange={handleClientChange}
                            className="form-input"
                        />
                    </div>
                    <button className="submit-button" onClick={handleAddClient}>
                        Ok
                    </button>
                </div>
                <div className="form-section">
                    <h2 className="form-header">Add Output</h2>
                    <div className="input-wrapper">
                        <input
                            value={"date (auto generated)"}
                            disabled={true}
                            className="form-input"
                        />
                    </div>
                    <div className="input-wrapper">
                        <h5>currency</h5>

                        <select name="currency" onChange={handleInputChangeI} defaultValue={''}
                                className="form-input">
                            <option id={""} key={"index"}></option>
                            {currencies.map((value, index, array) => (
                                <option id={value.id} key={index}>{value.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-wrapper">
                        <h5>warehouse</h5>

                        <select name="warehouse" onChange={handleInputChangeI} defaultValue={''}
                                className="form-input">
                            <option id={""} key={"index"}></option>
                            {warehouses.map((value, index, array) => (
                                <option id={value.id} key={index}>{value.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-wrapper">
                        <h5>client</h5>
                        <select name="client" onChange={handleInputChangeI} defaultValue={''}
                                className="form-input">
                            <option id={""} key={"index"}></option>
                            {clients.map((value, index, array) => (
                                <option id={value.id} key={index}>{value.name}</option>

                            ))}
                        </select>
                    </div>

                    <button className="submit-button" onClick={() => {
                        handleAddInput();
                    }}>Ok
                    </button>

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
                        <select name="outputId" onChange={handleInputChangeInput} defaultValue={''}
                                className="form-input">
                            <option id={""} key={"index"}></option>
                            {outputs.map((value, index, array) => (
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


                    <button className="submit-button" onClick={() => {
                        sendInputProduct()
                    }}>Ok
                    </button>
                </div>
            </div>
        </>) : ""
    );
};

export default AdminOutputPage;