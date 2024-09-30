import React from "react";
import { Link } from "react-router-dom";
import './DropDown.css';

const DropDown = ({isOpen}) => {
    return (
        <div className={isOpen ? 'drop-down' : 'drop-down closed'}>
            <ul>
                <li><Link>Home</Link></li>
                <li><Link>About Us</Link></li>
                <li><Link>Contact</Link></li>
            </ul>
            <div>
                <Link>Login</Link>
                <Link>Register</Link>
            </div>
        </div>
    );
};

export default DropDown;
