import React from "react";
import SideBar from "../../../Components/DashBoard/SideBar/SideBar";
import ManusideBar from "../ManusideBar";
import './Hospitals.css';
import NavBar from "../../../Components/DashBoard/NavBar/NavBar";
import TabComponent from "../../../Components/Tabs/Tab";

const HospitalPage = () => {
    return (
        <div className="ManufacturerScreen">
            <SideBar sideBarData={ManusideBar} />
            <div className="ManufacturerContent">
                <NavBar nameofPage="Manufacturer" />
                <div className="ManufactureGrid">
                    <TabComponent tabOne="Add Drug" tabOneHeader="ADD DRUGS" tabOnefirstLabel="Drug Name" tabOnesecondLabel="Manufactured Date" AddButton="Add Drug" tabOnethirdLabel="Expiration Date" tabOnefourLabel="Medical Description"/>
                </div>
            </div>
        </div>
    );
};

export default HospitalPage;
