import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle, Trash2, CheckCircle2, Info } from 'lucide-react';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger' | 'warning' | 'primary'
  loading = false
}) => {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return (
          <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mb-4 sm:mb-0">
            <Trash2 className="w-6 h-6" />
          </div>
        );
      case 'warning':
        return (
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mb-4 sm:mb-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mb-4 sm:mb-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        );
    }
  };

  const getButtonStyles = () => {
    switch (type) {
      case 'danger':
        return 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 text-white shadow-lg shadow-rose-600/20';
      case 'warning':
        return 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500 text-white shadow-lg shadow-amber-600/20';
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white shadow-lg shadow-indigo-600/20';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" showClose={!loading}>
      <div className="sm:flex sm:items-start gap-4">
        {getIcon()}
        <div className="flex-1">
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            {title}
          </h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            {message}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          disabled={loading}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 disabled:opacity-50 ${getButtonStyles()}`}
        >
          {loading ? 'Processing...' : confirmText}
        </button>
      </div>
    </Modal>
  );
};

