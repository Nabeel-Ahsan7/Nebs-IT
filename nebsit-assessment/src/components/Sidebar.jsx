import React, { useState } from 'react';
import {
    LayoutDashboard, Users, Box, FileText,
    Calendar, MessageSquare, Database, Folder,
    Clipboard, Activity, LogOut, User
} from 'lucide-react'; // Using Lucide icons to match your UI

const Sidebar = () => {
    const [isEmployeeOpen, setIsEmployeeOpen] = useState(true);

    const navItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        {
            name: 'Employee',
            icon: <Users size={20} />,
            hasSubmenu: true,
            subItems: ['Employee Database', 'Add New Employee', 'Performance Report', 'Performance History']
        },
        { name: 'Payroll', icon: <Box size={20} /> },
        { name: 'Pay Slip', icon: <FileText size={20} /> },
        { name: 'Attendance', icon: <Calendar size={20} /> },
        { name: 'Request Center', icon: <MessageSquare size={20} /> },
        { name: 'Career Database', icon: <Database size={20} />, hasSubmenu: true },
        { name: 'Document manager', icon: <Folder size={20} /> },
        { name: 'Notice Board', icon: <Clipboard size={20} /> },
        { name: 'Activity Log', icon: <Activity size={20} /> },
        { name: 'Exit Interview', icon: <LogOut size={20} /> },
        { name: 'Profile', icon: <User size={20} /> },
    ];

    return (
        <aside
            className="bg-white flex flex-col h-[1090px] w-[257px] py-[34px] px-[24px] border-r border-[#F5F6FA]"
            style={{ boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.12)' }}
        >
            {/* Logo Section */}
            <div className="mb-[50px] flex items-center px-2">
                <div className="flex items-center gap-2">
                    {/* Replace with your actual SVG logo */}
                    <div className="w-8 h-8 bg-orange-600 rounded-sm"></div>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">Nebs-IT</span>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <div key={item.name}>
                        <button
                            onClick={() => item.hasSubmenu && setIsEmployeeOpen(!isEmployeeOpen)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors
                ${item.name === 'Employee' ? 'bg-[#F8F9FB] text-slate-800' : 'text-slate-500 hover:bg-gray-50'}`}
                        >
                            <div className="flex items-center gap-3">
                                <span className={item.name === 'Employee' ? 'text-slate-600' : 'text-slate-400'}>
                                    {item.icon}
                                </span>
                                <span className="text-[14px] font-medium">{item.name}</span>
                            </div>
                            {item.hasSubmenu && (
                                <svg className={`w-4 h-4 transition-transform ${isEmployeeOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            )}
                        </button>

                        {/* Submenu Logic */}
                        {item.hasSubmenu && item.subItems && isEmployeeOpen && (
                            <div className="mt-1 ml-10 space-y-2">
                                {item.subItems.map((sub) => (
                                    <a
                                        key={sub}
                                        href="#"
                                        className="block py-2 text-[13px] text-slate-600 hover:text-slate-900 transition-colors"
                                    >
                                        {sub}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
