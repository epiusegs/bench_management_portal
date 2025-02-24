import React from "react";

export default function BusinessUnitCard({ businessUnit, employees }) {
    return (
        <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition cursor-pointer bg-white">
            <h2 className="text-xl font-semibold">{businessUnit.name}</h2>
            <p className="text-gray-600">{businessUnit.description}</p>
            <p className="text-sm text-gray-500 mt-2">
                Employees: {employees.length}
            </p>

            {/* Display up to 3 employee names */}
            {employees.length > 0 && (
                <div className="mt-3">
                    <h3 className="text-md font-semibold text-gray-700">Employees:</h3>
                    <ul className="text-gray-600 text-sm">
                        {employees.slice(0, 3).map((emp) => (
                            <li key={emp.id}>• {emp.name}</li>
                        ))}
                    </ul>
                    {employees.length > 3 && <p className="text-blue-500 text-xs mt-1">+{employees.length - 3} more</p>}
                </div>
            )}
        </div>
    );
}
