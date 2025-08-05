"use client";

import { useAuth } from "@/context/AuthContext";

export default function Profile() {
    const { user, logout } = useAuth();

    if (!user) return <p className="text-center mt-10">Not Logged In</p>;

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">User Profile</h2>
            <p className="text-gray-700">Name: {user.name}</p>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">Role: {user.role}</p>
            <button onClick={logout} className="bg-red-600 text-white p-3 rounded-lg mt-4">
                Logout
            </button>
        </div>
    );
}
