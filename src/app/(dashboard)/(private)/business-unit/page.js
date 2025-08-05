"use client";

import { useState, useEffect } from "react";
import BusinessUnitCard from "@/components/Cards/BusinessUnitCard";
import { useRouter } from "next/navigation";
import { fetchBusinessUnits } from "@/api/businessUnit";
import { fetchEmployees } from "@/api/editEmployee"; // Add this import

export default function BusinessUnits() {
    const [businessUnits, setBusinessUnits] = useState([]);
    const [employees, setEmployees] = useState([]); // Local state for employees
    const router = useRouter();

    useEffect(() => {
        fetchBusinessUnits()
            .then(setBusinessUnits)
            .catch((err) => {
                console.error("Failed to fetch business units:", err);
            });

        fetchEmployees()
            .then(setEmployees)
            .catch((err) => {
                console.error("Failed to fetch employees:", err);
            });
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Business Units</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessUnits.map((unit) => (
                    <div key={unit.id} onClick={() => router.push(`/business-unit/${unit.id}`)}>
                        <BusinessUnitCard
                            businessUnit={unit}
                            employees={employees.filter(emp => emp.businessUnitId === unit.id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
