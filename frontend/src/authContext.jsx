import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    // ✅ Load user from localStorage on mount
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setCurrentUser(userId);
        }
    }, []);

    // ✅ Keep localStorage in sync when currentUser changes
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('userId', currentUser);
        } else {
            localStorage.removeItem('userId');
        }
    }, [currentUser]);

    const value = {
        currentUser,
        setCurrentUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
