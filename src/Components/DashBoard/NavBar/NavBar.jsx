import React, { useContext, useState } from "react";
import { FaUserCheck } from "react-icons/fa";
import './NavBar.css';
import Hamburger from "../../../assets/images/Hamburger.png";
import AdminDrop from "../../../pages/Admin/AdminDrop/AdminDrop";
import { UserContext } from "../../../context/userContext";
import { useNavigate } from "react-router-dom";

const NavBar = ({ nameofPage, dropdownLinks }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dashTitle">
            <div className="user">
                <FaUserCheck className="icon" />
                <p>{nameofPage}</p>
            </div>
            <img src={Hamburger} alt='Hamburger' className="hamburger" onClick={toggleDropdown} />
            <button className="logoutButton" onClick={() => {
                logout();
                navigate('/auth/login');
            }}>Log Out</button>
            <AdminDrop isOpen={isOpen} dropdownLinks={dropdownLinks} />
        </div>
    );
}

export default NavBar;
