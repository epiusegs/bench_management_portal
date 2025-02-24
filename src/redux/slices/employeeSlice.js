import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    employees: [
        { id: "1", name: "Alice Johnson", profilePic: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000", skills: ["React", "Node.js"], experience: "5 years", businessUnit: "Software Development", availability: "Available", email: "alice@example.com", phone: "+1 (555) 123-4567", location: "New York, USA", linkedin: "https://linkedin.com/in/alicejohnson" },
        { id: "2", name: "Bob Smith", profilePic: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000", skills: ["Python", "Django"], experience: "3 years", businessUnit: "Data Science", availability: "Booked", email: "bob@example.com", phone: "+1 (555) 234-5678", location: "San Francisco, USA", linkedin: "https://linkedin.com/in/bobsmith" },
        { id: "3", name: "Charlie Brown", profilePic: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000", skills: ["Vue.js", "Laravel"], experience: "4 years", businessUnit: "Web Development", availability: "Available", email: "charlie@example.com", phone: "+1 (555) 345-6789", location: "Los Angeles, USA", linkedin: "https://linkedin.com/in/charliebrown" },
        { id: "4", name: "Diana Prince", profilePic: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fm=jpg&q=60&w=3000", skills: ["Angular", "Java"], experience: "6 years", businessUnit: "Software Development", availability: "Available", email: "diana@example.com", phone: "+1 (555) 456-7890", location: "Chicago, USA", linkedin: "https://linkedin.com/in/dianaprince" },
        { id: "5", name: "Ethan Hunt", profilePic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=jpg&q=60&w=3000", skills: ["Go", "Kubernetes"], experience: "7 years", businessUnit: "Cloud Engineering", availability: "Available", email: "ethan@example.com", phone: "+1 (555) 567-8901", location: "Seattle, USA", linkedin: "https://linkedin.com/in/ethanhunt" },
        { id: "6", name: "Fiona Shaw", profilePic: "https://images.unsplash.com/photo-1521119989659-a83eee488004?fm=jpg&q=60&w=3000", skills: ["Ruby", "Rails"], experience: "8 years", businessUnit: "Backend Development", availability: "Booked", email: "fiona@example.com", phone: "+1 (555) 678-9012", location: "Boston, USA", linkedin: "https://linkedin.com/in/fionashaw" },
        { id: "7", name: "George Clooney", profilePic: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?fm=jpg&q=60&w=3000", skills: ["React Native", "TypeScript"], experience: "5 years", businessUnit: "Mobile Development", availability: "Available", email: "george@example.com", phone: "+1 (555) 789-0123", location: "Miami, USA", linkedin: "https://linkedin.com/in/georgeclooney" },
        { id: "8", name: "Hannah Adams", profilePic: "https://images.unsplash.com/photo-1554151228-14d9def656e4?fm=jpg&q=60&w=3000", skills: ["Python", "Data Analysis"], experience: "6 years", businessUnit: "Data Science", availability: "Available", email: "hannah@example.com", phone: "+1 (555) 890-1234", location: "Austin, USA", linkedin: "https://linkedin.com/in/hannahadams" },
        { id: "9", name: "Isaac Newton", profilePic: "https://images.unsplash.com/photo-1604176354204-1d1b7e48f5ef?fm=jpg&q=60&w=3000", skills: ["AI/ML", "Deep Learning"], experience: "10 years", businessUnit: "Artificial Intelligence", availability: "Booked", email: "isaac@example.com", phone: "+1 (555) 901-2345", location: "Palo Alto, USA", linkedin: "https://linkedin.com/in/isaacnewton" },
        { id: "10", name: "Jessica Doe", profilePic: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?fm=jpg&q=60&w=3000", skills: ["UX/UI Design", "Figma"], experience: "4 years", businessUnit: "Design", availability: "Available", email: "jessica@example.com", phone: "+1 (555) 012-3456", location: "Denver, USA", linkedin: "https://linkedin.com/in/jessicadoe" }
    ],
};

const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push({ id: Date.now().toString(), ...action.payload });
        },
        updateEmployee: (state, action) => {
            const index = state.employees.findIndex(emp => emp.id === action.payload.id);
            if (index !== -1) {
                state.employees[index] = action.payload;
            }
        },
        removeEmployee: (state, action) => {
            state.employees = state.employees.filter(emp => emp.id !== action.payload);
        },
    },
});

export const { addEmployee, updateEmployee, removeEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
