"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import BusinessUnitCard from "@/components/Cards/BusinessUnitCard";
import { useRouter } from "next/navigation";

export default function BusinessUnits() {
    const businessUnits = useSelector((state) => state.employees.businessUnits);
    const employees = useSelector((state) => state.employees.employees);
    const categories = [
        { id: "1", name: "Technology & Engineering" },
        { id: "2", name: "Consulting & Implementation" },
        { id: "3", name: "Data & Analytics" },
        { id: "4", name: "Support & Managed Services" },
        { id: "5", name: "Project & Change Management" },
        { id: "6", name: "Legal, Finance & HR" },
        { id: "7", name: "Sales & Marketing" }
    ];

    const [selectedCategory, setSelectedCategory] = useState("");
    const router = useRouter();

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Business Units</h1>
            </div>

            {/* Filter by Category */}
            <div className="mb-6">
                <select
                    className="p-2 border rounded w-full md:w-1/3"
                    onChange={(e) => {
                        setSelectedCategory(e.target.value);
                    }}
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            {/* Display Business Units */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {businessUnits.filter(unit => selectedCategory === "" || unit.categoryId === selectedCategory).map((unit) => (
                    <div key={unit.id} onClick={() => router.push(`/business-unit/${unit.id}`)}>
                        <BusinessUnitCard businessUnit={unit} employees={employees.filter(emp => emp.businessUnitId === unit.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}
