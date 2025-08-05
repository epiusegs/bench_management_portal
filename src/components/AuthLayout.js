"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AuthLayout({ children }) {
    return (
        <div className="flex-1 flex flex-col">
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
