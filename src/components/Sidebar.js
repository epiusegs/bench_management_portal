"use client";

import { useState } from "react";
import Link from "next/link";
import {
    HomeIcon,
    UsersIcon,
    FolderIcon,
    CalendarIcon,
    DocumentDuplicateIcon,
    ChartPieIcon,
    Cog6ToothIcon,
    Bars3Icon,
    BriefcaseIcon
} from "@heroicons/react/24/outline";

const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
    { name: "Bench", href: "/bench", icon: UsersIcon, current: false },
    { name: "Business Units", href: "/business-unit", icon: BriefcaseIcon, current: false },
];

export default function Sidebar({ isDarkMode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className={`${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-bg-[var(--midnight-blue)]"} flex flex-col h-screen p-4 w-${isCollapsed ? "20" : "64"} transition-all duration-300`}>
            {/* Toggle Button */}
            {/* Header with Logo & Toggle Button */}
            <div className="flex items-center justify-between mb-6">
                <img
                    src="/EU_White_Square_Logo_RGB.svg" // Update this path to your actual logo file
                    alt="Logo"
                    className={`h-20 ${isCollapsed ? "hidden" : "block"}`}
                />
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-md hover:bg-[var(--midnight-blue)] hover:text-white">
                    <Bars3Icon className="h-6 w-6" />
                </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-6 space-y-2 flex-1">
                {navigation.map((item) => (
                    <Link key={item.name} href={item.href} className={`flex items-center gap-3 p-2 rounded-md ${item.current ? "bg-[var(--midnight-blue)] text-white" : "hover:bg-[var(--midnight-blue)] hover:text-white"}`}>
                        <item.icon className="h-6 w-6" />
                        {!isCollapsed && item.name}
                    </Link>
                ))}
            </nav>

            {/* Settings at the Bottom */}
            <div className="mt-auto">
                <Link href="#" className="flex items-center gap-3 p-2 rounded-md hover:bg-indigo-500">
                    <Cog6ToothIcon className="h-6 w-6" />
                    {!isCollapsed && "Settings"}
                </Link>
            </div>
        </div>
    );
}
