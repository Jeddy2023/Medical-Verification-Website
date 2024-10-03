import React, { useContext } from "react";
import SideBar from "../../Components/DashBoard/SideBar/SideBar";
import ManusideBar from "./ManusideBar";
import './Admin.css';
import NavBar from "../../Components/DashBoard/NavBar/NavBar";
import Metrics from "./Metrics/Metrics";
import Activity from "./Activity/Activity";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

const adminLinks = [
    { path: "/", label: "Dashboard" },
    { path: "/manufacturers", label: "Manufacturers" },
    // { path: "/requests", label: "Requests" }
];

const Admin = () => {
    const { accessToken, loading } = useContext(UserContext);

    if (!accessToken && !loading) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className="ManufacturerScreen">
            <SideBar sideBarData={ManusideBar} />
            <div className="ManufacturerContent">
                <NavBar nameofPage="Admin" links={adminLinks} />
                <div className="ManufactureGrid">
                    <Metrics/>
                    <Activity/>
                </div>
            </div>
        </div>
    );
};

export default Admin;
