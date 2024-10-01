import React, { useContext } from "react";
import SideBar from "../../Components/DashBoard/SideBar/SideBar";
import ManusideBar from "./ManusideBar";
import './Manufacturer.css';
import NavBar from "../../Components/DashBoard/NavBar/NavBar";
import Metrics from "./Metrics/Metrics";
import Activity from "./Activity/Activity";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

const manufacturerLinks = [
    { title: "Dashboard", path: "/Manufacturer" },
    { title: "Hospitals", path: "/Manufacturer/Hospitals" },
    { title: "Profile", path: "/Manufacturer/Profile" },
];

const Manufacturer = () => {
    const { accessToken } = useContext(UserContext);

    if (!accessToken) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className="ManufacturerScreen">
            <SideBar sideBarData={ManusideBar} />
            <div className="ManufacturerContent">
                <NavBar nameofPage="Manufacturer" dropdownLinks={manufacturerLinks} />
                <div className="ManufactureGrid">
                    <Metrics />
                    <Activity />
                </div>
            </div>
        </div>
    );
};

export default Manufacturer;
