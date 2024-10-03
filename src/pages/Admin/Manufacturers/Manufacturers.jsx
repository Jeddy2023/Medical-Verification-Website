import React, { useContext } from "react";
import SideBar from "../../../Components/DashBoard/SideBar/SideBar";
import ManusideBar from "../ManusideBar";
import './Manufacturers.css';
import NavBar from "../../../Components/DashBoard/NavBar/NavBar";
import TabComponent from "../../../Components/Tabs/Tab";
import { UserContext } from "../../../context/userContext";
import { Navigate } from "react-router-dom";

const Manufacturers = () => {
    const { accessToken, loading } = useContext(UserContext);

    if (!accessToken && !loading) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className="ManufacturerScreen">
            <SideBar sideBarData={ManusideBar} />
            <div className="ManufacturerContent">
                <NavBar nameofPage="Admin" />
                <div className="ManufactureGrid">
                    <TabComponent tabTwo="All Manufacturers" showTabtwo={true} admin={true} tabOneHeader="ADD MANUFACTURER" tabOnefirstLabel="Manufacturer" tabOnesecondLabel="Description" AddButton="Add Manufacturer" tabThree={"Drug Listing"}/>
                </div>
            </div>
        </div>
    );
};

export default Manufacturers;
