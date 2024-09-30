import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { CiHospital1 } from "react-icons/ci";

export const ManusideBar = [
    {
        title: "Dashboard",
        icon: <MdDashboard className="icon"/>,
        path: '/Manufacturer'
    },
    {
        title: "Hospitals",
        icon: < CiHospital1 className="icon"/>,
        path: '/Manufacturer/Hospitals'
    },
    {
        title: "Profile",
        icon: <IoSettingsOutline className="icon"/>,
        path: '/Manufacturer/Profile'

    }
]

export default ManusideBar