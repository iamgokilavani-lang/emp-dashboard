import React from 'react';

export const Badge = ({ status, variant, children, size = 'sm', className = '' }) => {
  const normalized = (status || children || '').toString().toLowerCase();

  const getStyles = () => {
    if (variant === 'purple' || normalized === 'probation' || normalized === 'product & design') {
      return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800/60';
    }
    if (variant === 'indigo' || normalized === 'engineering') {
      return 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/60';
    }
    if (variant === 'blue' || normalized === 'finance & legal') {
      return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800/60';
    }
    if (
      variant === 'success' ||
      normalized === 'active' ||
      normalized === 'approved' ||
      normalized === 'present'
    ) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/60';
    }
    if (
      variant === 'warning' ||
      normalized === 'pending' ||
      normalized === 'on leave' ||
      normalized === 'late' ||
      normalized === 'marketing & growth'
    ) {
      return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/60';
    }
    if (
      variant === 'danger' ||
      normalized === 'inactive' ||
      normalized === 'rejected' ||
      normalized === 'absent' ||
      normalized === 'customer success'
    ) {
      return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/60';
    }
    if (normalized === 'half day') {
      return 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800/60';
    }

    return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  };

  const getDotColor = () => {
    if (normalized === 'active' || normalized === 'approved' || normalized === 'present') {
      return 'bg-emerald-500';
    }
    if (normalized === 'pending' || normalized === 'on leave' || normalized === 'late') {
      return 'bg-amber-500';
    }
    if (normalized === 'inactive' || normalized === 'rejected' || normalized === 'absent') {
      return 'bg-rose-500';
    }
    if (normalized === 'half day') {
      return 'bg-cyan-500';
    }
    return 'bg-slate-400';
  };

  const sizeClasses = size === 'xs' 
    ? 'px-2 py-0.5 text-xs' 
    : size === 'md' 
    ? 'px-3 py-1 text-sm' 
    : 'px-2.5 py-0.5 text-xs font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${sizeClasses} ${getStyles()} transition-colors ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`} />
      <span>{children || status}</span>
    </span>
  );
};

