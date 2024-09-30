import React from "react";
import SideBar from "../../Components/DashBoard/SideBar/SideBar";
import ManusideBar from "./ManusideBar";
import './Manufacturer.css';
import NavBar from "../../Components/DashBoard/NavBar/NavBar";
import Metrics from "./Metrics/Metrics";
import Activity from "./Activity/Activity";

const manufacturerLinks = [
    { title: "Dashboard", path: "/Manufacturer" },
    { title: "Hospitals", path: "/Manufacturer/Hospitals" },
    { title: "Profile", path: "/Manufacturer/Profile" },
];

const Manufacturer = () => {
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
