import React, { useState, useEffect } from 'react';
import {
  Users,
  UserCheck,
  Building2,
  CalendarCheck,
  TrendingUp,
  Clock,
  Plus,
  ArrowRight,
  ShieldAlert,
  Calendar,
  Briefcase,
  ChevronRight,
  Sparkles,
  Palette,
  Moon,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const DASHBOARD_COLOR_PALETTES = {
  moonlight: {
    id: 'moonlight',
    name: 'MoonLight Nebula',
    banner: 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-cyan-500/30 shadow-2xl shadow-indigo-950/60',
    bannerBadge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    primaryBtn: 'bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/25',
    secondaryBtn: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
    accentText: 'text-cyan-400',
    card1Top: 'border-t-4 border-t-cyan-500',
    card2Top: 'border-t-4 border-t-emerald-500',
    card3Top: 'border-t-4 border-t-purple-500',
    card4Top: 'border-t-4 border-t-amber-500',
    orb1: 'bg-cyan-500/20',
    orb2: 'bg-indigo-500/30',
    ringColor: 'border-cyan-500',
    progressDefault: 'bg-gradient-to-r from-cyan-500 to-indigo-600'
  },
  sapphire: {
    id: 'sapphire',
    name: 'Oceanic Sapphire',
    banner: 'bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border border-blue-500/30 shadow-2xl shadow-blue-950/60',
    bannerBadge: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
    primaryBtn: 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/25',
    secondaryBtn: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
    accentText: 'text-blue-400',
    card1Top: 'border-t-4 border-t-blue-500',
    card2Top: 'border-t-4 border-t-teal-500',
    card3Top: 'border-t-4 border-t-indigo-500',
    card4Top: 'border-t-4 border-t-sky-500',
    orb1: 'bg-blue-500/20',
    orb2: 'bg-sky-500/20',
    ringColor: 'border-blue-500',
    progressDefault: 'bg-gradient-to-r from-blue-500 to-indigo-600'
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Oasis',
    banner: 'bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 border border-emerald-500/30 shadow-2xl shadow-emerald-950/60',
    bannerBadge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    primaryBtn: 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-500/25',
    secondaryBtn: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
    accentText: 'text-emerald-400',
    card1Top: 'border-t-4 border-t-emerald-500',
    card2Top: 'border-t-4 border-t-teal-500',
    card3Top: 'border-t-4 border-t-cyan-500',
    card4Top: 'border-t-4 border-t-amber-500',
    orb1: 'bg-emerald-500/20',
    orb2: 'bg-teal-500/20',
    ringColor: 'border-emerald-500',
    progressDefault: 'bg-gradient-to-r from-emerald-500 to-teal-500'
  },
  amethyst: {
    id: 'amethyst',
    name: 'Cosmic Violet',
    banner: 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 border border-purple-500/30 shadow-2xl shadow-purple-950/60',
    bannerBadge: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    primaryBtn: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white shadow-lg shadow-purple-500/25',
    secondaryBtn: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
    accentText: 'text-purple-400',
    card1Top: 'border-t-4 border-t-purple-500',
    card2Top: 'border-t-4 border-t-pink-500',
    card3Top: 'border-t-4 border-t-indigo-500',
    card4Top: 'border-t-4 border-t-rose-500',
    orb1: 'bg-purple-500/20',
    orb2: 'bg-pink-500/20',
    ringColor: 'border-purple-500',
    progressDefault: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Ember',
    banner: 'bg-gradient-to-br from-slate-950 via-rose-950 to-amber-950 border border-rose-500/30 shadow-2xl shadow-rose-950/60',
    bannerBadge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    primaryBtn: 'bg-gradient-to-r from-rose-500 to-amber-600 hover:from-rose-400 hover:to-amber-500 text-white shadow-lg shadow-rose-500/25',
    secondaryBtn: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
    accentText: 'text-rose-400',
    card1Top: 'border-t-4 border-t-rose-500',
    card2Top: 'border-t-4 border-t-amber-500',
    card3Top: 'border-t-4 border-t-orange-500',
    card4Top: 'border-t-4 border-t-red-500',
    orb1: 'bg-rose-500/20',
    orb2: 'bg-amber-500/20',
    ringColor: 'border-rose-500',
    progressDefault: 'bg-gradient-to-r from-rose-500 to-amber-500'
  }
};

export const Dashboard = ({
  setActiveTab,
  onOpenAddEmployee,
  onOpenLeaveModal,
  onOpenAttendanceModal
}) => {
  const { employees, departments, leaveRequests, attendance, activities } = useApp();

  // Active Dashboard Palette with LocalStorage Persistence
  const [activePalette, setActivePalette] = useState(() => {
    try {
      const saved = localStorage.getItem('moonlight_dashboard_palette');
      return saved && DASHBOARD_COLOR_PALETTES[saved] ? saved : 'moonlight';
    } catch {
      return 'moonlight';
    }
  });

  const [showPaletteMenu, setShowPaletteMenu] = useState(false);

  const theme = DASHBOARD_COLOR_PALETTES[activePalette] || DASHBOARD_COLOR_PALETTES.moonlight;

  const handleSelectPalette = (key) => {
    setActivePalette(key);
    try {
      localStorage.setItem('moonlight_dashboard_palette', key);
    } catch (e) {
      console.error(e);
    }
  };

  // Metrics Calculations
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'Active').length;
  const onLeaveEmployees = employees.filter((e) => e.status === 'On Leave').length;
  const probationEmployees = employees.filter((e) => e.status === 'Probation').length;
  const inactiveEmployees = employees.filter((e) => e.status === 'Inactive').length;

  const totalDepartments = departments.length;

  const pendingLeaves = leaveRequests.filter((l) => l.status === 'Pending').length;
  const approvedLeaves = leaveRequests.filter((l) => l.status === 'Approved').length;
  const rejectedLeaves = leaveRequests.filter((l) => l.status === 'Rejected').length;

  // Attendance metrics for today
  const todayRecords = attendance;
  const presentCount = todayRecords.filter((a) => a.status === 'Present').length;
  const lateCount = todayRecords.filter((a) => a.status === 'Late').length;
  const absentCount = todayRecords.filter((a) => a.status === 'Absent').length;
  const attendanceRate = totalEmployees > 0
    ? Math.round(((presentCount + lateCount) / totalEmployees) * 100)
    : 100;

  // Department counts with unique gradient colors
  const departmentBreakdown = departments.map((dept) => {
    const count = employees.filter((e) => e.department === dept.name).length;
    const percentage = totalEmployees > 0 ? Math.round((count / totalEmployees) * 100) : 0;

    let barGradient = 'from-indigo-500 to-cyan-500';
    if (dept.name.includes('Product') || dept.name.includes('Design')) {
      barGradient = 'from-purple-500 to-pink-500';
    } else if (dept.name.includes('Human Resources')) {
      barGradient = 'from-emerald-500 to-teal-400';
    } else if (dept.name.includes('Marketing')) {
      barGradient = 'from-amber-500 to-orange-500';
    } else if (dept.name.includes('Finance')) {
      barGradient = 'from-blue-500 to-indigo-500';
    } else if (dept.name.includes('Customer')) {
      barGradient = 'from-rose-500 to-pink-500';
    }

    return { ...dept, count, percentage, barGradient };
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome Greetings */}
      <div className={`relative overflow-hidden rounded-3xl ${theme.banner} text-white p-6 sm:p-8 transition-all duration-500`}>
        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${theme.bannerBadge} backdrop-blur-md text-xs font-semibold uppercase tracking-wider border`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-subtle-pulse" />
              MoonLight Core Engine Active
            </div>

            {/* Dashboard Color Theme Selector Pill */}
            <div className="relative">
              <button
                onClick={() => setShowPaletteMenu(!showPaletteMenu)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-medium text-slate-200 border border-white/20 transition-colors"
                title="Change Dashboard Palette"
              >
                <Palette className="w-3 h-3 text-cyan-300" />
                <span>Color: {theme.name}</span>
              </button>

              {/* Theme Dropdown */}
              {showPaletteMenu && (
                <div className="absolute left-0 top-full mt-2 w-52 bg-slate-900/95 backdrop-blur-md rounded-2xl p-2 border border-slate-700 shadow-2xl z-30 animate-in fade-in zoom-in-95">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
                    Select Dashboard Palette
                  </div>
                  {Object.values(DASHBOARD_COLOR_PALETTES).map((pal) => (
                    <button
                      key={pal.id}
                      onClick={() => {
                        handleSelectPalette(pal.id);
                        setShowPaletteMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                        activePalette === pal.id
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${
                          pal.id === 'moonlight' ? 'bg-cyan-400' :
                          pal.id === 'sapphire' ? 'bg-blue-400' :
                          pal.id === 'emerald' ? 'bg-emerald-400' :
                          pal.id === 'amethyst' ? 'bg-purple-400' : 'bg-rose-400'
                        }`} />
                        <span>{pal.name}</span>
                      </div>
                      {activePalette === pal.id && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit']">
            Workforce Command Center
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-200/90 leading-relaxed">
            Monitor real-time headcount, track organizational department capacity, oversee leave requests, and audit employee attendance workflows.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={onOpenAddEmployee}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${theme.primaryBtn}`}
            >
              <Plus className="w-4 h-4" />
              Add Employee
            </button>
            <button
              onClick={onOpenLeaveModal}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold backdrop-blur-sm transition-all ${theme.secondaryBtn}`}
            >
              <CalendarCheck className="w-4 h-4" />
              Apply Leave
            </button>
            <button
              onClick={() => setActiveTab('employees')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all"
            >
              Browse Directory
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ambient Glowing Orbs */}
        <div className={`absolute -right-12 -bottom-12 w-72 h-72 ${theme.orb1} rounded-full blur-3xl pointer-events-none transition-all duration-700`} />
        <div className={`absolute right-32 -top-12 w-56 h-56 ${theme.orb2} rounded-full blur-2xl pointer-events-none transition-all duration-700`} />
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Total Employees */}
        <div className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all group ${theme.card1Top}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Employees
            </span>
            <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {totalEmployees}
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              +12% vs last mo
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <span>{activeEmployees} active</span> • <span>{onLeaveEmployees} on leave</span>
          </p>
        </div>

        {/* Metric 2: Active Employees */}
        <div className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all group ${theme.card2Top}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Workforce
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {activeEmployees}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({totalEmployees > 0 ? Math.round((activeEmployees / totalEmployees) * 100) : 0}% capacity)
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {probationEmployees} on probation • {inactiveEmployees} inactive
          </p>
        </div>

        {/* Metric 3: Departments */}
        <div className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all group ${theme.card3Top}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Departments
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {totalDepartments}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Operational teams
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Avg {totalDepartments > 0 ? (totalEmployees / totalDepartments).toFixed(1) : 0} members per department
          </div>
        </div>

        {/* Metric 4: Leave Requests */}
        <div className={`bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-card hover:shadow-card-hover transition-all group ${theme.card4Top}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Leave Requests
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-['Outfit']">
              {pendingLeaves}
            </span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              Pending review
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {approvedLeaves} approved • {rejectedLeaves} rejected
          </p>
        </div>
      </div>

      {/* Middle Row: Department Breakdown & Today's Attendance Snapshot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Distribution (2 cols on desktop) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                Department Distribution & Staffing
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Headcount allocated across operational departments
              </p>
            </div>
            <button
              onClick={() => setActiveTab('departments')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1"
            >
              Manage Teams <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {departmentBreakdown.map((dept) => (
              <div key={dept.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {dept.name}
                    </span>
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">
                      {dept.code}
                    </span>
                  </div>
                  <div className="text-slate-500 dark:text-slate-400 font-medium">
                    <span className="text-slate-900 dark:text-white font-bold">
                      {dept.count}
                    </span>{' '}
                    employees ({dept.percentage}%)
                  </div>
                </div>

                {/* Multi-Colored Visual Progress Bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${dept.barGradient} h-2.5 rounded-full transition-all duration-500 shadow-xs`}
                    style={{ width: `${Math.max(dept.percentage, 5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Attendance Snapshot */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                Today's Attendance Rate
              </h3>
              <Clock className="w-5 h-5 text-indigo-500" />
            </div>

            {/* Glowing Radial visual representation */}
            <div className="my-6 text-center">
              <div className="inline-flex items-center justify-center w-28 h-28 rounded-full border-8 border-indigo-600/20 dark:border-cyan-500/20 relative shadow-inner">
                <div className="text-center">
                  <span className="text-3xl font-extrabold text-indigo-600 dark:text-cyan-400 font-['Outfit']">
                    {attendanceRate}%
                  </span>
                  <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Present
                  </span>
                </div>
              </div>
            </div>

            {/* Quick summary grid */}
            <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/30">
                <span className="block text-lg font-bold text-emerald-700 dark:text-emerald-400">
                  {presentCount}
                </span>
                <span className="text-[11px] font-medium text-emerald-600/80 dark:text-emerald-400/80">
                  On Time
                </span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30">
                <span className="block text-lg font-bold text-amber-700 dark:text-amber-400">
                  {lateCount}
                </span>
                <span className="text-[11px] font-medium text-amber-600/80 dark:text-amber-400/80">
                  Late
                </span>
              </div>
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/30">
                <span className="block text-lg font-bold text-rose-700 dark:text-rose-400">
                  {absentCount}
                </span>
                <span className="text-[11px] font-medium text-rose-600/80 dark:text-rose-400/80">
                  Absent
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('attendance')}
            className="mt-6 w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Full Attendance Sheet <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Row: Pending Leave Approvals & Recent Audit Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Leave Requests */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
                Leaves Awaiting Decision
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('leaves')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View All ({leaveRequests.length})
            </button>
          </div>

          <div className="space-y-3">
            {leaveRequests
              .filter((l) => l.status === 'Pending')
              .slice(0, 3)
              .map((leave) => (
                <div
                  key={leave.id}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 transition-all flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={leave.employeeAvatar}
                      alt={leave.employeeName}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-slate-900 dark:text-white truncate">
                        {leave.employeeName}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {leave.type} • {leave.days} {leave.days > 1 ? 'days' : 'day'} ({leave.startDate})
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setActiveTab('leaves')}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}

            {pendingLeaves === 0 && (
              <div className="text-center py-8 text-slate-400 text-sm">
                🎉 All leave requests have been reviewed and decided!
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Outfit']">
              Audit & Activity Stream
            </h3>
            <span className="text-xs text-slate-400 font-medium">Auto-recorded</span>
          </div>

          <div className="space-y-3.5">
            {activities.slice(0, 4).map((item) => (
              <div key={item.id} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                <div className="flex-1 text-slate-600 dark:text-slate-300">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {item.user}
                  </span>{' '}
                  {item.action}{' '}
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                    {item.target}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
