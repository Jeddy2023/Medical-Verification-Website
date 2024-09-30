import React, { useState, createContext, useEffect, useContext } from "react";
import Cookies from 'js-cookie';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const accessTokenFromCookie = Cookies.get('accessToken');
        if (accessTokenFromCookie) {
            setAccessToken(accessTokenFromCookie);
        }
    }, []);

    const login = (data) => {
        const { accessToken } = data;
        setAccessToken(accessToken);;
        Cookies.set('accessToken', accessToken);
    };

    const logout = () => {
        setAccessToken(null);
        Cookies.remove('accessToken');
    };

    return (
        <UserContext.Provider value={{ accessToken, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
