import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Calendar, Upload, X } from 'lucide-react';
import './CreateNotice.css';

const CreateNotice = ({ onBack }) => {
    const [formData, setFormData] = useState({
        target: '',
        department: '',
        noticeTitle: '',
        employeeId: '',
        employeeName: '',
        position: '',
        noticeTypes: [],
        publishDate: '',
        noticeBody: '',
        attachments: []
    });
    const [isNoticeTypeOpen, setIsNoticeTypeOpen] = useState(false);
    const multiSelectRef = useRef(null);

    const noticeTypeOptions = [
        'Warning / Disciplinary',
        'Performance Improvement',
        'Appreciation / Recognition',
        'Attendance / Leave Issue',
        'Payroll / Compensation',
        'Contract / Role Update',
        'Advisory / Personal Reminder'
    ];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (multiSelectRef.current && !multiSelectRef.current.contains(event.target)) {
                setIsNoticeTypeOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const toggleNoticeType = (type) => {
        setFormData(prev => ({
            ...prev,
            noticeTypes: prev.noticeTypes.includes(type)
                ? prev.noticeTypes.filter(t => t !== type)
                : [...prev.noticeTypes, type]
        }));
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            file: file
        }));
        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...newFiles]
        }));
    };

    const removeAttachment = (id) => {
        setFormData(prev => ({
            ...prev,
            attachments: prev.attachments.filter(att => att.id !== id)
        }));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        const newFiles = files.map(file => ({
            id: Date.now() + Math.random(),
            name: file.name,
            file: file
        }));
        setFormData(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...newFiles]
        }));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleCancel = () => {
        if (onBack) onBack();
    };

    const handleSaveDraft = () => {
        console.log('Saving as draft:', formData);
        // Add save draft logic
    };

    const handlePublish = () => {
        console.log('Publishing notice:', formData);
        // Add publish logic
    };

    return (
        <div className="create-notice-page">
            {/* Page Header */}
            <div className="page-header">
                <button className="back-button" onClick={handleCancel}>
                    <ArrowLeft size={20} />
                </button>
                <h1 className="page-title">Create a Notice</h1>
            </div>

            {/* Main Form Card */}
            <div className="form-card">
                {/* Target Selection */}
                <div className="form-section">
                    <label className="form-label">Target Department(s) or Individual *</label>
                    <select
                        className="form-select"
                        value={formData.target}
                        onChange={(e) => handleInputChange('target', e.target.value)}
                    >
                        <option value="">Select target</option>
                        <option value="individual">Individual</option>
                        <option value="department">Department</option>
                    </select>
                </div>

                {/* Department Selection - Conditional */}
                {formData.target === 'department' && (
                    <div className="form-section">
                        <label className="form-label">Select Department *</label>
                        <select
                            className="form-select"
                            value={formData.department}
                            onChange={(e) => handleInputChange('department', e.target.value)}
                        >
                            <option value="">Select department</option>
                            <option value="all">All Department</option>
                            <option value="finance">Finance</option>
                            <option value="sales">Sales Team</option>
                            <option value="web">Web Team</option>
                            <option value="database">Database Team</option>
                            <option value="admin">Admin</option>
                            <option value="individual">Individual</option>
                            <option value="hr">HR</option>
                        </select>
                    </div>
                )}

                {/* Notice Title */}
                <div className="form-section">
                    <label className="form-label">Notice Title *</label>
                    <input
                        type="text"
                        className="form-input"
                        placeholder="Write the Title of Notice"
                        value={formData.noticeTitle}
                        onChange={(e) => handleInputChange('noticeTitle', e.target.value)}
                    />
                </div>

                {/* Employee Information - Conditional 3-Column Grid */}
                {formData.target === 'individual' && (
                    <div className="form-section">
                        <div className="grid-3-columns">
                            <div className="form-field">
                                <label className="form-label">Employee ID</label>
                                <select
                                    className="form-select"
                                    value={formData.employeeId}
                                    onChange={(e) => handleInputChange('employeeId', e.target.value)}
                                >
                                    <option value="">Select employee ID</option>
                                    <option value="EMP001">EMP001</option>
                                    <option value="EMP002">EMP002</option>
                                </select>
                            </div>
                            <div className="form-field">
                                <label className="form-label">Employee Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter employee full name"
                                    value={formData.employeeName}
                                    onChange={(e) => handleInputChange('employeeName', e.target.value)}
                                />
                            </div>
                            <div className="form-field">
                                <label className="form-label">Position</label>
                                <select
                                    className="form-select"
                                    value={formData.position}
                                    onChange={(e) => handleInputChange('position', e.target.value)}
                                >
                                    <option value="">Select employee department</option>
                                    <option value="IT">IT Department</option>
                                    <option value="HR">HR Department</option>
                                    <option value="Sales">Sales Department</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notice Meta - 2-Column Grid */}
                <div className="form-section">
                    <div className="grid-2-columns">
                        <div className="form-field">
                            <label className="form-label">Notice Type</label>
                            <div className="multi-select-container" ref={multiSelectRef}>
                                <button
                                    type="button"
                                    className="multi-select-trigger"
                                    onClick={() => setIsNoticeTypeOpen(!isNoticeTypeOpen)}
                                >
                                    <span className="multi-select-placeholder">
                                        {formData.noticeTypes.length > 0
                                            ? `${formData.noticeTypes.length} selected`
                                            : 'Select notice type'}
                                    </span>
                                    <svg
                                        className={`multi-select-arrow ${isNoticeTypeOpen ? 'open' : ''}`}
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                    >
                                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                                {isNoticeTypeOpen && (
                                    <div className="multi-select-dropdown">
                                        {noticeTypeOptions.map((option) => (
                                            <label key={option} className="multi-select-option">
                                                <input
                                                    type="checkbox"
                                                    className="multi-select-checkbox"
                                                    checked={formData.noticeTypes.includes(option)}
                                                    onChange={() => toggleNoticeType(option)}
                                                />
                                                <span className="multi-select-label">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-field">
                            <label className="form-label">Publish Date</label>
                            <div className="date-input-wrapper">
                                <input
                                    type="date"
                                    className="form-input date-input"
                                    value={formData.publishDate}
                                    onChange={(e) => handleInputChange('publishDate', e.target.value)}
                                    style={{ colorScheme: 'light' }}
                                />
                                {!formData.publishDate && (
                                    <span className="date-placeholder">Select Publishing Date</span>
                                )}
                                <Calendar size={18} className="calendar-icon-input" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notice Body */}
                <div className="form-section">
                    <label className="form-label">Notice Body</label>
                    <textarea
                        className="form-textarea"
                        placeholder="Write the details about notice"
                        value={formData.noticeBody}
                        onChange={(e) => handleInputChange('noticeBody', e.target.value)}
                    />
                </div>

                {/* Attachment Upload */}
                <div className="form-section">
                    <label className="form-label">Attachment</label>
                    <div
                        className="upload-zone"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() => document.getElementById('file-input').click()}
                    >
                        <Upload size={40} className="upload-icon" />
                        <div className="upload-text">
                            <p className="upload-main-text">Upload nominee profile image or drag and drop</p>
                            <p className="upload-sub-text">Accepted File Type: jpg, png, pdf</p>
                        </div>
                        <input
                            id="file-input"
                            type="file"
                            multiple
                            accept=".jpg,.png,.pdf"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                        />
                    </div>

                    {/* Uploaded Files */}
                    {formData.attachments.length > 0 && (
                        <div className="uploaded-files">
                            {formData.attachments.map((attachment) => (
                                <div key={attachment.id} className="file-chip">
                                    <span className="file-name">{attachment.name}</span>
                                    <button
                                        className="remove-file-btn"
                                        onClick={() => removeAttachment(attachment.id)}
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="form-footer">
                    <button className="btn-cancel" onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className="btn-draft" onClick={handleSaveDraft}>
                        Save as Draft
                    </button>
                    <button className="btn-publish" onClick={handlePublish}>
                        Publish Notice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNotice;
