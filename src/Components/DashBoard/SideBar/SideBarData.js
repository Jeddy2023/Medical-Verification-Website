import React from "react";
import { MdDashboard } from "react-icons/md";
import { RiMedicineBottleFill } from "react-icons/ri";
import { CiHospital1 } from "react-icons/ci";

export const SideBarData = [
    {
        title: "Dashboard",
        icon: <MdDashboard className="icon"/>,
        path: '/Manufacturer-dashboard'
    },
    {
        title: "Hospitals",
        icon: < CiHospital1 className="icon"/>,
        path: '/Manufacturer-dashboard/Hospitals'
    },
    {
        title: "Drug Batches",
        icon: <RiMedicineBottleFill className="icon"/>,
        path: '/Manufacturer-dashboard/Drug Batches'

    }
]