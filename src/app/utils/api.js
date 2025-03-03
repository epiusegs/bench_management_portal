import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export const fetchConsultants = async () => {
    try {
        const response = await axios.get(`${API_URL}/getAllConsultants`);
        return response.data;
    } catch (error) {
        console.error("Error fetching consultants:", error);
        return [];
    }
};
