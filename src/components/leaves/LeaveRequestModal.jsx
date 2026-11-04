import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Calendar, User, FileText, AlertCircle } from 'lucide-react';

export const LeaveRequestModal = ({ isOpen, onClose }) => {
  const { employees, addLeaveRequest } = useApp();

  const [formData, setFormData] = useState({
    employeeId: employees[0]?.id || '',
    type: 'Vacation',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    days: 3,
    reason: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.employeeId) errs.employeeId = 'Please select an employee';
    if (!formData.startDate) errs.startDate = 'Start date is required';
    if (!formData.endDate) errs.endDate = 'End date is required';
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      errs.endDate = 'End date cannot be earlier than start date';
    }
    if (!formData.reason.trim()) errs.reason = 'Please provide a reason for the leave';
    else if (formData.reason.trim().length < 5) errs.reason = 'Reason should be at least 5 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleDateChange = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    let diffDays = 1;
    if (!isNaN(s) && !isNaN(e) && e >= s) {
      diffDays = Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1;
    }
    setFormData((prev) => ({
      ...prev,
      startDate: start,
      endDate: end,
      days: diffDays > 0 ? diffDays : 1
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addLeaveRequest(formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Submit Leave Application"
      subtitle="File a formal paid time-off or absence request for employee approval."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Applying Employee *
          </label>
          <select
            value={formData.employeeId}
            onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName} {emp.lastName} — {emp.role} ({emp.department})
              </option>
            ))}
          </select>
          {errors.employeeId && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.employeeId}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Leave Classification *
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="Vacation">Vacation / Paid Time Off (PTO)</option>
            <option value="Sick Leave">Sick & Medical Leave</option>
            <option value="Casual Leave">Casual Personal Leave</option>
            <option value="Parental Leave">Maternity / Paternity / Parental</option>
            <option value="Bereavement">Bereavement Leave</option>
            <option value="Unpaid Leave">Unpaid Absence</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Start Date *
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleDateChange(e.target.value, formData.endDate)}
              className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {errors.startDate && (
              <p className="mt-1 text-xs text-rose-500">{errors.startDate}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              End Date *
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleDateChange(formData.startDate, e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {errors.endDate && (
              <p className="mt-1 text-xs text-rose-500">{errors.endDate}</p>
            )}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-xs text-indigo-700 dark:text-indigo-300 flex items-center justify-between">
          <span className="font-medium">Total Duration:</span>
          <span className="font-bold text-sm">
            {formData.days} {formData.days === 1 ? 'Working Day' : 'Working Days'}
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Reason / Justification *
          </label>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            rows={3}
            placeholder="Please detail why you require time off..."
            className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
          {errors.reason && (
            <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {errors.reason}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
          >
            Submit Request
          </button>
        </div>
      </form>
    </Modal>
  );
};

