import React, { useContext, useEffect, useState } from "react";
import { z } from "zod";
import './Tab.css';
import { api } from "../../api/axios";
import { Button, Table } from "@mantine/core";
import { FaEdit, FaTrash } from 'react-icons/fa';
import toast from "react-hot-toast";

const tabSchema = z.object({
    name: z.string().nonempty({ message: 'Name is required.' }),
    description: z.string().nonempty({ message: 'Description is required.' }),
    manufactureDate: z.string().nonempty({ message: 'Manufacture date is required.' }),
    expirationDate: z.string().nonempty({ message: 'Expiration date is required.' }),
});

const TabComponent = ({ tabOne, tabTwo, tabThree, tabOneHeader, tabOnefirstLabel, tabOnesecondLabel, tabOnethirdLabel, tabOnefourLabel, AddButton, showTabtwo, admin }) => {
    const [activeTab, setActiveTab] = useState(showTabtwo ? 1 : 0);
    const [userData, setUserData] = useState([]);
    const [drugData, setDrugData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        manufactureDate: '',
        expirationDate: '',
        user_id: null,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.post("/users/profile");
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    user_id: response?.data?.user?.id,
                }));
            } catch (error) {
                console.error("Error fetching user data:", error.response.data);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        if (activeTab === 1) {
            fetchAllUsers();
        } else if (activeTab === 2) {
            fetchDrugs();
        }
    }, [activeTab]);

    const fetchAllUsers = async () => {
        try {
            const response = await api.get("/users");
            console.log("This is the response ", response);
            setUserData(response?.data?.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchDrugs = async () => {
        try {
            const endpoint = admin ? "/medicine" : "/medicine/drugs/manufacturer";
            const response = await api.get(endpoint);
            setDrugData(response?.data);
        } catch (error) {
            console.error("Error fetching drug data:", error);
        }
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const result = tabSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors = result.error.format();
            setErrors({
                name: formattedErrors.name?._errors[0],
                description: formattedErrors.description?._errors[0],
                manufactureDate: formattedErrors.manufactureDate?._errors[0],
                expirationDate: formattedErrors.expirationDate?._errors[0],
            });
            return;
        }

        try {
            setIsLoading(true);

            const formattedManufactureDate = new Date(formData.manufactureDate).toISOString();
            const formattedExpirationDate = new Date(formData.expirationDate).toISOString();

            const payload = {
                ...formData,
                manufactureDate: formattedManufactureDate,
                expirationDate: formattedExpirationDate,
            };

            const response = await api.post("/medicine", payload);

            toast.success('Drug added successfully!');

            setFormData({
                name: '',
                description: '',
                manufactureDate: '',
                expirationDate: '',
                user_id: formData.user_id,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="TabContainer">
            <div className="tabs">
                {tabOne && <button className={activeTab === 0 ? 'activeTab' : ''} onClick={() => handleTabClick(0)}>{tabOne}</button>}
                {tabTwo && <button className={activeTab === 1 ? 'activeTab' : ''} onClick={() => handleTabClick(1)}>{tabTwo}</button>}
                {tabThree && <button className={activeTab === 2 ? 'activeTab' : ''} onClick={() => handleTabClick(2)}>{tabThree}</button>}
            </div>

            <div className="tab-content">
                {tabOne && activeTab === 0 && (
                    <form onSubmit={handleSubmit}>
                        <h3>{tabOneHeader}</h3>
                        <div className="Fields">
                            <div className="Field">
                                <label htmlFor="name">{tabOnefirstLabel}</label>
                                <input name="name" value={formData.name} onChange={handleChange} />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </div>
                            <div className="Field">
                                <label htmlFor="description">{tabOnefourLabel}</label>
                                <input name="description" value={formData.description} onChange={handleChange} />
                                {errors.description && <span className="error">{errors.description}</span>}
                            </div>
                            <div className="Field">
                                <label htmlFor="manufactureDate">{tabOnesecondLabel}</label>
                                <input name="manufactureDate" type="date" value={formData.manufactureDate} onChange={handleChange} />
                                {errors.manufactureDate && <span className="error">{errors.manufactureDate}</span>}
                            </div>
                            <div className="Field">
                                <label htmlFor="expirationDate">{tabOnethirdLabel}</label>
                                <input name="expirationDate" type="date" value={formData.expirationDate} onChange={handleChange} />
                                {errors.expirationDate && <span className="error">{errors.expirationDate}</span>}
                            </div>
                        </div>
                        <Button type="submit" w={'100%'} loading={isLoading} size="lg">{AddButton}</Button>
                    </form>
                )}

                {tabTwo && activeTab === 1 && (
                    <div className="user-list">
                        <h3>User List</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userData && userData.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <Button variant="subtle" compact>
                                                <FaEdit />
                                            </Button>
                                            <Button variant="subtle" color="red" compact>
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}

                {tabThree && activeTab === 2 && (
                    <div className="user-list">
                        <h3>Drug List</h3>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Verification Code</th>
                                    <th>Manufacture Date</th>
                                    <th>Expiration Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {drugData && drugData.map((drug) => (
                                    <tr key={drug.id}>
                                        <td>{drug.name}</td>
                                        <td>{drug.description}</td>
                                        <td>{drug.verificationCode}</td>
                                        <td>{new Date(drug.manufactureDate).toLocaleDateString()}</td>
                                        <td>{new Date(drug.expirationDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TabComponent;
