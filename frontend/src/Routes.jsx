import React, { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';

// Page List 
import Dashboard from "./components/dashboard/Dashboard";
import SignUp from "./components/auth/SignUp";
import LogIn from "./components/auth/LogIn";
import Profile from "./components/user/Profile";
import Add from "./components/repo/Add";

// Auth Context
import { useAuth } from "./authContext";

const ProjectRoutes = () => {
    const { currentUser, setCurrentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const userIdFromStorage = localStorage.getItem("userId");

        if (userIdFromStorage && !currentUser) {
            setCurrentUser(userIdFromStorage);
        }

        if (!userIdFromStorage && !["/auth", "/signup"].includes(window.location.pathname)) {
            navigate("/auth");
        }

        // ✅ Corrected: also include "/signup" in the logged-in redirect check
        if (userIdFromStorage && ["/auth", "/signup"].includes(window.location.pathname)) {
            navigate('/');
        }
    }, [currentUser, navigate, setCurrentUser]);

    let element = useRoutes([
        { path: "/", element: <Dashboard /> },
        { path: "/auth", element: <LogIn /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/profile", element: <Profile /> },
        { path: "/create", element: <Add /> }
    ]);

    return element;
}

export default ProjectRoutes;
