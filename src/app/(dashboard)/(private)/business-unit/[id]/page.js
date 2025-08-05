"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EmployeeCard from "@/components/Cards/EmployeeCard";
import { getBusinessUnitApi, getEmployeesByBusinessUnitApi } from "@/api/businessUnit";

export default function BusinessUnitDetail() {
    const { id } = useParams();

    const [businessUnit, setBusinessUnit] = useState(null);
    const [employeesInUnit, setEmployeesInUnit] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);

        // Fetch business unit details
        getBusinessUnitApi(id)
            .then(setBusinessUnit)
            .catch((err) => setError(err.message || "Failed to load business unit"));

        // Fetch employees for this business unit
        getEmployeesByBusinessUnitApi(id)
            .then(setEmployeesInUnit)
            .catch((err) => setError(err.message || "Failed to load employees"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="text-blue-500">Loading business unit...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!businessUnit) return <p className="text-gray-500">Business Unit not found.</p>;

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">{businessUnit.name}</h1>
                <p className="text-gray-600">{businessUnit.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                    Total Employees: {businessUnit.total_employees}
                </p>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Employees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employeesInUnit.length > 0 ? (
                    employeesInUnit.map((employee) => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))
                ) : (
                    <p className="text-gray-500">No employees found in this business unit.</p>
                )}
            </div>
        </div>
    );
}
