# MoonLight — Enterprise Employee Management System

A modern, responsive, and feature-rich Employee Management Application built with React, Vite, and Tailwind CSS. All data persists client-side in `localStorage` with a rich seed dataset and one-click database reset capabilities.

## 🚀 Live Localhost Access

The development server is running locally:
- **Local URL**: [http://localhost:3000](http://localhost:3000)

---

## ✨ Features & Modules

### 1. 📊 Executive Dashboard
- **Live Metrics**: Total Headcount, Active Workforce (% capacity), Departments, and Pending Leave Requests.
- **Department Staffing Distribution**: Visual capacity progress bars for all organizational teams.
- **Attendance Rate Gauge**: Daily punctuality snapshot (On-time, Late, Absent).
- **Audit & Activity Stream**: Real-time logging of employee updates, leave decisions, and attendance check-ins.
- **Quick Actions**: Immediate shortcuts to register employees, apply leaves, and view directory.

### 2. 👥 Employee Directory
- **Multi-field Instant Search**: Search by name, corporate email, role, department, or Employee ID.
- **Advanced Filtering**: Filter by Department and Employment Status (*Active, On Leave, Probation, Inactive*).
- **Flexible Sorting**: Sort by Name (A-Z, Z-A), Date Joined (Newest/Oldest), and Annual Salary.
- **Dual View Modes**: Switch seamlessly between **Table View** and **Card Grid View**.
- **Pagination**: Configurable items per page with page jump navigation.
- **CSV Data Export**: One-click download of the filtered employee dataset.
- **Actions**: Direct access to Employee Profile, Edit Modal, and Deletion with confirmation dialog.

### 3. 📝 Validated Add & Edit Employee Forms
- Full form validation with immediate visual error feedback.
- Covers First Name, Last Name, Corporate Email format, Phone, Role, Department, Status, Employment Type, Join Date, Salary, Location, Skills, and Emergency Contact details.

### 4. 🪪 Detailed Employee Profile Page
- **Hero Card**: Status badge, contact information, role, and immediate status switcher.
- **Overview Tab**: Professional biography, skill tags, compensation details, and emergency contact card.
- **Attendance History Tab**: Ledger of all past attendance entries for the specific employee.
- **Leave Records Tab**: Past and pending leave requests filed by the employee.
- **Live Simulation**: "Simulate Clock In / Out" directly from the profile.

### 5. 🏢 Department Management
- Dedicated department directory cards displaying department codes, department heads, operational budgets, locations, and descriptions.
- Team member avatar stacks with an expandable drawer to view all assigned personnel.
- **Add / Edit Department Modal** with validation.
- **Safe Deletion**: Prevents accidental deletion of departments that currently have active employees assigned.

### 6. 🏖️ Leave Requests & Approvals
- KPI metric cards for Pending, Approved, Rejected, and Total Days.
- Filter by status tabs (*All, Pending with badge counter, Approved, Rejected*) and leave classification (*Vacation, Sick, Casual, Parental, Unpaid*).
- **Interactive Review Workflow**: Review modal allowing administrators to approve or reject with custom administrative remarks.
- **Apply Leave Modal**: Automatic work-day duration calculation and form validation.

### 7. ⏱️ Attendance Analytics & Clock In/Out Simulator
- Punctuality metrics: Overall Rate %, Present, Late, Absent, Half Day / On Leave.
- **Interactive Shift Simulator**: Choose any employee and clock them in/out with instant timestamp updates.
- Date picker and department/status filters.
- **Manual Attendance Entry Modal**: Admin override to record or adjust daily work hours, check-in/out times, and locations.

### 8. ⚙️ Settings, Themes & LocalStorage
- **Admin Profile**: Edit administrator name, email, avatar URL, company, and timezone.
- **Appearance**: Toggle between **Light**, **Dark**, and **System** themes. Switch accent colors (*Indigo, Blue, Emerald, Purple, Solar Amber*).
- **Data Management**:
  - View current LocalStorage byte usage and record counts.
  - **Export Full JSON Database**: Download an offline backup of all data.
  - **Reset Demo Data**: Restore initial factory demo dataset anytime.

---

## 🛠️ Tech Stack
- **Framework**: React 18
- **Tooling & Dev Server**: Vite 6
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **Storage**: Browser `localStorage` (Client-side persistent database)

## 💻 Commands
- Run Dev Server: `npm run dev`
- Build for Production: `npm run build`
- Preview Build: `npm run preview`

