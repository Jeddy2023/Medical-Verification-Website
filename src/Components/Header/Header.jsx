import React, { useState } from 'react';
import './Header.css';
import Hamburger from "../../assets/images/Hamburger.png";
import { Link } from 'react-router-dom';
import DropDown from '../../Components/DropDown/DropDown';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header>
        <nav>
          <div className="logo">Medic Verify</div>
          {/* <ul>
            <li><Link>Home</Link></li>
            <li><Link>About Us</Link></li>
            <li><Link>Contact</Link></li>
          </ul> */}
          <div className='details'>
            <Link to={'/auth/login'}>Login</Link>
            <Link to={'/auth/register'}>Register</Link>
          </div>
          <img src={Hamburger} alt='Hamburger' onClick={toggleDropdown}/>
        </nav>
      </header>
      <DropDown isOpen={isOpen}/>
    </>
  );
};

export default Header;
