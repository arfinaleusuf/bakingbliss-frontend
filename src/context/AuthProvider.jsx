import { createContext, useEffect, useState } from "react";
import { baseurl } from "../services/BaseUrl";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const accessToken = localStorage.getItem('access_token');

    const fetchUser = async () => {
        try {
            const userRes = await fetch(`${baseurl}/user`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (!userRes.ok) {
                throw new Error("Token expired or unauthorized");
            }

            const userData = await userRes.json();
            setAuthUser(userData);
        } catch (error) {
            console.error(error);
            localStorage.removeItem('access_token');
            setAuthUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!accessToken) {
            setAuthUser(null);
            setLoading(false);
            return;
        }
        fetchUser();
    }, [accessToken]);
    
    const logout = () => {
        localStorage.removeItem('access_token');
        setAuthUser(null);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading, setLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;