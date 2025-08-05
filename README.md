# Bench Management Portal

A modern internal portal built with **Next.js** and **Tailwind CSS** for managing employee availability and assignments. The system allows authenticated users to log in, view employee profiles, upload resumes, and manage bench status across teams or business units.

---

## Features

- User Authentication (planned Microsoft SSO integration)
- Manage employee data and availability
- Identify "Available" vs "Booked" employees
- Resume upload and parsing (modular)
- Business Unit association
- Clean UI built with TailwindCSS
- Next.js API routes & Redux state management

---

## Tech Stack

- **Frontend**: Next.js 15+, Tailwind CSS, Heroicons
- **State Management**: Redux Toolkit
- **Backend API**: Runs independently on `localhost:3002`
- **Auth**: NextAuth (with planned Microsoft OAuth)

---

## Getting Started

### 1. Clone the Repo

git clone https://github.com/yourusername/bench-management-portal.git
cd bench-management-portal


### 2. Set Environment Variables**
Create a .env.local file in the root directory:

# Frontend Environment
NEXT_PUBLIC_API_URL=http://localhost:3002/api
NEXTAUTH_URL=http://localhost:3000/api/auth
NEXTAUTH_SECRET=your_secret_key

###  3. Install Dependencies

npm install
This will install all frontend dependencies.

### 4. Run the Application
Frontend (Next.js)

npm run dev

Running in dev mode willl run both frontend and backend concurrently

| Component              | Description                                                                    |
| ---------------------- | ------------------------------------------------------------------------------ |
| **Profile Page**       | Displays employee data, availability, and business unit                        |
| **Resume Upload**      | Modular uploader for employee resumes (future parsing support)                 |
| **Business Units**     | Groups employees by department or function                                     |
| **Availability Check** | Function to show 'Available' or 'Booked' status based on `startDate`/`endDate` |
| **Redux Integration**  | Syncs employee state across pages                                              |
| **API Layer**          | Routes for editing, fetching, and updating employee data                       |



