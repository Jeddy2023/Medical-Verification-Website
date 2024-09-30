import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { MdFactory } from "react-icons/md";

export const ManusideBar = [
    {
        title: "Dashboard",
        icon: <MdDashboard className="icon"/>,
        path: '/Admin'
    },
    {
        title: "Manufacturers",
        icon: <MdFactory className="icon"/>,
        path: '/Admin/Manufacturers'
    },
    {
        title: "Requests",
        icon: <IoGitPullRequestSharp className="icon"/>,
        path: '/Admin/Requests'

    }
]

export default ManusideBar