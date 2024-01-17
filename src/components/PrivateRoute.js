import {Navigate, Outlet} from "react-router-dom";


const PrivateRoute = (props) => {
    let userid = localStorage.getItem("TOKEN") != null;

    return (
        <>
            {userid ? <Outlet/> : <Navigate to="/"/>};
        </>

    )
};

export default PrivateRoute;