"use client";

import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import EmployeeCard from "@/components/Cards/EmployeeCard";

export default function BusinessUnitDetail() {
    const { id } = useParams();
    const businessUnits = useSelector((state) => state.employees.businessUnits);
    const employees = useSelector((state) => state.employees.employees);

    const businessUnit = businessUnits.find(unit => unit.id === id);
    const employeesInUnit = employees.filter(emp => emp.businessUnitId === businessUnit?.id);

    if (!businessUnit) {
        return <p className="text-gray-500">Business Unit not found.</p>;
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">{businessUnit.name}</h1>
                <p className="text-gray-600">{businessUnit.description}</p>
                <p className="text-sm text-gray-500 mt-2">Total Employees: {businessUnit.total_employees}</p>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Employees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {employeesInUnit.length > 0 ? (
                    employeesInUnit.map(employee => (
                        <EmployeeCard key={employee.id} employee={employee} />
                    ))
                ) : (
                    <p className="text-gray-500">No employees found in this business unit.</p>
                )}
            </div>
        </div>
    );
}
