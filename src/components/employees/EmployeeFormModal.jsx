import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  HeartHandshake,
  Image,
  AlertCircle
} from 'lucide-react';

export const EmployeeFormModal = ({
  isOpen,
  onClose,
  employeeToEdit = null,
  onSuccess
}) => {
  const { departments, addEmployee, updateEmployee } = useApp();

  const isEditMode = Boolean(employeeToEdit);

  const initialForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: '',
    department: departments[0]?.name || 'Engineering',
    status: 'Active',
    type: 'Full-time',
    joinDate: new Date().toISOString().split('T')[0],
    salary: 85000,
    location: 'San Francisco, CA',
    avatar: '',
    skills: 'React, TypeScript, Problem Solving',
    bio: '',
    emergencyName: '',
    emergencyRelationship: 'Spouse',
    emergencyPhone: ''
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        firstName: employeeToEdit.firstName || '',
        lastName: employeeToEdit.lastName || '',
        email: employeeToEdit.email || '',
        phone: employeeToEdit.phone || '',
        role: employeeToEdit.role || '',
        department: employeeToEdit.department || departments[0]?.name || 'Engineering',
        status: employeeToEdit.status || 'Active',
        type: employeeToEdit.type || 'Full-time',
        joinDate: employeeToEdit.joinDate || new Date().toISOString().split('T')[0],
        salary: employeeToEdit.salary || 85000,
        location: employeeToEdit.location || 'San Francisco, CA',
        avatar: employeeToEdit.avatar || '',
        skills: Array.isArray(employeeToEdit.skills)
          ? employeeToEdit.skills.join(', ')
          : employeeToEdit.skills || '',
        bio: employeeToEdit.bio || '',
        emergencyName: employeeToEdit.emergencyContact?.name || '',
        emergencyRelationship: employeeToEdit.emergencyContact?.relationship || 'Spouse',
        emergencyPhone: employeeToEdit.emergencyContact?.phone || ''
      });
    } else {
      setFormData(initialForm);
    }
    setErrors({});
    setTouched({});
  }, [employeeToEdit, isOpen]);

  // Comprehensive validation function
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
        if (!value.trim()) error = 'First name is required';
        else if (value.trim().length < 2) error = 'Minimum 2 characters';
        break;
      case 'lastName':
        if (!value.trim()) error = 'Last name is required';
        else if (value.trim().length < 2) error = 'Minimum 2 characters';
        break;
      case 'email':
        if (!value.trim()) error = 'Corporate email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'phone':
        if (!value.trim()) error = 'Phone number is required';
        else if (value.trim().length < 7) error = 'Please enter a valid phone number';
        break;
      case 'role':
        if (!value.trim()) error = 'Job role / designation is required';
        break;
      case 'salary':
        if (!value && value !== 0) error = 'Salary is required';
        else if (Number(value) <= 0) error = 'Salary must be greater than 0';
        break;
      case 'joinDate':
        if (!value) error = 'Hire date is required';
        break;
      case 'emergencyName':
        if (!value.trim()) error = 'Emergency contact name is required';
        break;
      case 'emergencyPhone':
        if (!value.trim()) error = 'Emergency phone is required';
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const err = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  const validateAll = () => {
    const newErrors = {};
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'role',
      'salary',
      'joinDate',
      'emergencyName',
      'emergencyPhone'
    ];

    requiredFields.forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    // Mark all as touched
    const allTouched = {};
    requiredFields.forEach((k) => (allTouched[k] = true));
    setTouched(allTouched);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      role: formData.role.trim(),
      department: formData.department,
      status: formData.status,
      type: formData.type,
      joinDate: formData.joinDate,
      salary: Number(formData.salary),
      location: formData.location.trim(),
      avatar: formData.avatar.trim(),
      skills: formData.skills,
      bio: formData.bio.trim(),
      emergencyContact: {
        name: formData.emergencyName.trim(),
        relationship: formData.emergencyRelationship,
        phone: formData.emergencyPhone.trim()
      }
    };

    if (isEditMode) {
      updateEmployee(employeeToEdit.id, payload);
    } else {
      addEmployee(payload);
    }

    if (onSuccess) onSuccess();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? `Edit Employee (${employeeToEdit.id})` : 'Register New Employee'}
      subtitle={
        isEditMode
          ? 'Update credentials, job assignment, and compensation.'
          : 'Complete the form below to add a team member into localStorage database.'
      }
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Info */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> Personal Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Elena"
                className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.firstName
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Vance"
                className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.lastName
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.lastName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Corporate Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="name@moonlight.io"
                className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+1 (555) 000-0000"
                className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Position & Department */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" /> Role & Organizational Assignment
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Job Title / Designation *
              </label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g. Senior Frontend Engineer"
                className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.role
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.role && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.role}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Employment Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Probation">Probation</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Employment Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Intern">Intern</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Hire / Join Date *
              </label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Annual Salary ($ USD) *
              </label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                onBlur={handleBlur}
                step="1000"
                min="10000"
                placeholder="85000"
                className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.salary
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.salary && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.salary}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Profile Details & Location */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" /> Location, Avatar & Skills
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Office / Work Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. San Francisco, CA or Remote"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Avatar Image URL (Optional)
              </label>
              <input
                type="url"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Key Skills (Comma separated)
              </label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, Cloud, SQL, Problem Solving"
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Emergency Contact */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5" /> Emergency Contact
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contact Name *
              </label>
              <input
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Full Name"
                className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.emergencyName
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.emergencyName && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.emergencyName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Relationship
              </label>
              <select
                name="emergencyRelationship"
                value={formData.emergencyRelationship}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Spouse">Spouse</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Partner">Partner</option>
                <option value="Friend">Friend</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Contact Phone *
              </label>
              <input
                type="tel"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+1 (555) 000-0000"
                className={`w-full px-3.5 py-2 rounded-xl text-sm border bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 ${
                  errors.emergencyPhone
                    ? 'border-rose-400 focus:ring-rose-400/20'
                    : 'border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.emergencyPhone && (
                <p className="mt-1 text-xs text-rose-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.emergencyPhone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-600/25 transition-all hover:shadow-indigo-600/40 active:scale-95"
          >
            {isEditMode ? 'Update Employee' : 'Create Record'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

