import React from 'react';
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarCheck,
  Clock,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const { leaveRequests, employees, adminProfile } = useApp();

  const pendingLeavesCount = leaveRequests.filter((l) => l.status === 'Pending').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'employees',
      label: 'Employee Directory',
      icon: Users,
      badge: employees.length
    },
    {
      id: 'departments',
      label: 'Departments',
      icon: Building2,
      badge: null
    },
    {
      id: 'leaves',
      label: 'Leave Requests',
      icon: CalendarCheck,
      badge: pendingLeavesCount > 0 ? pendingLeavesCount : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'attendance',
      label: 'Attendance Summary',
      icon: Clock,
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-20' : 'lg:w-64'} w-64`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 shrink-0">
              <Sparkles className="w-5 h-5 animate-subtle-pulse" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-lg leading-tight tracking-tight text-slate-900 dark:text-white font-['Outfit']">
                  Moon<span className="text-indigo-600 dark:text-indigo-400">Light</span>
                </span>
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 tracking-wider uppercase">
                  Enterprise HRM
                </span>
              </div>
            )}
          </div>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Main Menu
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 transition-transform group-hover:scale-105 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                  }`}
                />

                {!isCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}

                {!isCollapsed && item.badge !== null && (
                  <span
                    className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                      item.badgeColor ||
                      'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Pill indicator on left when active */}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-600 dark:bg-indigo-400 rounded-r-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Admin profile snippet at footer */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <div
            onClick={() => handleNavClick('settings')}
            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 cursor-pointer transition-colors ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <div className="relative">
              <img
                src={adminProfile.avatar}
                alt={adminProfile.name}
                className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500/20"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>

            {!isCollapsed && (
              <div className="flex-1 truncate">
                <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  {adminProfile.name}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 truncate">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate">{adminProfile.role}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

