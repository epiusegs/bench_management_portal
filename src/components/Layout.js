"use client";

import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Optionally, load dark mode preference from localStorage here
    }, []);
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    if (!mounted) return null;
    return (
        <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100"} flex`}>
            {/* Sidebar */}
            <Sidebar isDarkMode={isDarkMode} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Navbar */}
                <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

                {/* Page Content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
