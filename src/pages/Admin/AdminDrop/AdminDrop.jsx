import React from "react";
import { Link } from "react-router-dom";
import './AdminDrop.css';

const AdminDrop = ({ isOpen }) => {
    return (
        <div className={isOpen ? 'admindrop-down' : 'admindrop-down dropclosed'}>
            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/Manufacturer/Hospitals">Hospitals</Link></li>
                <li><Link to="/Manufacturer/Profile">Profile</Link></li>
            </ul>
            <div className="dropdownLogout">
                <button>Log Out</button>
            </div>
        </div>
    );
};

export default AdminDrop;
