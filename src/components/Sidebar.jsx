import React, {useState} from 'react';
import './Sidebar.css';

const Sidebar = ({isOpen, onClose}) => {
    const navItems = [
        {icon: "bi-grid", text: "Dashboard", active: true},
        {icon: "bi-list-task", text: "Tasks", active: false},
        {icon: "bi-calendar3", text: "Calendar", active: false},
        {icon: "bi-people", text: "Teams", active: false},
        {icon: "bi-graph-up", text: "Reports", active: false}
    ];

    const [name, setName] = useState('User Name');
    const [email, setEmail] = useState('user.email@test.se');

    return (
        <>
            <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
            <div className={`sidebar ${isOpen ? 'active' : ''}`}>
                <div className="sidebar-content">
                    <div className="sidebar-header">
                        <div className="logo-container">
                            <i className="bi bi-card-checklist"></i>
                            <h4>To-do App</h4>
                        </div>
                        <button className="close-sidebar d-md-none" onClick={onClose}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </div>

                    <nav className="sidebar-nav">
                        {navItems.map((item, index) => (
                            <div key={index} className={`nav-item ${item.active ? 'active' : ''}`}>
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
                        <button className="logout-btn">
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