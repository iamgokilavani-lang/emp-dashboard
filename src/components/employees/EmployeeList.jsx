import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  LayoutGrid,
  List,
  Eye,
  Edit2,
  Trash2,
  Download,
  Mail,
  Phone,
  Building2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const EmployeeList = ({
  onSelectEmployee,
  onOpenAddModal,
  onOpenEditModal
}) => {
  const { employees, departments, deleteEmployee, addToast } = useApp();

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc'); // 'name-asc' | 'name-desc' | 'date-desc' | 'date-asc' | 'salary-desc'
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'grid'

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Confirm delete dialog state
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Filter & Sort Logic
  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        // Department filter
        if (selectedDept !== 'All' && emp.department !== selectedDept) return false;
        // Status filter
        if (selectedStatus !== 'All' && emp.status !== selectedStatus) return false;
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const fullName = `${emp.firstName} ${emp.lastName}`.toLowerCase();
          const matches =
            fullName.includes(q) ||
            emp.email.toLowerCase().includes(q) ||
            emp.role.toLowerCase().includes(q) ||
            emp.department.toLowerCase().includes(q) ||
            emp.id.toLowerCase().includes(q);
          if (!matches) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name-asc') {
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        }
        if (sortBy === 'name-desc') {
          return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
        }
        if (sortBy === 'date-desc') {
          return new Date(b.joinDate) - new Date(a.joinDate);
        }
        if (sortBy === 'date-asc') {
          return new Date(a.joinDate) - new Date(b.joinDate);
        }
        if (sortBy === 'salary-desc') {
          return (b.salary || 0) - (a.salary || 0);
        }
        return 0;
      });
  }, [employees, selectedDept, selectedStatus, searchQuery, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (filteredEmployees.length === 0) {
      addToast('No employee records available to export', 'error');
      return;
    }
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Role', 'Department', 'Status', 'Join Date', 'Salary'];
    const rows = filteredEmployees.map((e) => [
      e.id,
      `"${e.firstName}"`,
      `"${e.lastName}"`,
      `"${e.email}"`,
      `"${e.role}"`,
      `"${e.department}"`,
      `"${e.status}"`,
      `"${e.joinDate}"`,
      `"${e.salary}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `employees_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast(`Exported ${filteredEmployees.length} employees to CSV!`, 'success');
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDept('All');
    setSelectedStatus('All');
    setSortBy('name-asc');
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery !== '' || selectedDept !== 'All' || selectedStatus !== 'All';

  return (
    <div className="space-y-6">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Outfit']">
            Employee Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Managing {employees.length} total team members across {departments.length} departments
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold shadow-sm transition-colors"
            title="Download CSV report"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all hover:shadow-indigo-600/30 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, role, email, or employee ID..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters & Sorters */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Department Filter */}
            <select
              value={selectedDept}
              onChange={(e) => {
                setSelectedDept(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Probation">Probation</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Sorter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="name-asc">Name (A → Z)</option>
              <option value="name-desc">Name (Z → A)</option>
              <option value="date-desc">Newest Hired</option>
              <option value="date-asc">Oldest Hired</option>
              <option value="salary-desc">Highest Salary</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Table view"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter indicator pill */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-500">
              Showing <strong>{filteredEmployees.length}</strong> matching results
            </span>
            <button
              onClick={clearFilters}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Main List Content */}
      {filteredEmployees.length === 0 ? (
        <EmptyState
          title="No employees matched your criteria"
          description="Try clearing your search query or reset the department and status filters to see employees."
          actionLabel="Clear All Filters"
          onAction={clearFilters}
        />
      ) : viewMode === 'table' ? (
        /* Responsive Table View */
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/80 dark:bg-slate-800/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Employee</th>
                  <th className="py-3.5 px-4">Role & Team</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Join Date</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Salary</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {paginatedEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-colors group"
                  >
                    {/* Employee Avatar & Name */}
                    <td className="py-3 px-4 sm:px-6">
                      <div
                        onClick={() => onSelectEmployee(emp.id)}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <img
                          src={emp.avatar}
                          alt={emp.firstName}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                            {emp.firstName} {emp.lastName}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">
                            {emp.id} • {emp.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Role & Department */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                        {emp.role}
                      </div>
                      <div className="text-xs text-slate-400">
                        {emp.department}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      <Badge status={emp.status} />
                    </td>

                    {/* Join Date */}
                    <td className="py-3 px-4 text-xs text-slate-500 hidden md:table-cell">
                      {emp.joinDate}
                    </td>

                    {/* Salary */}
                    <td className="py-3 px-4 text-xs font-semibold text-slate-700 dark:text-slate-300 hidden lg:table-cell">
                      ${emp.salary ? emp.salary.toLocaleString() : '0'}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => onSelectEmployee(emp.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="View Profile Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onOpenEditModal(emp)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Edit Employee"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEmployeeToDelete(emp)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="Delete Employee"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Modern Grid / Card View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginatedEmployees.map((emp) => (
            <div
              key={emp.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="relative">
                    <img
                      src={emp.avatar}
                      alt={emp.firstName}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-50 dark:ring-indigo-950/50"
                    />
                    <span className="absolute -top-1 -right-1 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {emp.id.replace('EMP-', '#')}
                    </span>
                  </div>
                  <Badge status={emp.status} size="xs" />
                </div>

                <h3
                  onClick={() => onSelectEmployee(emp.id)}
                  className="font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors cursor-pointer truncate"
                >
                  {emp.firstName} {emp.lastName}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {emp.role}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5 truncate">
                    <Building2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="truncate">{emp.department}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  ${emp.salary ? emp.salary.toLocaleString() : '0'}/yr
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onSelectEmployee(emp.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-indigo-600"
                    title="View Profile"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onOpenEditModal(emp)}
                    className="p-1 rounded-lg text-slate-400 hover:text-amber-600"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setEmployeeToDelete(emp)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {filteredEmployees.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-500">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{' '}
            <span className="font-semibold">
              {Math.min(startIndex + itemsPerPage, filteredEmployees.length)}
            </span>{' '}
            of <span className="font-semibold">{filteredEmployees.length}</span> employees
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPage === page
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(employeeToDelete)}
        onClose={() => setEmployeeToDelete(null)}
        onConfirm={() => {
          if (employeeToDelete) {
            deleteEmployee(employeeToDelete.id);
          }
        }}
        title="Delete Employee Record?"
        message={`Are you sure you want to permanently delete "${employeeToDelete?.firstName} ${employeeToDelete?.lastName}" (${employeeToDelete?.id})? This will also remove their associated profile details from localStorage.`}
        confirmText="Yes, Delete Record"
        type="danger"
      />
    </div>
  );
};

