"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, updateEmployee } from "@/redux/slices/employeeSlice";
import { notFound } from "next/navigation";
import {
    BriefcaseIcon, EnvelopeIcon, PhoneIcon, MapPinIcon
} from "@heroicons/react/24/outline";
import { editEmployeeApi, getEmployeeApi } from "@/api/editEmployee";

function getAvailability(startDate, endDate) {
    if (!startDate || !endDate) return "Available";
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now >= start && now <= end) {
        return "Booked";
    }
    return "Available";
}

export default function Profile() {
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const dispatch = useDispatch();
    const businessUnits = useSelector((state) => state.employees.businessUnits);

    const [editMode, setEditMode] = useState(false);
    const [editEmployee, setEditEmployee] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileError, setProfileError] = useState(null);

    // Fetch the employee on mount or when id changes
    useEffect(() => {
        async function fetchEmployee() {
            setProfileLoading(true);
            setProfileError(null);
            try {
                const fetchedEmployee = await getEmployeeApi(id);
                setEditEmployee(fetchedEmployee);
            } catch (err) {
                setProfileError(err.message);
            } finally {
                setProfileLoading(false);
            }
        }
        if (id) fetchEmployee();
    }, [id]);

    // Automatically calculate availability on date change
    useEffect(() => {
        if (!editEmployee || !editMode) return;
        const now = new Date();
        const start = editEmployee.start_date ? new Date(editEmployee.start_date) : null;
        const end = editEmployee.end_date ? new Date(editEmployee.end_date) : null;

        let availability = "Available";
        if (start && end && now >= start && now <= end) {
            availability = "Booked";
        }
        setEditEmployee((prev) => ({
            ...prev,
            availability,
        }));
    }, [editEmployee?.start_date, editEmployee?.end_date, editMode]);

    /*if (profileLoading) return <div>Loading profile...</div>;
    if (profileError) return <div>Error: {profileError}</div>;
    if (!profileLoading && !editEmployee) return notFound();*/

    const businessUnit = businessUnits.find(
        (unit) => unit.id === editEmployee?.businessUnitId
    );

    const availability = getAvailability(editEmployee?.start_date, editEmployee?.end_date);

    const handleUpdateEmployee = async () => {
        try {
            const updated = await editEmployeeApi(editEmployee.id, editEmployee);
            dispatch(updateEmployee(updated));
            setEditMode(false);
        } catch (err) {
            alert("Failed to update employee: " + err.message);
        }
    };

    return (
        <div className="max-w-10xl mx-auto mt-10 bg-[var(--pure-white)] p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Profile Picture */}
            <div className="md:col-span-1 flex flex-col items-center border-[var(--gray-10)] p-6 rounded-lg">
                <img
                    src={editEmployee?.profilePic}
                    alt={editEmployee?.name}
                    className="w-40 h-40 rounded-full border-4 border-[var(--midnight-blue)] shadow-md"
                />
                <h2 className="mt-4 text-xl font-semibold text-[var(--charcoal-black)]">
                    {editEmployee?.name}
                </h2>
                <p className="text-[var(--gray-75)]">
                    {businessUnit ? businessUnit.name : "No Business Unit"}
                </p>

                {/* Availability Badge */}
                <div
                    className={`mt-4 px-4 py-1 rounded-full text-sm font-large ${
                        editEmployee?.availability === "Booked"
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                    }`}
                >
                    {editEmployee?.availability}
                </div>

                {/* Edit Button */}
                <button
                    onClick={() => setEditMode(!editMode)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {editMode ? "Cancel" : "Edit"}
                </button>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
                {editMode ? (
                    // **Edit Mode: Show Form**
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Edit Employee</h2>

                        <input
                            type="text"
                            placeholder="Name"
                            className="p-2 border rounded w-full mt-2"
                            value={editEmployee?.name || ""}
                            onChange={(e) =>
                                setEditEmployee({ ...editEmployee, name: e.target.value })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Skills (comma separated)"
                            className="p-2 border rounded w-full mt-2"
                            value={editEmployee?.skills?.join(", ") || ""}
                            onChange={(e) =>
                                setEditEmployee({
                                    ...editEmployee,
                                    skills: e.target.value.split(",").map((skill) => skill.trim())
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Experience"
                            className="p-2 border rounded w-full mt-2"
                            value={editEmployee?.experience || ""}
                            onChange={(e) =>
                                setEditEmployee({
                                    ...editEmployee,
                                    experience: e.target.value
                                })
                            }
                        />

                        <label className="block font-semibold mt-2">Start Date</label>
                        <input
                            type="date"
                            className="p-2 border rounded w-full mt-1"
                            value={editEmployee?.start_date || ""}
                            onChange={(e) =>
                                setEditEmployee({ ...editEmployee, start_date: e.target.value })
                            }
                        />

                        <label className="block font-semibold mt-2">End Date</label>
                        <input
                            type="date"
                            className="p-2 border rounded w-full mt-1"
                            value={editEmployee?.end_date || ""}
                            onChange={(e) =>
                                setEditEmployee({ ...editEmployee, end_date: e.target.value })
                            }
                        />

                        <select
                            className="p-2 border rounded w-full mt-2"
                            value={editEmployee?.businessUnitId || ""}
                            onChange={(e) =>
                                setEditEmployee({
                                    ...editEmployee,
                                    businessUnitId: e.target.value
                                })
                            }
                        >
                            <option value="">Select Business Unit</option>
                            {businessUnits.map((unit) => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.name}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handleUpdateEmployee}
                            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Save Changes
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Contact Info */}
                        <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center">
                                <MapPinIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2" />{" "}
                                Location
                            </h3>
                            <p className="text-[var(--gray-75)]">{editEmployee?.location}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center">
                                    <EnvelopeIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2" />{" "}
                                    Email
                                </h3>
                                <a
                                    href={`mailto:${editEmployee?.email}`}
                                    className="text-[var(--pale-blue)] hover:underline"
                                >
                                    {editEmployee?.email}
                                </a>
                            </div>

                            <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center">
                                    <PhoneIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2" />{" "}
                                    Phone
                                </h3>
                                <p className="text-[var(--gray-75)]">{editEmployee?.phone}</p>
                            </div>
                        </div>

                        <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                            <h3 className="text-lg font-semibold flex items-center">
                                <BriefcaseIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2" />{" "}
                                Skills
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {editEmployee?.skills || [].map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm bg-[var(--pale-blue)] text-white rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center">
                                <BriefcaseIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2" />{" "}
                                Business Unit
                            </h3>
                            <p className="text-[var(--gray-75)]">
                                {businessUnit ? businessUnit.name : "No Business Unit"}
                            </p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
