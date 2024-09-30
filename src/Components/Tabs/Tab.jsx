import React, { useContext, useEffect, useState } from "react";
import { z } from "zod";
import './Tab.css';
import { api } from "../../api/axios";
import { Button } from "@mantine/core";
import { UserContext } from "../../context/userContext";

const tabSchema = z.object({
    name: z.string().nonempty({ message: 'Name is required.' }),
    description: z.string().nonempty({ message: 'Description is required.' }),
    manufactureDate: z.string().nonempty({ message: 'Manufacture date is required.' }),
    expirationDate: z.string().nonempty({ message: 'Expiration date is required.' }),
});

const TabComponent = ({ tabOne, tabTwo, tabOneHeader, tabOnefirstLabel, tabOnesecondLabel, tabOnethirdLabel, tabOnefourLabel, AddButton }) => {
    const [activeTab, setActiveTab] = useState(0);
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        manufactureDate: '',
        expirationDate: '',
        user_id: userData?.id,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.post("/users/profile");
                console.log(response)
                setUserData(response?.data);
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
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="TabContainer">
            <div className="tabs">
                <button className={activeTab === 0 ? 'activeTab' : ''} onClick={() => handleTabClick(0)}>{tabOne}</button>
                <button className={activeTab === 1 ? 'activeTab' : ''} onClick={() => handleTabClick(1)}>{tabTwo}</button>
            </div>

            <div className="tab-content">
                {activeTab === 0 && (
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

                {activeTab === 1 && (
                    <form>
                        {/* Content for tabTwo */}
                    </form>
                )}
            </div>
        </div>
    );
};

export default TabComponent;
