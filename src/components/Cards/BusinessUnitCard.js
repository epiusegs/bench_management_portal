import React from "react";
import { getAvailability } from "@/app/utils/helpers";
export default function BusinessUnitCard({ businessUnit, employees }) {

    const availableCount = employees.filter(emp => getAvailability(emp.start_date, emp.end_date) === "Available").length;
    const bookedCount = employees.filter(emp => getAvailability(emp.start_date, emp.end_date) === "Booked").length;

    return (
        <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition cursor-pointer bg-white">
            <h2 className="text-xl font-semibold">{businessUnit.name}</h2>
            <p className="text-gray-600">{businessUnit.description}</p>
            <div className="mt-4 space-y-1">
                <p className="text-sm text-gray-500">
                    <span className="font-semibold">Employees:</span> {employees.length}
                </p>
                <p className="text-sm text-green-600">
                    <span className="font-semibold">Available:</span> {availableCount}
                </p>
                <p className="text-sm text-red-600">
                    <span className="font-semibold">Booked:</span> {bookedCount}
                </p>
            </div>
        </div>
    );
}
