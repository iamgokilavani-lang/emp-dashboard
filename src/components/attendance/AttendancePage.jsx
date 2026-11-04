import React, { useState, useMemo } from 'react';
import {
  Clock,
  UserCheck,
  AlertCircle,
  Calendar,
  Filter,
  Plus,
  ArrowRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  XCircle,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { MarkAttendanceModal } from './MarkAttendanceModal';
import { EmptyState } from '../common/EmptyState';

export const AttendancePage = ({ onSelectEmployee }) => {
  const { attendance, employees, departments, toggleClockInOut } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('2026-11-03');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [simEmployeeId, setSimEmployeeId] = useState(employees[0]?.id || '');

  // Filter attendance records
  const filteredRecords = useMemo(() => {
    return attendance.filter((rec) => {
      if (selectedDate && rec.date !== selectedDate) return false;
      if (deptFilter !== 'All' && rec.department !== deptFilter) return false;
      if (statusFilter !== 'All' && rec.status !== statusFilter) return false;
      return true;
    });
  }, [attendance, selectedDate, deptFilter, statusFilter]);

  // Attendance metrics
  const totalEmployeesCount = employees.length;
  const presentCount = filteredRecords.filter((r) => r.status === 'Present').length;
  const lateCount = filteredRecords.filter((r) => r.status === 'Late').length;
  const absentCount = filteredRecords.filter((r) => r.status === 'Absent').length;
  const halfDayCount = filteredRecords.filter((r) => r.status === 'Half Day').length;
  const onLeaveCount = filteredRecords.filter((r) => r.status === 'On Leave').length;

  const attendancePercent =
    totalEmployeesCount > 0
      ? Math.round(((presentCount + lateCount + halfDayCount) / totalEmployeesCount) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Outfit']">
            Attendance Summary & Time Tracking
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time daily shifts, punctual check-ins, overtime, and work-hours ledger
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Log Attendance
        </button>
      </div>

      {/* Live Simulation Card: Clock In / Clock Out Simulator */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white border border-indigo-900/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-400 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold tracking-wide text-white">
              Interactive Shift Check-In Simulator
            </h4>
            <p className="text-xs text-indigo-200/80">
              Select an employee and simulate real-time kiosk check-in / check-out.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={simEmployeeId}
            onChange={(e) => setSimEmployeeId(e.target.value)}
            className="flex-1 md:w-56 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.firstName} {e.lastName} ({e.id})
              </option>
            ))}
          </select>
          <button
            onClick={() => toggleClockInOut(simEmployeeId)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 shrink-0 flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Clock In / Out
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Overall Rate
          </span>
          <div className="mt-1 text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-['Outfit']">
            {attendancePercent}%
          </div>
          <span className="text-xs text-slate-400">Present or on duty</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Present
          </span>
          <div className="mt-1 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-['Outfit']">
            {presentCount}
          </div>
          <span className="text-xs text-slate-400">On time arrivals</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Late
          </span>
          <div className="mt-1 text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-['Outfit']">
            {lateCount}
          </div>
          <span className="text-xs text-slate-400">After 09:15 AM</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Absent
          </span>
          <div className="mt-1 text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-['Outfit']">
            {absentCount}
          </div>
          <span className="text-xs text-slate-400">Unscheduled absence</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-card col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Half Day / Leave
          </span>
          <div className="mt-1 text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-['Outfit']">
            {halfDayCount + onLeaveCount}
          </div>
          <span className="text-xs text-slate-400">Partial & Approved</span>
        </div>
      </div>

      {/* Filter and Date Selection Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Date Picker */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Department Filter */}
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="All">All Departments</option>
            {departments.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="All">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Half Day">Half Day</option>
            <option value="Absent">Absent</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        <span className="text-xs text-slate-400">
          Showing <strong>{filteredRecords.length}</strong> logged entries
        </span>
      </div>

      {/* Attendance Table */}
      {filteredRecords.length === 0 ? (
        <EmptyState
          title="No attendance records for this query"
          description="Try changing the date or clearing filters, or log an attendance entry."
          actionLabel="Log Attendance Entry"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Employee</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Check In</th>
                  <th className="py-3.5 px-4">Check Out</th>
                  <th className="py-3.5 px-4">Working Hours</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Location</th>
                  <th className="py-3.5 px-4 text-right">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredRecords.map((rec) => (
                  <tr
                    key={rec.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3.5 px-4 sm:px-6">
                      <div
                        onClick={() => onSelectEmployee(rec.employeeId)}
                        className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer text-xs sm:text-sm"
                      >
                        {rec.employeeName}
                      </div>
                      <div className="text-xs text-slate-400">{rec.department}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge status={rec.status} />
                    </td>

                    <td className="py-3.5 px-4 font-mono text-xs text-slate-700 dark:text-slate-300">
                      {rec.checkIn}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-xs text-slate-700 dark:text-slate-300">
                      {rec.checkOut}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-xs text-slate-900 dark:text-white">
                      {rec.workHours} hrs
                    </td>

                    <td className="py-3.5 px-4 hidden md:table-cell text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {rec.location}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right text-xs text-slate-500 italic">
                      {rec.notes}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Manual Entry Modal */}
      <MarkAttendanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

