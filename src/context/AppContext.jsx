import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_DEPARTMENTS,
  INITIAL_EMPLOYEES,
  INITIAL_LEAVES,
  INITIAL_ATTENDANCE,
  INITIAL_ADMIN,
  INITIAL_SETTINGS
} from '../constants/mockData';

const AppContext = createContext();

const STORAGE_KEYS = {
  EMPLOYEES: 'moonlight_employees_v1',
  DEPARTMENTS: 'moonlight_departments_v1',
  LEAVES: 'moonlight_leaves_v1',
  ATTENDANCE: 'moonlight_attendance_v1',
  ADMIN: 'moonlight_admin_v1',
  SETTINGS: 'moonlight_settings_v1',
  ACTIVITIES: 'moonlight_activities_v1',
};

const getStored = (newKey, legacyKey) => {
  try {
    return localStorage.getItem(newKey) || (legacyKey ? localStorage.getItem(legacyKey) : null);
  } catch {
    return null;
  }
};

const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    user: 'Gokilavani',
    action: 'approved leave request for',
    target: 'Aaliyah Patel',
    time: '2 hours ago',
    type: 'leave_approved'
  },
  {
    id: 'act-2',
    user: 'Jordan Taylor',
    action: 'submitted a new sick leave request',
    target: '(3 days)',
    time: '3 hours ago',
    type: 'leave_pending'
  },
  {
    id: 'act-3',
    user: 'Sarah Jenkins',
    action: 'clocked in at Office (SF HQ)',
    target: 'at 08:45 AM',
    time: '4 hours ago',
    type: 'attendance'
  },
  {
    id: 'act-4',
    user: 'System Admin',
    action: 'updated department budget for',
    target: 'Engineering ($650k)',
    time: '1 day ago',
    type: 'department'
  }
];

