"use client";

import { useEffect, useState } from "react";
import { fetchEmployees } from "@/api/editEmployee";
import { fetchBusinessUnits } from "@/api/businessUnit";
import EmployeeCard from "@/components/Cards/EmployeeCard";

const ITEMS_PER_PAGE = 3;

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [businessUnits, setBusinessUnits] = useState([]);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (status === "idle") {
            setStatus("loading");
            fetchEmployees()
                .then((data) => {
                    setEmployees(data);
                    setStatus("succeeded");
                })
                .catch((err) => {
                    setError(err.message || "Failed to fetch employees");
                    setStatus("failed");
                });
            fetchBusinessUnits()
                .then(setBusinessUnits)
                .catch((err) => {
                    console.error("Failed to fetch business units:", err);
                });
        }
    }, [status]);

    // Filter employees based on search input
    const filteredEmployees = employees.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(c.skills) && c.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    // Pagination logic
    const totalEmployees = filteredEmployees.length;
    const totalPages = Math.ceil(totalEmployees / ITEMS_PER_PAGE);
    const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Employees</h1>
                <p className="text-gray-600 bg-gray-200 px-3 py-1 rounded-lg">
                    Total Employees: <strong>{totalEmployees}</strong>
                </p>
            </div>

            {/* Loading & Error Handling */}
            {status === "loading" && <p className="text-blue-500">Loading employees...</p>}
            {status === "failed" && <p className="text-red-500">Error: {error}</p>}

            {/* Search Input */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name, skills..."
                    className="p-2 border rounded w-full md:w-1/3"
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            {/* Display Employees */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {status === "succeeded" && paginatedEmployees.length > 0 ? (
                    paginatedEmployees.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            businessUnit={businessUnits.find(unit => employee.businessUnitId === unit.id)}
                        />
                    ))
                ) : (
                    status === "succeeded" && <p className="text-gray-500">No employees match your search.</p>
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
