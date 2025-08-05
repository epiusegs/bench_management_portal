// src/api/editEmployee.js
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

export async function fetchEmployees() {
    try {
        const response = await axios.get(`${API_URL}/employees`);
        console.log("Fetched Employees:", response.data);
        return response.data;
    } catch (error) {
        console.error("Fetch Employees Error:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch employees");
    }
}

export async function editEmployeeApi(id, updates) {
    const res = await fetch(`${API_URL}/employees/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
    });

    if (!res.ok) {
        throw new Error("Failed to update employee");
    }
    return await res.json();
}

export async function getEmployeeApi(id) {
    const res = await fetch(`${API_URL}/employees/${id}`);
    if (!res.ok) throw new Error("Failed to fetch employee");
    const json = await res.json();
    return json;
}

export async function saveResumeApi(employeeId, resume) {
    const res = await fetch(`${API_URL}/employees/${employeeId}/resume`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume }),
    });
    if (!res.ok) throw new Error("Failed to save resume");
    return await res.json();
}
