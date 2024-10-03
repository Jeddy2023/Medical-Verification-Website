import React, { useContext, useEffect, useState } from "react";
import SideBar from "../../../Components/DashBoard/SideBar/SideBar";
import ManusideBar from "../ManusideBar";
import './Profile.css';
import NavBar from "../../../Components/DashBoard/NavBar/NavBar";
import { IoSettingsOutline } from "react-icons/io5";
import { api } from "../../../api/axios";
import { UserContext } from "../../../context/userContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.post("/users/profile");
                console.log(response)
                const user = response.data.user; 
                setUserData({
                    name: user.name,
                    email: user.email,
                });
            } catch (error) {
                console.log("Error fetching user data:", error.response.data);
            }
        };

        fetchUserData();
    }, []);

    const { accessToken, loading } = useContext(UserContext);

    if (!accessToken && !loading) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div className="ManufacturerScreen">
            <SideBar sideBarData={ManusideBar} />
            <div className="ManufacturerContent">
                <NavBar nameofPage="Manufacturer" />
                <div className="profile">
                    {/* Profile Section */}
                    <form>
                        <h2><IoSettingsOutline /> PROFILE</h2>
                        <div className="profileFields">
                            <div className="labelFields">
                                <label>Name</label>
                                <label>Email</label>
                                {/* <label>Phone</label>
                                <label>Address</label> */}
                            </div>
                            <div className="inputFields">
                                <input 
                                    type="text" 
                                    value={userData.name} 
                                    readOnly 
                                />
                                <input 
                                    type="email" 
                                    value={userData.email} 
                                    readOnly 
                                />
                                {/* <input 
                                    type="text" 
                                    value={userData.phone} 
                                    readOnly 
                                />
                                <input 
                                    type="text" 
                                    value={userData.address} 
                                    readOnly 
                                /> */}
                            </div>
                        </div>
                    </form>

                    {/* Change Password Section */}
                    <form>
                        <h2><IoSettingsOutline /> CHANGE PASSWORD</h2>
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
