import { use } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import Loader from "../pages/Shared/Loader";

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();

    if(loading){
        return <Loader></Loader>
    }

    if (!user) {
        return <Navigate to="/signin" state={location.pathname}></Navigate>
    }

    return children;
};

export default PrivateRoute;