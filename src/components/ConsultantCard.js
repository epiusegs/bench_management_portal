import Link from "next/link";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function ConsultantCard({ consultant }) {
    return (
        <Link href={`/profile/${consultant.id}`} className="block">
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-lg font-semibold">{consultant.name}</h2>
                <p className="text-gray-600">Experience: {consultant.experience}</p>
                <p className="text-gray-600">Skills: {consultant.skills.join(", ")}</p>
                <p className="text-gray-600">Business Unit: {consultant.businessUnit}</p>
                <p className={`mt-2 ${consultant.availability === "Available" ? "text-green-600" : "text-red-600"}`}>
                    {consultant.availability === "Available" ? (
                        <CheckCircleIcon className="h-5 w-5 inline-block mr-1" />
                    ) : (
                        <XCircleIcon className="h-5 w-5 inline-block mr-1" />
                    )}
                    {consultant.availability}
                </p>
            </div>
        </Link>
    );
}
