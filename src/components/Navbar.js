"use client";

import { useState } from "react";
import { BellIcon, MagnifyingGlassIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function Navbar({ isDarkMode, toggleDarkMode }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className={`${isDarkMode ? "bg-gray-800 text-white" : "bg-white"} shadow p-4 flex justify-between items-center`}>
            {/* Search Bar */}
            <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search"
                    className={`pl-10 pr-3 py-2 border rounded-md w-96 bg-gray-100 ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}
                />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
                {/* Dark Mode Toggle */}
                <button onClick={toggleDarkMode} className="p-2 rounded-md">
                    {isDarkMode ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-gray-500" />}
                </button>

                {/* Notifications */}
                <BellIcon className="h-6 w-6 text-gray-500 cursor-pointer" />

                {/* Profile Dropdown */}
                <div className="relative">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
                        <img
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium">First Last</span>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
                            <button className="w-full text-left p-2 hover:bg-gray-100">Profile</button>
                            <button className="w-full text-left p-2 hover:bg-gray-100">Settings</button>
                            <button className="w-full text-left p-2 hover:bg-red-500 hover:text-white">Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
