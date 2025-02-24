import Link from "next/link";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function EmployeeCard({ employee }) {
    return (
        <Link href={`/profile/${employee.id}`} className="block">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold">{employee.name}</h2>
                <p className="text-gray-600">Experience: {employee.experience}</p>
                <p className="text-gray-600">Skills: {employee.skills.join(", ")}</p>
                <p className="text-gray-600">Business Unit: {employee.businessUnit}</p>
                <p className={`mt-2 ${employee.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                    {employee.availability === "Available" ? (
                        <CheckCircleIcon className="h-5 w-5 inline-block mr-1" />
                    ) : (
                        <XCircleIcon className="h-5 w-5 inline-block mr-1" />
                    )}
                    {employee.availability}
                </p>
            </div>
        </Link>
    );
}
