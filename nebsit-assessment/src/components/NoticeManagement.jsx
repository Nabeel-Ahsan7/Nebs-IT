import React from 'react';
import { FileText } from 'lucide-react';
import './NoticeManagement.css';

const NoticeManagement = () => {
    const activeNotices = 8;
    const draftNotices = 4;

    return (
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
    );
};

export default NoticeManagement;
