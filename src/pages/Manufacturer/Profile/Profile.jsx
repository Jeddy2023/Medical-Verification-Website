import React from "react";
import SideBar from "../../../Components/DashBoard/SideBar/SideBar";
import ManusideBar from "../ManusideBar";
import './Profile.css';
import NavBar from "../../../Components/DashBoard/NavBar/NavBar";
import { IoSettingsOutline } from "react-icons/io5";

const Profile = () => {
    return (
        <div className="ManufacturerScreen">
            <SideBar sideBarData={ManusideBar} />
            <div className="ManufacturerContent">
                <NavBar nameofPage="Manufacturer" />
                <div className="profile">
                    <form>
                        <h2><IoSettingsOutline/> PROFILE</h2>
                        <div className="profileFields">
                            <div className="labelFields">
                                <label>Name</label>
                                <label>Email</label>
                                <label>Phone</label>
                                <label>Address</label>
                            </div>
                            <div className="inputFields">
                                <input type="text" />
                                <input type="email" />
                                <input type="number" />
                                <input type="text" />
                            </div>
                        </div>
                        <button>Update</button>
                    </form>
                    <form>
                    <h2><IoSettingsOutline/> CHANGE PASSWORD</h2>
                    <div className="profileFields">
                            <div className="labelFields">
                                <label>Old Password</label>
                                <label>New Password</label>
                            </div>
                            <div className="inputFields">
                                <input type="password" />
                                <input type="password" />
                            </div>
                        </div>
                        <button>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
