"use client";

import { useState } from "react";
import ConsultantCard from "@/components/ConsultantCard";

const consultants = [
    { id: 1, name: "Alice Johnson", skills: ["React", "Node.js"], experience: "5 years", availability: "Available" },
    { id: 2, name: "Bob Smith", skills: ["Python", "Django"], experience: "3 years", availability: "Booked" },
    { id: 3, name: "Charlie Brown", skills: ["Vue.js", "Laravel"], experience: "4 years", availability: "Available" },
];

export default function Dashboard({ searchQuery = "" }) {
    const filteredConsultants = consultants.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Consultants</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredConsultants.length > 0 ? (
                    filteredConsultants.map((consultant) => (
                        <ConsultantCard key={consultant.id} consultant={consultant} />
                    ))
                ) : (
                    <p className="text-gray-500">No consultants match your search.</p>
                )}
            </div>
        </div>
    );
}
