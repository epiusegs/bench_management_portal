"use client";

import { useState } from "react";
import EmployeeCard from "@/components/EmployeeCard";
import {useSelector} from "react-redux";

const businessUnits = [
    { id: 1, name: "Software Development" },
    { id: 2, name: "Data Science" },
    { id: 3, name: "Web Development" },
];

const ITEMS_PER_PAGE = 3;

export default function BusinessUnits() {
    const employees = useSelector((state) => state.employees.employees);
    const [selectedUnit, setSelectedUnit] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredConsultants = employees.filter((c) =>
        selectedUnit === "" || c.businessUnit === selectedUnit
    );

    const totalConsultants = filteredConsultants.length;
    const totalPages = Math.ceil(totalConsultants / ITEMS_PER_PAGE);
    const paginatedConsultants = filteredConsultants.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Business Units</h1>
                <p className="text-gray-600 bg-gray-200 px-3 py-1 rounded-lg">
                    Total Consultants: <strong>{totalConsultants}</strong>
                </p>
            </div>

            {/* Filter by Business Unit */}
            <div className="mb-6">
                <select
                    className="p-2 border rounded w-full md:w-1/3"
                    onChange={(e) => {
                        setSelectedUnit(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="">All Business Units</option>
                    {businessUnits.map((unit) => (
                        <option key={unit.id} value={unit.name}>
                            {unit.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Display Consultants */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedConsultants.length > 0 ? (
                    paginatedConsultants.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))
                ) : (
                    <p className="text-gray-500">No employees found for this business unit.</p>
                )}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2 bg-gray-300 rounded">{currentPage} / {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
