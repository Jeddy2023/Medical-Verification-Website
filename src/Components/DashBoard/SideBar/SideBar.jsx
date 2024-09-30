import React from "react";
import { Link } from 'react-router-dom';
import { MdOutlineAddToQueue } from "react-icons/md";
import './SideBar.css';

const SideBar = ({ sideBarData }) => {
    return (
        <aside className="sideBarContainer">
            <div className="sideBar">
                <div className="sideBarTop">
                    <MdOutlineAddToQueue className="icon"/>
                </div>
                <div className="sideBarItems">
                    {sideBarData.map((item, key) => {
                        return (
                            <Link key={key} id={window.location.pathname === item.path ? "selected" : ''} to={item.path}>
                                {item.icon}<p>{item.title}</p>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
