import React, { useState } from 'react';
import { FileText, Calendar, Eye, Edit, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import './NoticeManagement.css';

const NoticeManagement = () => {
    const activeNotices = 8;
    const draftNotices = 4;

    // Filter states
    const [filterType, setFilterType] = useState('');
    const [filterSearch, setFilterSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterDate, setFilterDate] = useState('');
    const [selectedNotices, setSelectedNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    // Sample data
    const notices = [
        {
            id: 1,
            title: 'Annual Company Meeting 2024',
            noticeType: 'General',
            target: 'All Employees',
            publishedOn: '2024-01-15',
            status: 'Published'
        },
        {
            id: 2,
            title: 'IT Department System Maintenance',
            noticeType: 'Department',
            target: 'IT Department',
            publishedOn: '2024-01-20',
            status: 'Published'
        },
        {
            id: 3,
            title: 'New Policy Update - Remote Work',
            noticeType: 'Policy',
            target: 'All Employees',
            publishedOn: '',
            status: 'Draft'
        },
        {
            id: 4,
            title: 'HR Benefits Program 2024',
            noticeType: 'HR',
            target: 'All Employees',
            publishedOn: '2024-01-10',
            status: 'Unpublished'
        },
        {
            id: 5,
            title: 'Team Building Event Notice',
            noticeType: 'Event',
            target: 'Marketing Department',
            publishedOn: '2024-01-25',
            status: 'Published'
        },
        {
            id: 6,
            title: 'Security Protocol Update',
            noticeType: 'Security',
            target: 'All Employees',
            publishedOn: '2024-01-18',
            status: 'Published'
        },
        {
            id: 7,
            title: 'Quarterly Performance Review',
            noticeType: 'HR',
            target: 'Sales Department',
            publishedOn: '',
            status: 'Draft'
        },
        {
            id: 8,
            title: 'Holiday Schedule 2024',
            noticeType: 'General',
            target: 'All Employees',
            publishedOn: '2024-01-12',
            status: 'Unpublished'
        }
    ];

    const handleResetFilters = () => {
        setFilterType('');
        setFilterSearch('');
        setFilterStatus('');
        setFilterDate('');
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedNotices(notices.map(n => n.id));
        } else {
            setSelectedNotices([]);
        }
    };

    const handleSelectNotice = (id) => {
        if (selectedNotices.includes(id)) {
            setSelectedNotices(selectedNotices.filter(nId => nId !== id));
        } else {
            setSelectedNotices([...selectedNotices, id]);
        }
    };

    return (
        <div className="notice-management-wrapper">
            <div className="notice-management">
                {/* Left Side - Title and Stats */}
                <div className="notice-left">
                    <h1 className="notice-title">Notice Management</h1>
                    <div className="notice-stats">
                        <span className="stat-item stat-active">
                            Active Notices : <span className="stat-value">{activeNotices}</span>
                        </span>
                        <span className="stat-separator">|</span>
                        <span className="stat-item stat-draft">
                            Draft Notice : <span className="stat-value">{String(draftNotices).padStart(2, '0')}</span>
                        </span>
                    </div>
                </div>

                {/* Right Side - Action Buttons */}
                <div className="notice-right">
                    <button className="btn-create-notice">
                        <span className="btn-icon">+</span>
                        Create Notice
                    </button>
                    <button className="btn-draft-notice">
                        <FileText size={20} className="draft-icon" />
                        All Draft Notice
                    </button>
                </div>
            </div>

            {/* Filter Section */}
            <div className="notice-filter">
                <span className="filter-label">Filter By:</span>
                <div className="filter-controls">
                    <select
                        className="filter-dropdown filter-type"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="">Department or Individual</option>
                        <option value="department">Department</option>
                        <option value="individual">Individual</option>
                    </select>

                    <input
                        type="text"
                        className="filter-textbox"
                        placeholder="Employee ID or Name"
                        value={filterSearch}
                        onChange={(e) => setFilterSearch(e.target.value)}
                    />

                    <select
                        className="filter-dropdown filter-status"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="">Status</option>
                        <option value="publish">Published</option>
                        <option value="unpublished">Unpublished</option>
                        <option value="draft">Draft</option>
                    </select>

                    <div className="filter-date-wrapper">
                        <span className="filter-date-label">Published On</span>
                        <Calendar size={16} className="calendar-icon" />
                        <input
                            type="date"
                            className="filter-date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                        />
                    </div>

                    <button
                        className="btn-reset-filter"
                        onClick={handleResetFilters}
                    >
                        Reset Filters
                    </button>
                </div>
            </div>

            {/* Employee List Table */}
            <div className="employee-list-container">
                <div className="employee-list-table">
                    {/* Table Header */}
                    <div className="table-header">
                        <div className="table-cell cell-checkbox">
                            <input
                                type="checkbox"
                                className="table-checkbox"
                                checked={selectedNotices.length === notices.length}
                                onChange={handleSelectAll}
                            />
                        </div>
                        <div className="table-cell cell-title">Title</div>
                        <div className="table-cell cell-notice-type">Notice Type</div>
                        <div className="table-cell cell-target">Departments/Individual</div>
                        <div className="table-cell cell-published">Published On</div>
                        <div className="table-cell cell-status">Status</div>
                        <div className="table-cell cell-actions">Actions</div>
                    </div>

                    {/* Table Body */}
                    <div className="table-body">
                        {notices.map((notice) => (
                            <div key={notice.id} className="table-row">
                                <div className="table-cell cell-checkbox">
                                    <input
                                        type="checkbox"
                                        className="table-checkbox"
                                        checked={selectedNotices.includes(notice.id)}
                                        onChange={() => handleSelectNotice(notice.id)}
                                    />
                                </div>
                                <div className="table-cell cell-title">{notice.title}</div>
                                <div className="table-cell cell-notice-type">{notice.noticeType}</div>
                                <div className="table-cell cell-target">{notice.target}</div>
                                <div className="table-cell cell-published">
                                    {notice.publishedOn || '-'}
                                </div>
                                <div className="table-cell cell-status">
                                    <span className={`status-badge status-${notice.status.toLowerCase()}`}>
                                        {notice.status}
                                    </span>
                                </div>
                                <div className="table-cell cell-actions">
                                    <button className="action-btn btn-view" title="View">
                                        <Eye size={18} />
                                    </button>
                                    <button className="action-btn btn-edit" title="Edit">
                                        <Edit size={18} />
                                    </button>
                                    <button className="action-btn btn-more" title="More options">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination */}
                <div className="pagination">
                    <button
                        className="pagination-arrow"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            className={`pagination-number ${currentPage === index + 1 ? 'active' : ''}`}
                            onClick={() => setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                        className="pagination-arrow"
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoticeManagement;
