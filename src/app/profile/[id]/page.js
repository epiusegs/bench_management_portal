"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { updateEmployee } from "../../../redux/slices/employeeSlice";
import { notFound } from "next/navigation";
import { BriefcaseIcon, AcademicCapIcon, CheckCircleIcon, XCircleIcon, EnvelopeIcon, LinkIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

export default function Profile() {
    const { id } = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.employees);
    const employee = employees.find((c) => c.id === id);

    const [editMode, setEditMode] = useState(false);
    const [editEmployee, setEditEmployee] = useState(employee);

    useEffect(() => {
        if (employee) {
            setEditEmployee(employee);
        }
    }, [employee]);

    if (!employee) return notFound();

    const handleUpdateEmployee = () => {
        dispatch(updateEmployee(editEmployee));
        setEditMode(false); // Switch back to view mode
    };

    return (
        <div className="max-w-10xl mx-auto mt-10 bg-[var(--pure-white)] p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Profile Picture */}
            <div className="md:col-span-1 flex flex-col items-center border-[var(--gray-10)] p-6 rounded-lg">
                <img src={employee.profilePic} alt={employee.name} className="w-40 h-40 rounded-full border-4 border-[var(--midnight-blue)] shadow-md" />
                <h2 className="mt-4 text-xl font-semibold text-[var(--charcoal-black)]">{employee.name}</h2>
                <p className="text-[var(--gray-75)]">{employee.businessUnit}</p>

                {/* Availability Badge */}
                <div className={`mt-4 px-4 py-1 rounded-full text-sm font-medium ${employee.availability === "Available" ? "bg-[var(--pale-blue)] text-[var(--midnight-blue)]" : "bg-[var(--crimson-red)] text-white"}`}>
                    {employee.availability}
                </div>

                {/* Edit Button */}
                <button onClick={() => setEditMode(!editMode)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                    {editMode ? "Cancel" : "Edit"}
                </button>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
                {editMode ? (
                    // **Edit Mode: Show Form**
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Edit Employee</h2>

                        <input type="text" placeholder="Name" className="p-2 border rounded w-full mt-2"
                               value={editEmployee.name} onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })} />

                        <input type="text" placeholder="Skills (comma separated)" className="p-2 border rounded w-full mt-2"
                               value={editEmployee.skills.join(", ")} onChange={(e) => setEditEmployee({ ...editEmployee, skills: e.target.value.split(",").map(skill => skill.trim()) })} />

                        <input type="text" placeholder="Experience" className="p-2 border rounded w-full mt-2"
                               value={editEmployee.experience} onChange={(e) => setEditEmployee({ ...editEmployee, experience: e.target.value })} />

                        <input type="text" placeholder="Business Unit" className="p-2 border rounded w-full mt-2"
                               value={editEmployee.businessUnit} onChange={(e) => setEditEmployee({ ...editEmployee, businessUnit: e.target.value })} />

                        <select className="p-2 border rounded w-full mt-2"
                                value={editEmployee.availability} onChange={(e) => setEditEmployee({ ...editEmployee, availability: e.target.value })}>
                            <option value="Available">Available</option>
                            <option value="Booked">Booked</option>
                        </select>

                        <input type="text" placeholder="Email" className="p-2 border rounded w-full mt-2"
                               value={editEmployee.email} onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })} />

                        <input type="text" placeholder="Phone" className="p-2 border rounded w-full mt-2"
                               value={editEmployee.phone} onChange={(e) => setEditEmployee({ ...editEmployee, phone: e.target.value })} />

                        <input type="text" placeholder="Location" className="p-2 border rounded w-full mt-2"
                               value={editEmployee.location} onChange={(e) => setEditEmployee({ ...editEmployee, location: e.target.value })} />

                        <input type="text" placeholder="LinkedIn URL" className="p-2 border rounded w-full mt-2"
                               value={editEmployee.linkedin} onChange={(e) => setEditEmployee({ ...editEmployee, linkedin: e.target.value })} />

                        <button onClick={handleUpdateEmployee} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Save Changes</button>
                    </div>
                ) : (
                    // **View Mode: Show Employee Details**
                    <>
                        {/* Contact Info */}
                        <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center"><MapPinIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2"/> Location</h3>
                            <p className="text-[var(--gray-75)]">{employee.location}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center"><EnvelopeIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2"/> Email</h3>
                                <a href={`mailto:${employee.email}`} className="text-[var(--pale-blue)] hover:underline">{employee.email}</a>
                            </div>

                            <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                                <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center"><PhoneIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2"/> Phone</h3>
                                <p className="text-[var(--gray-75)]">{employee.phone}</p>
                            </div>
                        </div>

                        <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                            <h3 className="text-lg font-semibold flex items-center"><BriefcaseIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2"/> Skills</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {employee.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 text-sm bg-[var(--pale-blue)] text-white rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
