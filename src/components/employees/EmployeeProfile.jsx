import React, { useState } from 'react';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Building2,
  Briefcase,
  UserCheck,
  HeartHandshake,
  Edit3,
  Trash2,
  Clock,
  CalendarCheck,
  Sparkles,
  Award,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const EmployeeProfile = ({
  employeeId,
  onBack,
  onEdit,
  onDelete
}) => {
  const {
    employees,
    attendance,
    leaveRequests,
    updateEmployee,
    toggleClockInOut
  } = useApp();

  const [activeProfileTab, setActiveProfileTab] = useState('overview'); // 'overview' | 'attendance' | 'leaves'

  const employee = employees.find((e) => e.id === employeeId);

  if (!employee) {
    return (
      <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Employee Not Found
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          The requested employee record does not exist or has been removed.
        </p>
        <button
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold"
        >
          Return to Directory
        </button>
      </div>
    );
  }

  // Filter attendance and leaves for this employee
  const employeeAttendance = attendance.filter((a) => a.employeeId === employee.id);
  const employeeLeaves = leaveRequests.filter((l) => l.employeeId === employee.id);

  const handleStatusChange = (newStatus) => {
    updateEmployee(employee.id, { status: newStatus });
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Employee Directory
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleClockInOut(employee.id)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all"
          >
            <Clock className="w-4 h-4 text-indigo-500" />
            Simulate Clock In / Out
          </button>
          <button
            onClick={() => onEdit(employee)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </button>
          <button
            onClick={() => onDelete(employee)}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-bold transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </div>

      {/* Hero Profile Header Card */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-card p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <img
              src={employee.avatar}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover ring-4 ring-indigo-50 dark:ring-indigo-950/50 shadow-md"
            />
            <span className="absolute -bottom-1 -right-1">
              <Badge status={employee.status} size="xs" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Outfit']">
                {employee.firstName} {employee.lastName}
              </h2>
              <span className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-slate-600 dark:text-slate-300 font-bold">
                {employee.id}
              </span>
            </div>

            <p className="mt-1 text-base font-medium text-slate-600 dark:text-slate-300">
              {employee.role}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                {employee.department}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-indigo-500" />
                {employee.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-indigo-500" />
                {employee.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                {employee.location}
              </span>
            </div>
          </div>

          {/* Quick status switch dropdown */}
          <div className="sm:self-center shrink-0">
            <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Status Setting
            </label>
            <select
              value={employee.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Probation">Probation</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Tab navigation pills */}
        <div className="mt-8 flex items-center gap-2 border-t border-slate-100 dark:border-slate-800 pt-4">
          <button
            onClick={() => setActiveProfileTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeProfileTab === 'overview'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Overview & Details
          </button>
          <button
            onClick={() => setActiveProfileTab('attendance')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeProfileTab === 'attendance'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Attendance History ({employeeAttendance.length})
          </button>
          <button
            onClick={() => setActiveProfileTab('leaves')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeProfileTab === 'leaves'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            Leave Records ({employeeLeaves.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Overview & Details */}
      {activeProfileTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio & Professional Summary */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                Professional Bio
              </h3>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {employee.bio ||
                  `${employee.firstName} ${employee.lastName} is a ${employee.type} ${employee.role} within the ${employee.department} team.`}
              </p>

              {/* Skills tags */}
              <div className="mt-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Competencies & Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(employee.skills) && employee.skills.length > 0 ? (
                    employee.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-100 dark:border-indigo-900/50"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">No skills listed</span>
                  )}
                </div>
              </div>
            </div>

            {/* Employment & Contract Specifics */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                Contract & Compensation Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="block text-xs text-slate-400 font-medium">
                    Employment Type
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {employee.type}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="block text-xs text-slate-400 font-medium">
                    Hire Date
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {employee.joinDate}
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="block text-xs text-slate-400 font-medium">
                    Annual Compensation
                  </span>
                  <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    ${employee.salary ? employee.salary.toLocaleString() : '0'} / year
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="block text-xs text-slate-400 font-medium">
                    Workplace Location
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {employee.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Emergency Contact & Quick Stats */}
          <div className="space-y-6">
            {/* Emergency Contact */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <HeartHandshake className="w-4 h-4 text-rose-500" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                  Emergency Contact
                </h3>
              </div>

              {employee.emergencyContact ? (
                <div className="space-y-3">
                  <div>
                    <span className="block text-xs text-slate-400 font-medium">
                      Primary Contact
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {employee.emergencyContact.name}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-medium">
                      Relationship
                    </span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {employee.emergencyContact.relationship}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-medium">
                      Phone Number
                    </span>
                    <a
                      href={`tel:${employee.emergencyContact.phone}`}
                      className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {employee.emergencyContact.phone}
                    </a>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No emergency contact provided.</p>
              )}
            </div>

            {/* Quick Metrics Badge */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Performance & Standing</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Member of <strong>{employee.department}</strong> in good organizational standing with all credentials validated.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Attendance History */}
      {activeProfileTab === 'attendance' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 font-['Outfit']">
            Attendance Logs for {employee.firstName} {employee.lastName}
          </h3>
          {employeeAttendance.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4 rounded-l-xl">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Check In</th>
                    <th className="py-3 px-4">Check Out</th>
                    <th className="py-3 px-4">Hours</th>
                    <th className="py-3 px-4 rounded-r-xl">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {employeeAttendance.map((rec) => (
                    <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-850">
                      <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                        {rec.date}
                      </td>
                      <td className="py-3 px-4">
                        <Badge status={rec.status} />
                      </td>
                      <td className="py-3 px-4 font-mono text-xs">{rec.checkIn}</td>
                      <td className="py-3 px-4 font-mono text-xs">{rec.checkOut}</td>
                      <td className="py-3 px-4 font-semibold">{rec.workHours} hrs</td>
                      <td className="py-3 px-4 text-slate-500 text-xs">{rec.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm">
              No individual attendance logs found for this employee yet.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Leave History */}
      {activeProfileTab === 'leaves' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 font-['Outfit']">
            Leave Requests for {employee.firstName} {employee.lastName}
          </h3>
          {employeeLeaves.length > 0 ? (
            <div className="space-y-3">
              {employeeLeaves.map((lr) => (
                <div
                  key={lr.id}
                  className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {lr.type}
                      </span>
                      <Badge status={lr.status} size="xs" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {lr.startDate} to {lr.endDate} ({lr.days} days) • Reason: "{lr.reason}"
                    </p>
                    {lr.reviewNote && (
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-medium">
                        Admin Note: {lr.reviewNote}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-400">{lr.id}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm">
              No leave requests filed by this employee.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