export const AppProvider = ({ children }) => {
  // 1. Employees State
  const [employees, setEmployees] = useState(() => {
    try {
      const saved = getStored(STORAGE_KEYS.EMPLOYEES, 'talentpulse_employees_v1');
      return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
    } catch {
      return INITIAL_EMPLOYEES;
    }
  });

  // 2. Departments State
  const [departments, setDepartments] = useState(() => {
    try {
      const saved = getStored(STORAGE_KEYS.DEPARTMENTS, 'talentpulse_departments_v1');
      return saved ? JSON.parse(saved) : INITIAL_DEPARTMENTS;
    } catch {
      return INITIAL_DEPARTMENTS;
    }
  });

  // 3. Leaves State
  const [leaveRequests, setLeaveRequests] = useState(() => {
    try {
      const saved = getStored(STORAGE_KEYS.LEAVES, 'talentpulse_leaves_v1');
      return saved ? JSON.parse(saved) : INITIAL_LEAVES;
    } catch {
      return INITIAL_LEAVES;
    }
  });

  // 4. Attendance State
  const [attendance, setAttendance] = useState(() => {
    try {
      const saved = getStored(STORAGE_KEYS.ATTENDANCE, 'talentpulse_attendance_v1');
      return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE;
    } catch {
      return INITIAL_ATTENDANCE;
    }
  });

  // 5. Admin Profile
  const [adminProfile, setAdminProfile] = useState(() => {
    try {
      const saved = getStored(STORAGE_KEYS.ADMIN, 'talentpulse_admin_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name === 'Alexandra Mercer' || parsed.name === 'Alexandra') {
          return { ...parsed, name: 'Gokilavani', email: 'gokilavani.admin@moonlight.io' };
        }
        if (parsed.email && parsed.email.includes('@talentpulse.io')) {
          return {
            ...parsed,
            email: parsed.email.replace('@talentpulse.io', '@moonlight.io'),
            company: 'MoonLight Technologies Inc.'
          };
        }
        return parsed;
      }
      return INITIAL_ADMIN;
    } catch {
      return INITIAL_ADMIN;
    }
  });

  // 6. Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = getStored(STORAGE_KEYS.SETTINGS, 'talentpulse_settings_v1');
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // 7. Activities
  const [activities, setActivities] = useState(() => {
    try {
      const saved = getStored(STORAGE_KEYS.ACTIVITIES, 'talentpulse_activities_v1');
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITIES;
    } catch {
      return INITIAL_ACTIVITIES;
    }
  });

  // 8. Toasts
  const [toasts, setToasts] = useState([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DEPARTMENTS, JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEAVES, JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(adminProfile));
  }, [adminProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    // Apply dark class to documentElement
    if (settings.theme === 'dark' || (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  // Toast dispatchers
  const addToast = (message, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const logActivity = (action, target, type = 'info') => {
    const newAct = {
      id: 'act-' + Date.now(),
      user: adminProfile.name.split(' ')[0] || 'Admin',
      action,
      target,
      time: 'Just now',
      type
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 19)]);
  };

  // Employee Actions
  const addEmployee = (newEmpData) => {
    const id = `EMP-${String(employees.length + 1).padStart(3, '0')}`;
    const newEmployee = {
      ...newEmpData,
      id,
      avatar: newEmpData.avatar || `https://images.unsplash.com/photo-${1534528741775 + employees.length}?auto=format&fit=crop&w=256&q=80`,
      skills: Array.isArray(newEmpData.skills) ? newEmpData.skills : (newEmpData.skills ? newEmpData.skills.split(',').map(s => s.trim()) : [])
    };
    setEmployees((prev) => [newEmployee, ...prev]);
    logActivity('added new employee', `${newEmployee.firstName} ${newEmployee.lastName}`, 'employee');
    addToast(`Employee "${newEmployee.firstName} ${newEmployee.lastName}" registered successfully!`);
    return newEmployee;
  };

  const updateEmployee = (id, updatedFields) => {
    setEmployees((prev) =>
      prev.map((emp) => {
        if (emp.id === id) {
          const skills = Array.isArray(updatedFields.skills) 
            ? updatedFields.skills 
            : (typeof updatedFields.skills === 'string' ? updatedFields.skills.split(',').map(s => s.trim()).filter(Boolean) : emp.skills);
          return { ...emp, ...updatedFields, skills };
        }
        return emp;
      })
    );
    const emp = employees.find(e => e.id === id);
    const empName = emp ? `${emp.firstName} ${emp.lastName}` : id;
    logActivity('updated details for', empName, 'employee');
    addToast(`Updated employee details for ${empName}`);
  };

  const deleteEmployee = (id) => {
    const emp = employees.find((e) => e.id === id);
    const empName = emp ? `${emp.firstName} ${emp.lastName}` : id;
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    logActivity('removed employee record', empName, 'warning');
    addToast(`Employee ${empName} was deleted`, 'info');
  };

  // Department Actions
  const addDepartment = (deptData) => {
    const id = `dept-${Date.now()}`;
    const newDept = {
      ...deptData,
      id,
      color: deptData.color || 'indigo'
    };
    setDepartments((prev) => [...prev, newDept]);
    logActivity('created new department', newDept.name, 'department');
    addToast(`Department "${newDept.name}" created!`);
  };

  const updateDepartment = (id, updatedFields) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updatedFields } : d))
    );
    const dept = departments.find(d => d.id === id);
    logActivity('updated department details', dept ? dept.name : id, 'department');
    addToast('Department updated successfully');
  };

  const deleteDepartment = (id) => {
    const dept = departments.find((d) => d.id === id);
    // Check if any employees in this department
    const inDept = employees.filter((e) => e.department === dept?.name);
    if (inDept.length > 0) {
      addToast(`Cannot delete "${dept?.name}": ${inDept.length} active employee(s) assigned. Reassign them first.`, 'error');
      return false;
    }
    setDepartments((prev) => prev.filter((d) => d.id !== id));
    logActivity('removed department', dept?.name || id, 'warning');
    addToast(`Department "${dept?.name}" removed`, 'info');
    return true;
  };

  // Leave Actions
  const addLeaveRequest = (leaveData) => {
    const emp = employees.find((e) => e.id === leaveData.employeeId);
    const id = `LR-${Date.now().toString().slice(-4)}`;
    const newLeave = {
      id,
      employeeId: leaveData.employeeId,
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : leaveData.employeeName,
      employeeAvatar: emp?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      department: emp ? emp.department : leaveData.department || 'General',
      type: leaveData.type,
      startDate: leaveData.startDate,
      endDate: leaveData.endDate,
      days: parseInt(leaveData.days) || 1,
      reason: leaveData.reason,
      status: 'Pending',
      appliedDate: new Date().toISOString().split('T')[0],
      reviewedBy: null,
      reviewedDate: null,
      reviewNote: null
    };
    setLeaveRequests((prev) => [newLeave, ...prev]);
    logActivity('submitted leave request', `${newLeave.employeeName} (${newLeave.type})`, 'leave_pending');
    addToast(`Leave request submitted for ${newLeave.employeeName}`);
  };

  const approveLeave = (id, reviewNote = 'Approved by administrator.') => {
    setLeaveRequests((prev) =>
      prev.map((lr) => {
        if (lr.id === id) {
          return {
            ...lr,
            status: 'Approved',
            reviewedBy: adminProfile.name,
            reviewedDate: new Date().toISOString().split('T')[0],
            reviewNote: reviewNote || 'Approved by administrator.'
          };
        }
        return lr;
      })
    );
    const lr = leaveRequests.find((l) => l.id === id);
    if (lr) {
      logActivity('approved leave for', `${lr.employeeName} (${lr.days} days)`, 'leave_approved');
      addToast(`Approved leave request #${id} for ${lr.employeeName}`, 'success');
    }
  };

  const rejectLeave = (id, reviewNote = 'Rejected due to operational requirements.') => {
    setLeaveRequests((prev) =>
      prev.map((lr) => {
        if (lr.id === id) {
          return {
            ...lr,
            status: 'Rejected',
            reviewedBy: adminProfile.name,
            reviewedDate: new Date().toISOString().split('T')[0],
            reviewNote: reviewNote || 'Rejected due to scheduling conflicts.'
          };
        }
        return lr;
      })
    );
    const lr = leaveRequests.find((l) => l.id === id);
    if (lr) {
      logActivity('rejected leave for', `${lr.employeeName}`, 'warning');
      addToast(`Rejected leave request #${id}`, 'info');
    }
  };

  const deleteLeave = (id) => {
    setLeaveRequests((prev) => prev.filter((lr) => lr.id !== id));
    addToast(`Leave request #${id} removed`, 'info');
  };

  // Attendance Actions
  const markAttendance = (newRecord) => {
    const emp = employees.find((e) => e.id === newRecord.employeeId);
    const id = `ATT-${Date.now().toString().slice(-4)}`;
    const record = {
      id,
      employeeId: newRecord.employeeId,
      employeeName: emp ? `${emp.firstName} ${emp.lastName}` : newRecord.employeeName,
      department: emp ? emp.department : 'General',
      date: newRecord.date || new Date().toISOString().split('T')[0],
      checkIn: newRecord.checkIn || '09:00 AM',
      checkOut: newRecord.checkOut || '05:30 PM',
      status: newRecord.status || 'Present',
      workHours: parseFloat(newRecord.workHours) || 8.5,
      location: newRecord.location || 'Office',
      notes: newRecord.notes || 'Manually logged'
    };

    // Check if record for same employee and date exists, replace it
    setAttendance((prev) => {
      const filtered = prev.filter(
        (a) => !(a.employeeId === record.employeeId && a.date === record.date)
      );
      return [record, ...filtered];
    });

    logActivity('logged attendance for', `${record.employeeName} (${record.status})`, 'attendance');
    addToast(`Attendance logged for ${record.employeeName}: ${record.status}`);
  };

  // Interactive Clock In / Clock Out simulation
  const toggleClockInOut = (employeeId) => {
    const emp = employees.find((e) => e.id === employeeId);
    if (!emp) return;
    const today = new Date().toISOString().split('T')[0];
    const existing = attendance.find(
      (a) => a.employeeId === employeeId && a.date === today
    );

    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (!existing) {
      // Clock in
      const newRec = {
        id: `ATT-${Date.now().toString().slice(-4)}`,
        employeeId,
        employeeName: `${emp.firstName} ${emp.lastName}`,
        department: emp.department,
        date: today,
        checkIn: nowTime,
        checkOut: '-',
        status: 'Present',
        workHours: 0,
        location: 'Office (Main)',
        notes: 'Clocked in via portal'
      };
      setAttendance((prev) => [newRec, ...prev]);
      logActivity('clocked in for today', `${emp.firstName} ${emp.lastName}`, 'attendance');
      addToast(`Clocked IN: ${emp.firstName} ${emp.lastName} at ${nowTime}`);
    } else if (existing.checkOut === '-') {
      // Clock out
      const updated = {
        ...existing,
        checkOut: nowTime,
        workHours: 8.25,
        notes: 'Completed day shift'
      };
      setAttendance((prev) =>
        prev.map((a) => (a.id === existing.id ? updated : a))
      );
      logActivity('clocked out for today', `${emp.firstName} ${emp.lastName}`, 'attendance');
      addToast(`Clocked OUT: ${emp.firstName} ${emp.lastName} at ${nowTime}`);
    } else {
      addToast(`${emp.firstName} has already completed attendance for today`, 'info');
    }
  };

  // Reset all data to factory demo state
  const resetDemoData = () => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    [
      'talentpulse_employees_v1',
      'talentpulse_departments_v1',
      'talentpulse_leaves_v1',
      'talentpulse_attendance_v1',
      'talentpulse_admin_v1',
      'talentpulse_settings_v1',
      'talentpulse_activities_v1'
    ].forEach((k) => localStorage.removeItem(k));

    setEmployees(INITIAL_EMPLOYEES);
    setDepartments(INITIAL_DEPARTMENTS);
    setLeaveRequests(INITIAL_LEAVES);
    setAttendance(INITIAL_ATTENDANCE);
    setAdminProfile(INITIAL_ADMIN);
    setSettings(INITIAL_SETTINGS);
    setActivities(INITIAL_ACTIVITIES);

    addToast('Demo database restored to initial state!', 'success');
  };

  const updateAdminProfile = (fields) => {
    setAdminProfile((prev) => ({ ...prev, ...fields }));
    addToast('Admin profile details updated');
  };

  const updateSettings = (fields) => {
    setSettings((prev) => ({ ...prev, ...fields }));
    addToast('System preferences saved');
  };

  return (
    <AppContext.Provider
      value={{
        employees,
        departments,
        leaveRequests,
        attendance,
        adminProfile,
        settings,
        activities,
        toasts,
        addToast,
        removeToast,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        addDepartment,
        updateDepartment,
        deleteDepartment,
        addLeaveRequest,
        approveLeave,
        rejectLeave,
        deleteLeave,
        markAttendance,
        toggleClockInOut,
        updateAdminProfile,
        updateSettings,
        resetDemoData,
        logActivity
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

