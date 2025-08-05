// src/redux/slices/employeeSlice.js

import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
    name: "employees",
    initialState: {
        employees: [],
        businessUnits: [],
        status: "idle", // "idle" | "loading" | "succeeded" | "failed"
        error: null
    },
    reducers: {
        setEmployees: (state, action) => {
            state.employees = action.payload;
            state.status = "succeeded";
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
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
        setBusinessUnits: (state, action) => {
            state.businessUnits = action.payload;
        }
    }
});

export const {
    setEmployees,
    setStatus,
    setError,
    addEmployee,
    updateEmployee,
    removeEmployee,
    setBusinessUnits
} = employeeSlice.actions;

export default employeeSlice.reducer;
