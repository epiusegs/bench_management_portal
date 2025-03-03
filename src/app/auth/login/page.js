"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

export default function Login() {
    const { login } = useAuth();
    const [role, setRole] = useState("user");

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">Sign In</h2>
            <select
                className="p-2 border rounded mt-4"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            >
                <option value="user">User</option>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
            </select>
            <button
                onClick={() => login(role)}
                className="bg-blue-600 text-white p-3 rounded-lg mt-4"
            >
                Login as {role}
            </button>
        </div>
    );
}
