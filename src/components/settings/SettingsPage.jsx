import React, { useState } from 'react';
import {
  User,
  Moon,
  Sun,
  Laptop,
  Palette,
  Shield,
  RotateCcw,
  Download,
  Upload,
  Save,
  CheckCircle2,
  Database,
  Building,
  Mail,
  Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ConfirmDialog } from '../common/ConfirmDialog';

export const SettingsPage = () => {
  const {
    adminProfile,
    updateAdminProfile,
    settings,
    updateSettings,
    resetDemoData,
    employees,
    departments,
    leaveRequests,
    attendance,
    addToast
  } = useApp();

  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'appearance' | 'data'
  const [profileForm, setProfileForm] = useState({ ...adminProfile });
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Profile Save
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateAdminProfile(profileForm);
  };

  // Export JSON Backup
  const handleExportData = () => {
    const backupData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      employees,
      departments,
      leaveRequests,
      attendance,
      adminProfile,
      settings
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `moonlight_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Backup JSON exported successfully!', 'success');
  };

  // Calculate storage usage
  const storageSize = Math.round(
    JSON.stringify({ employees, departments, leaveRequests, attendance, adminProfile, settings }).length / 1024
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight font-['Outfit']">
          System Preferences & Admin Profile
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Customize UI aesthetics, maintain administrator credentials, and manage localStorage data
        </p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${activeTab === 'profile'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
          <User className="w-4 h-4" /> Admin Profile
        </button>

        <button
          onClick={() => setActiveTab('appearance')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${activeTab === 'appearance'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
          <Palette className="w-4 h-4" /> Theme & Appearance
        </button>

        <button
          onClick={() => setActiveTab('data')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${activeTab === 'data'
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
          <Database className="w-4 h-4" /> Data & LocalStorage
        </button>
      </div>

      {/* Tab 1: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <form onSubmit={handleProfileSubmit} className="space-y-5">
            <div className="flex items-center gap-5 pb-5 border-b border-slate-100 dark:border-slate-800">
              <img
                src={profileForm.avatar}
                alt={profileForm.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500 shadow-sm"
              />
              <div className="flex-1">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  {profileForm.name}
                </h3>
                <p className="text-xs text-slate-400">{profileForm.role}</p>
                <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  ● Super Administrator Access
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={profileForm.role}
                  onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Organization / Entity
                </label>
                <input
                  type="text"
                  value={profileForm.company}
                  onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={profileForm.avatar}
                  onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Timezone
                </label>
                <input
                  type="text"
                  value={profileForm.timezone}
                  onChange={(e) => setProfileForm({ ...profileForm, timezone: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/20 transition-all active:scale-95"
              >
                <Save className="w-4 h-4" />
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 2: Appearance & Theme Settings */}
      {activeTab === 'appearance' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card space-y-6">
          {/* Theme Selection */}
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
              Theme Mode
            </h3>
            <div className="grid grid-cols-3 gap-3 max-w-md">
              <button
                type="button"
                onClick={() => updateSettings({ theme: 'light' })}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${settings.theme === 'light'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                <Sun className="w-5 h-5 text-amber-500" />
                <span className="text-xs">Light</span>
              </button>

              <button
                type="button"
                onClick={() => updateSettings({ theme: 'dark' })}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${settings.theme === 'dark'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                <Moon className="w-5 h-5 text-indigo-400" />
                <span className="text-xs">Dark</span>
              </button>

              <button
                type="button"
                onClick={() => updateSettings({ theme: 'system' })}
                className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-2 ${settings.theme === 'system'
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                <Laptop className="w-5 h-5 text-slate-500" />
                <span className="text-xs">System</span>
              </button>
            </div>
          </div>

          {/* Accent Color Palette */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-3">
              Accent Branding Color
            </h3>
            <div className="flex items-center gap-3">
              {[
                { id: 'indigo', name: 'Indigo Pulse', bg: 'bg-indigo-600' },
                { id: 'blue', name: 'Ocean Blue', bg: 'bg-blue-600' },
                { id: 'emerald', name: 'Emerald Growth', bg: 'bg-emerald-600' },
                { id: 'purple', name: 'Royal Purple', bg: 'bg-purple-600' },
                { id: 'amber', name: 'Solar Amber', bg: 'bg-amber-600' }
              ].map((color) => (
                <button
                  key={color.id}
                  onClick={() => updateSettings({ accentColor: color.id })}
                  className={`w-9 h-9 rounded-xl ${color.bg} transition-transform flex items-center justify-center ${settings.accentColor === color.id
                      ? 'ring-4 ring-slate-400 dark:ring-white scale-110'
                      : 'hover:scale-105 opacity-80 hover:opacity-100'
                    }`}
                  title={color.name}
                >
                  {settings.accentColor === color.id && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Functional Preferences */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-2">
              Behavioral Toggles
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.compactMode}
                onChange={(e) => updateSettings({ compactMode: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Compact table density (fits more rows per screen)
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showCelebrations}
                onChange={(e) => updateSettings({ showCelebrations: e.target.checked })}
                className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                Visual toasts and animation highlights on successful actions
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Tab 3: LocalStorage & Data Management */}
      {activeTab === 'data' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2">
              LocalStorage Database Overview
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              All employee rosters, departments, attendance checks, and leave requests persist directly within your browser's client storage.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="block text-[11px] text-slate-400 uppercase font-semibold">
                  Employees
                </span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {employees.length}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="block text-[11px] text-slate-400 uppercase font-semibold">
                  Departments
                </span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {departments.length}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="block text-[11px] text-slate-400 uppercase font-semibold">
                  Leave Entries
                </span>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {leaveRequests.length}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="block text-[11px] text-slate-400 uppercase font-semibold">
                  Storage Used
                </span>
                <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  ~{storageSize} KB
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={handleExportData}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all shadow-sm"
              >
                <Download className="w-4 h-4 text-indigo-500" />
                Export Full JSON Database
              </button>

              <button
                onClick={() => setIsResetConfirmOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-300 text-xs font-bold transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Reset Demo Data to Initial State
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={() => {
          resetDemoData();
          setIsResetConfirmOpen(false);
        }}
        title="Restore Default Demo Data?"
        message="This will overwrite all modifications you have made (added employees, edited records, approved leaves, etc.) and repopulate the factory seed database."
        confirmText="Yes, Reset Database"
        type="warning"
      />
    </div>
  );
};

