import React, { useState } from 'react';
import {
  Building2,
  Users,
  Plus,
  Edit2,
  Trash2,
  MapPin,
  DollarSign,
  UserCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DepartmentModal } from './DepartmentModal';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const DepartmentList = ({ onSelectEmployee }) => {
  const { departments, employees, deleteDepartment } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [departmentToEdit, setDepartmentToEdit] = useState(null);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [expandedDeptId, setExpandedDeptId] = useState(null);

  const handleEdit = (dept) => {
    setDepartmentToEdit(dept);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setDepartmentToEdit(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Outfit']">
            Department Directory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Overview of company structure, operational divisions, budgets, and leadership
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all hover:shadow-indigo-600/30 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => {
          const deptEmployees = employees.filter((e) => e.department === dept.name);
          const isExpanded = expandedDeptId === dept.id;

          return (
            <div
              key={dept.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base shadow-sm ring-4 ring-indigo-50/50 dark:ring-indigo-950/20">
                      {dept.code || dept.name.slice(0, 3).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                        {dept.name}
                      </h3>
                      <span className="text-xs text-slate-400">
                        Lead: <strong className="text-slate-700 dark:text-slate-300">{dept.head}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(dept)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Edit Department"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDepartmentToDelete(dept)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Delete Department"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Description */}
                {dept.description && (
                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {dept.description}
                  </p>
                )}

                {/* Meta details */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="block text-[11px] text-slate-400 font-medium">
                      Operating Budget
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {dept.budget}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <span className="block text-[11px] text-slate-400 font-medium">
                      Team Size
                    </span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {deptEmployees.length} Members
                    </span>
                  </div>
                </div>

                {/* Location */}
                <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{dept.location}</span>
                </div>

                {/* Assigned Employees Preview */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">
                      Team Members ({deptEmployees.length})
                    </span>
                    {deptEmployees.length > 0 && (
                      <button
                        onClick={() => setExpandedDeptId(isExpanded ? null : dept.id)}
                        className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        {isExpanded ? 'Collapse' : 'Show All'}
                      </button>
                    )}
                  </div>

                  {deptEmployees.length > 0 ? (
                    <div className="flex items-center -space-x-2 overflow-hidden py-1">
                      {deptEmployees.slice(0, 5).map((e) => (
                        <img
                          key={e.id}
                          src={e.avatar}
                          alt={e.firstName}
                          title={`${e.firstName} ${e.lastName} - ${e.role}`}
                          onClick={() => onSelectEmployee(e.id)}
                          className="w-8 h-8 rounded-full object-cover ring-2 ring-white dark:ring-slate-900 cursor-pointer hover:scale-110 transition-transform"
                        />
                      ))}
                      {deptEmployees.length > 5 && (
                        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 ring-2 ring-white dark:ring-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-600 dark:text-slate-300">
                          +{deptEmployees.length - 5}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No employees assigned yet.</p>
                  )}

                  {/* Expanded member list */}
                  {isExpanded && deptEmployees.length > 0 && (
                    <div className="mt-3 divide-y divide-slate-100 dark:divide-slate-800 max-h-48 overflow-y-auto animate-in fade-in-50">
                      {deptEmployees.map((e) => (
                        <div
                          key={e.id}
                          onClick={() => onSelectEmployee(e.id)}
                          className="py-2 flex items-center justify-between gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/40 px-2 rounded-lg cursor-pointer transition-colors"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <img
                              src={e.avatar}
                              alt={e.firstName}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <div className="truncate text-xs font-semibold text-slate-800 dark:text-slate-200">
                              {e.firstName} {e.lastName}
                            </div>
                          </div>
                          <span className="text-[11px] text-slate-400 truncate max-w-[120px]">
                            {e.role}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Department Modal */}
      <DepartmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        departmentToEdit={departmentToEdit}
      />

      {/* Delete Department Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(departmentToDelete)}
        onClose={() => setDepartmentToDelete(null)}
        onConfirm={() => {
          if (departmentToDelete) {
            deleteDepartment(departmentToDelete.id);
          }
        }}
        title="Delete Department?"
        message={`Are you sure you want to remove the "${departmentToDelete?.name}" department? (Note: Departments with active employees assigned cannot be deleted).`}
        confirmText="Yes, Delete Department"
        type="danger"
      />
    </div>
  );
};

