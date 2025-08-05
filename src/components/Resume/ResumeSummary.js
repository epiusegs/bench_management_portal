import React from "react";

export default function ResumeSummary({ data, fieldsToShow }) {
    // `fieldsToShow` = array of string keys to display; e.g. ['fullName','contact','summary','skills','workExperience']
    // If not passed, all sections will show.

    if (!data) return <div className="text-gray-400 italic">No resume data available.</div>;

    const show = (key) => !fieldsToShow || fieldsToShow.includes(key);

    return (
        <div className="bg-white p-6 rounded shadow space-y-6">
            {/* Name & Contact */}
            {show('fullName') && (
                <div>
                    <h1 className="text-2xl font-bold">{data.fullName}</h1>
                    {show('contact') && (
                        <div className="mt-1 text-gray-700 space-y-1">
                            {data.contact?.address && <div><span className="font-medium">Address:</span> {data.contact.address}</div>}
                            {data.contact?.phone && <div><span className="font-medium">Phone:</span> {data.contact.phone}</div>}
                            {data.contact?.email && (
                                <div>
                                    <span className="font-medium">Email:</span>{" "}
                                    <a href={`mailto:${data.contact.email}`} className="text-blue-600 hover:underline">{data.contact.email}</a>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Summary */}
            {show('summary') && data.summary && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">Professional Summary</h2>
                    <p className="text-gray-700">{data.summary}</p>
                </div>
            )}

            {/* Skills */}
            {show('skills') && Array.isArray(data.skills) && data.skills.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((skill, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">{skill}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Work Experience */}
            {show('workExperience') && Array.isArray(data.workExperience) && data.workExperience.length > 0 && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">Work Experience</h2>
                    <div className="space-y-5">
                        {data.workExperience.map((exp, idx) => (
                            <div key={idx} className="border-l-4 border-blue-400 pl-4">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                    <div>
                                        <span className="font-bold">{exp.title}</span>
                                        {" "}
                                        <span className="text-gray-500">| {exp.company}</span>
                                    </div>
                                    {exp.dates && <span className="text-sm text-gray-500">{exp.dates}</span>}
                                </div>
                                <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
                                    {Array.isArray(exp.details) && exp.details.map((line, i) =>
                                        <li key={i}>{line}</li>
                                    )}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
