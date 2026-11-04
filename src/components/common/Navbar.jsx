import React, { useState, useRef, useEffect } from 'react';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  Settings,
  RotateCcw,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar = ({
  activeTab,
  setActiveTab,
  onOpenMobileSidebar,
  onSelectEmployee
}) => {
  const {
    adminProfile,
    settings,
    updateSettings,
    activities,
    employees,
    resetDemoData
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter employees for global search
  const filteredSearchEmployees = searchQuery.trim()
    ? employees.filter(
        (emp) =>
          `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: nextTheme });
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return { title: 'Executive Overview', subtitle: 'Live performance metrics & HR diagnostics' };
      case 'employees':
        return { title: 'Employee Directory', subtitle: 'Search, filter, and manage staff credentials' };
      case 'departments':
        return { title: 'Department Directory', subtitle: 'Team structures, heads, and operational budgets' };
      case 'leaves':
        return { title: 'Leave Management', subtitle: 'Review, approve, or reject employee time-off requests' };
      case 'attendance':
        return { title: 'Attendance Analytics', subtitle: 'Track daily punctuality, shifts, and check-in logs' };
      case 'settings':
        return { title: 'System & Admin Settings', subtitle: 'Configure preferences, admin profile, and data' };
      default:
        return { title: 'Employee Management', subtitle: 'Internal workforce portal' };
    }
  };

  const { title, subtitle } = getPageTitle();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 h-16">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Side: Mobile toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open navigation sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight font-['Outfit']">
              {title}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Center: Global Instant Search */}
        <div className="flex-1 max-w-md relative" ref={searchRef}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search employee, email, role, or team..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 border border-transparent focus:border-indigo-500/50 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>

          {/* Search Dropdown Results */}
          {showSearchResults && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in-50 zoom-in-95">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Employees Matching "{searchQuery}"
              </div>
              {filteredSearchEmployees.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                  {filteredSearchEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      onClick={() => {
                        onSelectEmployee(emp.id);
                        setActiveTab('employees');
                        setShowSearchResults(false);
                        setSearchQuery('');
                      }}
                      className="p-3 flex items-center gap-3 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 cursor-pointer transition-colors"
                    >
                      <img
                        src={emp.avatar}
                        alt={emp.firstName}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {emp.firstName} {emp.lastName}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {emp.role} • {emp.department}
                        </div>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {emp.id}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-sm text-slate-500 dark:text-slate-400">
                  No employee matched your search query.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Theme Toggle, Notifications, Admin Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Dark/Light Mode Switcher */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={settings.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle color theme"
          >
            {settings.theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          {/* Activity / Notification Feed */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              title="Recent Notifications & Activity"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white dark:ring-slate-900" />
            </button>

            {/* Notification Popover */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in zoom-in-95">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Live Audit Feed
                    </span>
                  </div>
                  <span className="text-xs bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full font-medium">
                    {activities.length} Events
                  </span>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto">
                  {activities.map((act) => (
                    <div
                      key={act.id}
                      className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors text-xs"
                    >
                      <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {act.user}
                        </span>
                        <span className="flex items-center gap-1 text-[11px]">
                          <Clock className="w-3 h-3" />
                          {act.time}
                        </span>
                      </div>
                      <div className="text-slate-800 dark:text-slate-200 leading-snug">
                        {act.action}{' '}
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">
                          {act.target}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setShowNotifications(false);
                    }}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View Comprehensive Dashboard Feed →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 pl-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <img
                src={adminProfile.avatar}
                alt={adminProfile.name}
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
              />
              <span className="hidden md:block text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                {adminProfile.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 z-50 animate-in fade-in zoom-in-95">
                <div className="p-3 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <div className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                    {adminProfile.name}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-500 truncate">
                    {adminProfile.email}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  Edit Admin Profile
                </button>

                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  Preferences & Themes
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                <button
                  onClick={() => {
                    if (window.confirm('Reset all localStorage demo data back to default?')) {
                      resetDemoData();
                    }
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Demo Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

