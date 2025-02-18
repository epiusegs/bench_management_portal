"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { BriefcaseIcon, AcademicCapIcon, CheckCircleIcon, XCircleIcon, EnvelopeIcon, LinkIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

const consultants = [
    {
        id: 1,
        name: "Alice Johnson",
        profilePic: "https://randomuser.me/api/portraits/women/44.jpg",
        skills: ["React", "Node.js"],
        experience: "5 years",
        certifications: ["AWS Certified"],
        businessUnit: "Software Development",
        availability: "Available",
        email: "alice@example.com",
        phone: "+1 (555) 123-4567",
        location: "New York, USA",
        linkedin: "https://linkedin.com/in/alicejohnson"
    },
    {
        id: 2,
        name: "Bob Smith",
        profilePic: "https://randomuser.me/api/portraits/men/45.jpg",
        skills: ["Python", "Django"],
        experience: "3 years",
        certifications: ["Google Cloud Certified"],
        businessUnit: "Data Science",
        availability: "Booked",
        email: "bob@example.com",
        phone: "+1 (555) 234-5678",
        location: "San Francisco, USA",
        linkedin: "https://linkedin.com/in/bobsmith"
    }
];

export default function Profile() {
    const { id } = useParams();
    const consultant = consultants.find((c) => c.id === Number(id));

    if (!consultant) return notFound();

    return (
        <div className="max-w-10xl mx-auto mt-10 bg-[var(--pure-white)] p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Profile Picture */}
            <div className="md:col-span-1 flex flex-col items-center border-[var(--gray-10)] p-6 rounded-lg">
                <img src={consultant.profilePic} alt={consultant.name} className="w-40 h-40 rounded-full border-4 border-[var(--midnight-blue)] shadow-md" />
                <h2 className="mt-4 text-xl font-semibold text-[var(--charcoal-black)]">{consultant.name}</h2>
                <p className="text-[var(--gray-75)]">{consultant.businessUnit}</p>

                {/* Availability Badge */}
                <div className={`mt-4 px-4 py-1 rounded-full text-sm font-medium ${consultant.availability === "Available" ? "bg-[var(--pale-blue)] text-[var(--midnight-blue)]" : "bg-[var(--crimson-red)] text-white"}`}>
                    {consultant.availability}
                </div>
            </div>

            {/* Right Column - Details */}
            <div className="md:col-span-2 space-y-6">
                {/* Contact Info */}
                <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center"><MapPinIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2"/> Location</h3>
                    <p className="text-[var(--gray-75)]">{consultant.location}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center"><EnvelopeIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2"/> Email</h3>
                        <a href={`mailto:${consultant.email}`} className="text-[var(--pale-blue)] hover:underline">{consultant.email}</a>
                    </div>

                    {/* Phone */}
                    <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                        <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center"><PhoneIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2"/> Phone</h3>
                        <p className="text-[var(--gray-75)]">{consultant.phone}</p>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center"><BriefcaseIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2"/> Skills</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {consultant.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 text-sm bg-[var(--pale-blue)] text-white rounded-full">
                {skill}
              </span>
                        ))}
                    </div>
                </div>

                {/* Certifications Section */}
                <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center"><AcademicCapIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2"/> Certifications</h3>
                    <ul className="mt-2 list-disc pl-5 text-[var(--gray-75)]">
                        {consultant.certifications.map((cert, index) => (
                            <li key={index}>{cert}</li>
                        ))}
                    </ul>
                </div>

                {/* LinkedIn */}
                <div className="bg-[var(--gray-10)] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-[var(--charcoal-black)] flex items-center"><LinkIcon className="h-5 w-5 text-[var(--crimson-red)] mr-2"/> LinkedIn</h3>
                    <a href={consultant.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--pale-blue)] hover:underline">
                        View LinkedIn Profile
                    </a>
                </div>
            </div>
        </div>
    );
}
