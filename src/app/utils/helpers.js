export function getAvailability(startDate, endDate) {
    if (!startDate || !endDate) return "Available";
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now >= start && now <= end) {
        return "Booked";
    }
    return "Available";
}
