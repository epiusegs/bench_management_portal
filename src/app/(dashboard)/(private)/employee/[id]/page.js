"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployees, updateEmployee } from "@/redux/slices/employeeSlice";
import { notFound } from "next/navigation";
import {
    BriefcaseIcon, EnvelopeIcon, PhoneIcon, MapPinIcon
} from "@heroicons/react/24/outline";
import { editEmployeeApi, getEmployeeApi } from "@/api/editEmployee";
import { fetchBusinessUnits } from "@/api/businessUnit";
import axios from "axios";
import ResumeSummary from "@/components/Resume/ResumeSummary";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

// Helper: compute availability for display only
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

// Modular Resume upload/view section
function ResumeUploadSection({
                                 resumeFile, setResumeFile, handleResumeUpload, resumeLoading,
                                 resumeError, resumeJson, handleSaveResumeToEmployee, showSave
                             }) {
    const fileInputRef = useRef(null);

    return (
        <div className="col-span-1 md:col-span-3 mt-10">
            <h2 className="text-xl font-semibold mb-2">Resume Upload & Preview</h2>
            <div className="flex items-center gap-4">
                <input
                    type="file"
                    accept=".pdf,.docx"
                    aria-label="Upload resume"
                    onChange={e => setResumeFile(e.target.files[0])}
                    ref={fileInputRef}
                    className="border rounded p-2"
                />
                {resumeFile && <span className="text-xs text-gray-700">{resumeFile.name}</span>}
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleResumeUpload}
                    disabled={resumeLoading || !resumeFile}
                >
                    {resumeLoading ? "Parsing..." : "Upload & Parse"}
                </button>
            </div>
            {resumeError && <p className="text-red-600 mt-2">{resumeError}</p>}
            {resumeJson && <ResumeJsonView resumeJson={resumeJson} />}
            {showSave && resumeJson && (
                <button
                    className="bg-green-600 text-white px-3 py-2 rounded mt-3"
                    onClick={handleSaveResumeToEmployee}
                >
                    Save Resume Data to Employee
                </button>
            )}
        </div>
    );
}

function ResumeJsonView({ resumeJson }) {
    return (
        <div className="bg-gray-50 p-4 mt-4 rounded shadow text-xs md:text-sm">
            <h3 className="font-bold text-lg mb-2">{resumeJson.fullName || "Resume Data"}</h3>
            <pre className="overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(resumeJson, null, 2)}
            </pre>
        </div>
    );
}


export default function Profile() {
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const dispatch = useDispatch();
    const [businessUnits, setBusinessUnits] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editEmployee, setEditEmployee] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileError, setProfileError] = useState(null);

    // Resume
    const [resumeFile, setResumeFile] = useState(null);
    const [resumeJson, setResumeJson] = useState(null);
    const [resumeLoading, setResumeLoading] = useState(false);
    const [resumeError, setResumeError] = useState(null);

    // Fetch data
    useEffect(() => {
        async function fetchData() {
            setProfileLoading(true);
            setProfileError(null);
            try {
                const [fetchedEmployee, fetchedBusinessUnits] = await Promise.all([
                    getEmployeeApi(id),
                    fetchBusinessUnits()
                ]);
                setEditEmployee(fetchedEmployee);
                setBusinessUnits(fetchedBusinessUnits);
            } catch (err) {
                setProfileError(err.message);
            } finally {
                setProfileLoading(false);
            }
        }
        if (id) fetchData();
    }, [id]);

    const businessUnit = businessUnits.find(
        (unit) => unit.id === editEmployee?.businessUnitId
    );
    const availability = getAvailability(editEmployee?.start_date, editEmployee?.end_date);

    // Handle update
    const handleUpdateEmployee = async () => {
        try {
            const updated = await editEmployeeApi(editEmployee.id, editEmployee);
            dispatch(updateEmployee(updated));
            setEditMode(false);
        } catch (err) {
            alert("Failed to update employee: " + err.message);
        }
    };

    // Resume upload & parse
    const handleResumeUpload = async () => {
        if (!resumeFile) return;
        setResumeLoading(true);
        setResumeError(null);
        setResumeJson(null);

        const formData = new FormData();
        formData.append("resume", resumeFile);

        try {
            const res = await axios.post(`${API_URL}/upload-resume`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setResumeJson(res.data.resumeJson);
        } catch (err) {
            setResumeError(err.response?.data?.error || err.message);
        } finally {
            setResumeLoading(false);
        }
    };

    const handleSaveResumeToEmployee = async () => {
        if (!resumeJson || !editEmployee) return;
        try {
            const updated = await editEmployeeApi(editEmployee.id, {
                ...editEmployee,
                description: resumeJson.summary,
                skills: resumeJson.skills || [],
                resume: resumeJson,
            });
            dispatch(updateEmployee(updated));
            alert("Resume data saved to employee!");
        } catch (err) {
            alert("Failed to save resume: " + err.message);
        }
    };

    return (
        <div className="max-w-10xl mx-auto mt-10 bg-[var(--pure-white)] p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column */}
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
                        availability === "Booked"
                            ? "bg-red-600 text-white"
                            : "bg-green-600 text-white"
                    }`}
                >
                    {availability}
                </div>

                <button
                    onClick={() => setEditMode(!editMode)}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {editMode ? "Cancel" : "Edit"}
                </button>
            </div>

            {/* Right Column */}
            <div className="md:col-span-2 space-y-6">
                {editMode ? (
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
                    </div>
                ) : (
                    <>
                        {/*<div className="bg-[var(--gray-10)] p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center">
                                <MapPinIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2" />{" "}
                                Location
                            </h3>
                            <p className="text-[var(--gray-75)]">{editEmployee?.location}</p>
                        </div>*/}
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
                                {(editEmployee?.skills || []).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm bg-[var(--pale-blue)] text-white rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </>
                )}
                <ResumeSummary data={editEmployee?.resume} />

                {/* Resume Upload/Preview Section is always visible */}
                <ResumeUploadSection
                    resumeFile={resumeFile}
                    setResumeFile={setResumeFile}
                    handleResumeUpload={handleResumeUpload}
                    resumeLoading={resumeLoading}
                    resumeError={resumeError}
                    resumeJson={resumeJson}
                    handleSaveResumeToEmployee={handleSaveResumeToEmployee}
                    showSave={!!resumeJson}
                />
            </div>
        </div>
    );
}
