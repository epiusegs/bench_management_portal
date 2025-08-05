import Link from "next/link";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { getAvailability } from "@/app/utils/helpers";

export default function EmployeeCard({ employee, businessUnit }) {

    // Calculate the availability for this employee
    const availability = getAvailability(employee.start_date, employee.end_date);
    const isAvailable = availability === "Available";

    return (
        <Link href={`/employee/${employee.id}`} className="block">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold">{employee.name}</h2>
                <p className="text-gray-600">Experience: {employee.experience}</p>
                <p className="text-gray-600">  Skills: {(employee?.skills || []).join(", ")}</p>
                <p className="text-gray-600 font-semibold">
                    Business Unit: {businessUnit ? businessUnit.name : "No Business Unit"}
                </p>

                <p className={`mt-2 flex items-center ${isAvailable ? "text-green-600" : "text-red-600"}`}>
                    {isAvailable ? (
                        <>
                            <CheckCircleIcon className="h-5 w-5 inline-block mr-1" />
                            <span>Available</span>
                        </>
                    ) : (
                        <>
                            <XCircleIcon className="h-5 w-5 inline-block mr-1" />
                            <span>Booked</span>
                        </>
                    )}
                </p>
            </div>
        </Link>

    );
}
