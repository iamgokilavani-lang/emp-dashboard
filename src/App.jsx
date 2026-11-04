import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Sidebar } from './components/common/Sidebar';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { Dashboard } from './components/dashboard/Dashboard';
import { EmployeeList } from './components/employees/EmployeeList';
import { EmployeeProfile } from './components/employees/EmployeeProfile';
import { EmployeeFormModal } from './components/employees/EmployeeFormModal';
import { DepartmentList } from './components/departments/DepartmentList';
import { LeaveManagement } from './components/leaves/LeaveManagement';
import { LeaveRequestModal } from './components/leaves/LeaveRequestModal';
import { AttendancePage } from './components/attendance/AttendancePage';
import { MarkAttendanceModal } from './components/attendance/MarkAttendanceModal';
import { SettingsPage } from './components/settings/SettingsPage';
import { ConfirmDialog } from './components/common/ConfirmDialog';

export const App = () => {
  const { deleteEmployee } = useApp();

  // Navigation & View State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // Sidebar Layout States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Employee Modal State (Add / Edit)
  const [isEmpModalOpen, setIsEmpModalOpen] = useState(false);
  const [empToEdit, setEmpToEdit] = useState(null);

  // Leave Modal State
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  // Attendance Modal State
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);

  // Delete Confirm Dialog
  const [empToDelete, setEmpToDelete] = useState(null);

  const handleSelectEmployee = (id) => {
    setSelectedEmployeeId(id);
    setActiveTab('employees');
  };

  const handleOpenAddEmp = () => {
    setEmpToEdit(null);
    setIsEmpModalOpen(true);
  };

  const handleOpenEditEmp = (emp) => {
    setEmpToEdit(emp);
    setIsEmpModalOpen(true);
  };

  const handleBackToEmpList = () => {
    setSelectedEmployeeId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex transition-colors">
      {/* Collapsible Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          // If moving between main navigation, reset selected employee details page unless staying in employees
          if (tab !== 'employees') {
            setSelectedEmployeeId(null);
          }
        }}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        setIsMobileOpen={setIsMobileSidebarOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        {/* Top Sticky Navbar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'employees') setSelectedEmployeeId(null);
          }}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onSelectEmployee={handleSelectEmployee}
        />

        {/* Dynamic Page Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              setActiveTab={setActiveTab}
              onOpenAddEmployee={handleOpenAddEmp}
              onOpenLeaveModal={() => setIsLeaveModalOpen(true)}
              onOpenAttendanceModal={() => setIsAttendanceModalOpen(true)}
            />
          )}

          {activeTab === 'employees' && (
            <>
              {selectedEmployeeId ? (
                <EmployeeProfile
                  employeeId={selectedEmployeeId}
                  onBack={handleBackToEmpList}
                  onEdit={handleOpenEditEmp}
                  onDelete={(emp) => setEmpToDelete(emp)}
                />
              ) : (
                <EmployeeList
                  onSelectEmployee={handleSelectEmployee}
                  onOpenAddModal={handleOpenAddEmp}
                  onOpenEditModal={handleOpenEditEmp}
                />
              )}
            </>
          )}

          {activeTab === 'departments' && (
            <DepartmentList onSelectEmployee={handleSelectEmployee} />
          )}

          {activeTab === 'leaves' && (
            <LeaveManagement onSelectEmployee={handleSelectEmployee} />
          )}

          {activeTab === 'attendance' && (
            <AttendancePage onSelectEmployee={handleSelectEmployee} />
          )}

          {activeTab === 'settings' && <SettingsPage />}
        </main>

        {/* Global Footer */}
        <footer className="py-6 px-8 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400">
          <p>
            MoonLight Enterprise Human Resource Management • Built for High Performance Teams
          </p>
        </footer>
      </div>

      {/* Modals & Dialogs */}
      <EmployeeFormModal
        isOpen={isEmpModalOpen}
        onClose={() => setIsEmpModalOpen(false)}
        employeeToEdit={empToEdit}
      />

      <LeaveRequestModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
      />

      <MarkAttendanceModal
        isOpen={isAttendanceModalOpen}
        onClose={() => setIsAttendanceModalOpen(false)}
      />

      <ConfirmDialog
        isOpen={Boolean(empToDelete)}
        onClose={() => setEmpToDelete(null)}
        onConfirm={() => {
          if (empToDelete) {
            deleteEmployee(empToDelete.id);
            if (selectedEmployeeId === empToDelete.id) {
              setSelectedEmployeeId(null);
            }
          }
        }}
        title="Delete Employee Record?"
        message={`Are you sure you want to delete ${empToDelete?.firstName} ${empToDelete?.lastName}?`}
        confirmText="Confirm Delete"
        type="danger"
      />

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
};

