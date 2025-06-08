import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Shield, Send, AlertTriangle, Bug, Lock } from 'lucide-react';

const VulnerabilityReportForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Vulnerability title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

  };

  if (Object.keys(errors).length === 0) {
    console.log('Report Form Loaded Successfully');
    } else {
    console.error('Report Form Errors:', errors);
    }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Vulnerability Report Submitted:', {
        timestamp: new Date().toISOString(),
        title: formData.title,
        description: formData.description,
        descriptionLength: formData.description.length,
      });

      setFormData({ title: '', description: '' });
      setErrors({});
    } catch (error) {
      alert('Error submitting report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, title: value }));

    if (errors.title && value.trim()) {
      setErrors(prev => ({ ...prev, title: undefined }));
    }
  };

  const handleDescriptionChange = (value) => {
    const newValue = value || '';
    setFormData(prev => ({ ...prev, description: newValue }));

    if (errors.description && newValue.trim()) {
      setErrors(prev => ({ ...prev, description: undefined }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
        <div className="px-6 py-4 border-b border-gray-600">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-500 rounded-md">
              <Bug size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white">
                Vulnerability Report Submission
              </h1>
              <p className="text-sm text-gray-400">
                Report security vulnerabilities with detailed documentation
              </p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-red-900/30 border border-red-700 rounded-md">
              <Lock size={12} className="text-red-400" />
              <span className="text-xs text-red-300 font-medium">Confidential</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-200 mb-2">
                Vulnerability Title <span className="text-red-400">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="e.g., SQL Injection in User Authentication"
                value={formData.title}
                onChange={handleTitleChange}
                className={`w-full px-4 py-3 bg-gray-700 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 ${
                  errors.title ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                }`}
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <XCircle size={14} />
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-200 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <p className="text-sm text-gray-400 mb-2">
                Provide a detailed description using Markdown. Include steps to reproduce, impact assessment, and remediation suggestions.
              </p>
              <div
                className={`border rounded-md overflow-hidden ${
                  errors.description ? 'border-red-500' : 'border-gray-600'
                }`}
              >
                <MDEditor
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  preview="edit"
                  height={300}
                  data-color-mode="dark"
                  style={{ backgroundColor: 'rgb(55, 65, 81)' }}
                />
              </div>
              {errors.description && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <XCircle size={14} />
                  {errors.description}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 disabled:bg-blue-800 text-white font-medium rounded-md transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting Report...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Report
                  </>
                )}
              </button>
            </div>

            <div className="bg-gray-700 p-4 rounded-md border border-gray-600">
              <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                📋 Report Guidelines
              </h3>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Provide clear, reproducible steps</li>
                <li>• Include impact assessment and severity level</li>
                <li>• Suggest remediation steps when possible</li>
                <li>• Use screenshots, code snippets, or proof-of-concept when relevant</li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VulnerabilityReportForm;
