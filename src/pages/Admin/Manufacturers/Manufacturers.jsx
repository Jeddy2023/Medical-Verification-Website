import React from "react";
import SideBar from "../../../Components/DashBoard/SideBar/SideBar";
import ManusideBar from "../ManusideBar";
import './Manufacturers.css';
import NavBar from "../../../Components/DashBoard/NavBar/NavBar";
import TabComponent from "../../../Components/Tabs/Tab";

const Manufacturers = () => {
    return (
        <div className="ManufacturerScreen">
            <SideBar sideBarData={ManusideBar} />
            <div className="ManufacturerContent">
                <NavBar nameofPage="Admin" />
                <div className="ManufactureGrid">
                    <TabComponent tabTwo="All Manufacturers" showTabtwo={true} tabOneHeader="ADD MANUFACTURER" tabOnefirstLabel="Manufacturer" tabOnesecondLabel="Description" AddButton="Add Manufacturer"/>
                </div>
            </div>
        </div>
    );
};

export default Manufacturers;
