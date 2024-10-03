import React, { useContext } from "react";
import SideBar from "../../../Components/DashBoard/SideBar/SideBar";
import ManusideBar from "../ManusideBar";
import './Hospitals.css';
import NavBar from "../../../Components/DashBoard/NavBar/NavBar";
import TabComponent from "../../../Components/Tabs/Tab";
import { UserContext } from "../../../context/userContext";
import { Navigate } from "react-router-dom";

const HospitalPage = () => {
    const { accessToken, loading } = useContext(UserContext);

    if (!accessToken && !loading) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className="ManufacturerScreen">
            <SideBar sideBarData={ManusideBar} />
            <div className="ManufacturerContent">
                <NavBar nameofPage="Manufacturer" />
                <div className="ManufactureGrid">
                    <TabComponent tabOne="Add Drug" tabThree="Medicine Listing" tabOneHeader="ADD DRUGS" tabOnefirstLabel="Drug Name" tabOnesecondLabel="Manufactured Date" AddButton="Add Drug" tabOnethirdLabel="Expiration Date" tabOnefourLabel="Medical Description"/>
                </div>
            </div>
        </div>
    );
};

export default HospitalPage;
