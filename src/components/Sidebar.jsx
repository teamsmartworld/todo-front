import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Add this import
import './Sidebar.css';

const Sidebar = ({isOpen, onClose}) => {
    const navigate = useNavigate();  // Add this hook

    const navItems = [
        {icon: "bi-grid", text: "Dashboard", path: "/dashboard", active: true},
        {icon: "bi-list-task", text: "Tasks", path: "/dashboard/tasks", active: false},
        {icon: "bi-calendar3", text: "Calendar", path: "/dashboard/calendar", active: false},
        {icon: "bi-people", text: "Teams", path: "/dashboard/teams", active: false},
        {icon: "bi-graph-up", text: "Reports", path: "/dashboard/reports", active: false}
    ];

    const [name, setName] = useState('User Name');
    const [email, setEmail] = useState('user.email@test.se');

    const handleNavigation = (path) => {
        navigate(path);
        onClose(); // Close sidebar on mobile after navigation
    };

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
            <div className={`sidebar ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-content">
                    <div className="sidebar-header">
                        <div className="logo-container">
                            <i className="bi bi-card-checklist"></i>
                            <h4>To-do</h4>
                        </div>
                        <button className="close-sidebar d-md-none" onClick={onClose}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <nav className="sidebar-nav">
                        {navItems.map((item, index) => (
                            <div
                                key={index}
                                className={`nav-item ${item.active ? 'active' : ''}`}
                                onClick={() => handleNavigation(item.path)}
                                style={{ cursor: 'pointer' }}
                            >
                                <i className={`bi ${item.icon}`}></i>
                                <span>{item.text}</span>
                            </div>
                        ))}
                    </nav>

                    <div className="sidebar-footer">
                        <div className="user-section">
                            <div className="user-avatar">
                                <i className="bi bi-person"></i>
                            </div>
                            <div className="user-info">
                                <h5>{name}</h5>
                                <p>{email}</p>
                            </div>
                        </div>
                        <button className="logout-btn" onClick={() => navigate('/login')}>
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;