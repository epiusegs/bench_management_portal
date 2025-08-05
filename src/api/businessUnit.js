// src/api/editEmployee.js
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002/api";

export async function fetchBusinessUnits() {
    try {
        const response = await axios.get(`${API_URL}/business-units`);
        console.log("Fetched Business Units:", response.data);
        return response.data;
    } catch (error) {
        console.error("Fetch Business Units Error:", error);
        throw new Error(error.response?.data?.message || "Failed to fetch business units");
    }
}
export async function editBusinessUnitApi(id, updates) {
    const res = await fetch(`${API_URL}/business-units/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
    });

    if (!res.ok) {
        throw new Error("Failed to update business unit");
    }
    return await res.json();
}

export async function getBusinessUnitApi(id) {
    const res = await fetch(`${API_URL}/business-units/${id}`);
    if (!res.ok) throw new Error("Failed to fetch business unit");
    const json = await res.json();
    return json;
}

export async function getEmployeesByBusinessUnitApi(businessUnitId) {
    const res = await fetch(`${API_URL}/business-units/${businessUnitId}/employees`);
    if (!res.ok) throw new Error(`Failed to fetch employees for business unit - ${businessUnitId}`);
    return await res.json();
}
