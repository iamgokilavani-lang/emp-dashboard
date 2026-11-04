import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Filter,
  Check,
  X,
  Trash2,
  AlertTriangle,
  User,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { LeaveRequestModal } from './LeaveRequestModal';
import { EmptyState } from '../common/EmptyState';

export const LeaveManagement = ({ onSelectEmployee }) => {
  const { leaveRequests, approveLeave, rejectLeave, deleteLeave, addToast } = useApp();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Pending' | 'Approved' | 'Rejected'
  const [typeFilter, setTypeFilter] = useState('All');

  // Decision Modal State (Approve / Reject modal with remark)
  const [decisionModal, setDecisionModal] = useState({
    isOpen: false,
    leaveId: null,
    action: 'approve', // 'approve' | 'reject'
    employeeName: '',
    note: ''
  });

  // Calculate metrics
  const totalLeaves = leaveRequests.length;
  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending').length;
  const approvedLeaves = leaveRequests.filter((l) => l.status === 'Approved').length;
  const rejectedLeaves = leaveRequests.filter((l) => l.status === 'Rejected').length;
  const totalDays = leaveRequests.reduce((sum, l) => sum + (l.days || 1), 0);

  // Filtered requests
  const filteredLeaves = useMemo(() => {
    return leaveRequests.filter((l) => {
      if (statusFilter !== 'All' && l.status !== statusFilter) return false;
      if (typeFilter !== 'All' && l.type !== typeFilter) return false;
      return true;
    });
  }, [leaveRequests, statusFilter, typeFilter]);

  const openDecisionModal = (leave, action) => {
    setDecisionModal({
      isOpen: true,
      leaveId: leave.id,
      action,
      employeeName: leave.employeeName,
      note: action === 'approve' ? 'Approved by admin.' : 'Rejected due to project deadlines.'
    });
  };

  const confirmDecision = () => {
    if (decisionModal.action === 'approve') {
      approveLeave(decisionModal.leaveId, decisionModal.note);
    } else {
      rejectLeave(decisionModal.leaveId, decisionModal.note);
    }
    setDecisionModal({ isOpen: false, leaveId: null, action: 'approve', employeeName: '', note: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Outfit']">
            Leave Requests & Time-Off
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Evaluate, approve, or reject paid leave and vacation submissions
          </p>
        </div>

        <button
          onClick={() => setIsApplyModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Apply New Leave
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-['Outfit']">
            {pendingLeaves}
          </div>
          <span className="text-[11px] text-slate-400">Needs administrative action</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Approved</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-['Outfit']">
            {approvedLeaves}
          </div>
          <span className="text-[11px] text-slate-400">Authorized absences</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Rejected</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-['Outfit']">
            {rejectedLeaves}
          </div>
          <span className="text-[11px] text-slate-400">Declined requests</span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase">Total Days</span>
            <CalendarCheck className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-['Outfit']">
            {totalDays}
          </div>
          <span className="text-[11px] text-slate-400">Across {totalLeaves} total requests</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === status
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {status} {status === 'Pending' && pendingLeaves > 0 && `(${pendingLeaves})`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium">Type:</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="All">All Types</option>
            <option value="Vacation">Vacation</option>
            <option value="Sick Leave">Sick Leave</option>
            <option value="Casual Leave">Casual Leave</option>
            <option value="Parental Leave">Parental Leave</option>
            <option value="Unpaid Leave">Unpaid Leave</option>
          </select>
        </div>
      </div>

      {/* Leave Requests Table */}
      {filteredLeaves.length === 0 ? (
        <EmptyState
          title="No leave requests found"
          description="There are currently no leave requests matching your selected filters."
          actionLabel="Apply New Leave"
          onAction={() => setIsApplyModalOpen(true)}
        />
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Employee</th>
                  <th className="py-3.5 px-4">Leave Type</th>
                  <th className="py-3.5 px-4">Dates & Duration</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Reason</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Interactions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLeaves.map((lr) => (
                  <tr
                    key={lr.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    {/* Employee */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={lr.employeeAvatar}
                          alt={lr.employeeName}
                          onClick={() => onSelectEmployee(lr.employeeId)}
                          className="w-9 h-9 rounded-xl object-cover cursor-pointer hover:ring-2 hover:ring-indigo-500"
                        />
                        <div className="min-w-0">
                          <div
                            onClick={() => onSelectEmployee(lr.employeeId)}
                            className="font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer text-xs sm:text-sm truncate"
                          >
                            {lr.employeeName}
                          </div>
                          <div className="text-xs text-slate-400">{lr.department}</div>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                        {lr.type}
                      </span>
                      <div className="text-[11px] text-slate-400">Filed {lr.appliedDate}</div>
                    </td>

                    {/* Dates & Duration */}
                    <td className="py-3.5 px-4">
                      <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        {lr.startDate} → {lr.endDate}
                      </div>
                      <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                        {lr.days} {lr.days === 1 ? 'day' : 'days'}
                      </span>
                    </td>

                    {/* Reason */}
                    <td className="py-3.5 px-4 hidden md:table-cell max-w-xs">
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        "{lr.reason}"
                      </p>
                      {lr.reviewNote && (
                        <p className="text-[11px] text-slate-500 mt-1 italic">
                          Decision note: {lr.reviewNote}
                        </p>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <Badge status={lr.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      {lr.status === 'Pending' ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => openDecisionModal(lr, 'approve')}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
                            title="Approve leave"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            onClick={() => openDecisionModal(lr, 'reject')}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-sm transition-all"
                            title="Reject leave"
                          >
                            <X className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <span className="text-xs text-slate-400 italic">
                            Decided
                          </span>
                          <button
                            onClick={() => deleteLeave(lr.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            title="Delete Request"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Apply Leave Modal */}
      <LeaveRequestModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      {/* Decision Remarks Modal */}
      <Modal
        isOpen={decisionModal.isOpen}
        onClose={() =>
          setDecisionModal({ isOpen: false, leaveId: null, action: 'approve', employeeName: '', note: '' })
        }
        title={decisionModal.action === 'approve' ? 'Approve Leave Request' : 'Reject Leave Request'}
        subtitle={`Decision for ${decisionModal.employeeName}`}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            {decisionModal.action === 'approve'
              ? 'Are you sure you want to approve this leave request? You may add an optional note below for the employee.'
              : 'Please enter the reason for rejecting this leave request so the employee understands the decision.'}
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Admin Remarks / Reason
            </label>
            <textarea
              value={decisionModal.note}
              onChange={(e) => setDecisionModal({ ...decisionModal, note: e.target.value })}
              rows={3}
              placeholder="e.g. Approved. Enjoy your time off!"
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() =>
                setDecisionModal({ isOpen: false, leaveId: null, action: 'approve', employeeName: '', note: '' })
              }
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={confirmDecision}
              className={`px-4 py-2 text-xs font-bold rounded-xl text-white shadow-sm transition-all ${
                decisionModal.action === 'approve'
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-rose-600 hover:bg-rose-700'
              }`}
            >
              {decisionModal.action === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

