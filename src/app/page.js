"use client";

import { useState } from "react";
import EmployeeCard from "@/components/Cards/EmployeeCard";

const employees = [
    { id: 1, name: "Alice Johnson", skills: ["React", "Node.js"], experience: "5 years", availability: "Available" },
    { id: 2, name: "Bob Smith", skills: ["Python", "Django"], experience: "3 years", availability: "Booked" },
    { id: 3, name: "Charlie Brown", skills: ["Vue.js", "Laravel"], experience: "4 years", availability: "Available" },
];

export default function Dashboard({ searchQuery = "" }) {
    const filteredEmployees = employees.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Employees</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))
                ) : (
                    <p className="text-gray-500">No employees match your search.</p>
                )}
            </div>
        </div>
    );
}
