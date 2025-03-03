"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("demoUser");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                router.push("/auth/login");
            }
        }
    }, []);

    const login = async (role = "user") => {
        const demoUser = {
            name: "John Doe",
            email: "johndoe@example.com",
            role: role,
        };
        setUser(demoUser);
        localStorage.setItem("demoUser", JSON.stringify(demoUser));
        router.push("/dashboard");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("demoUser");
        router.push("/auth/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
