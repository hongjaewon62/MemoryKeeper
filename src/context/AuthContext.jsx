import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const stored = localStorage.getItem("user");
        return !!stored;
    });

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);