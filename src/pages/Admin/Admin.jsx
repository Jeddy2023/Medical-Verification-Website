import React from "react";
import SideBar from "../../Components/DashBoard/SideBar/SideBar";
import ManusideBar from "./ManusideBar";
import './Admin.css';
import NavBar from "../../Components/DashBoard/NavBar/NavBar";
import Metrics from "./Metrics/Metrics";
import Activity from "./Activity/Activity";

const adminLinks = [
    { path: "/", label: "Dashboard" },
    { path: "/manufacturers", label: "Manufacturers" },
    { path: "/requests", label: "Requests" }
];

const Admin = () => {
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
