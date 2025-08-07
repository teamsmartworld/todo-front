
import React, { useState } from 'react';
import './Task.css';
import Sidebar from './Sidebar';
import Header from "./Header.jsx";

const Task = ({ initialTasks = [] }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [tasks, setTasks] = useState(initialTasks);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        person: '',
        attachments: [],
        status: 'pending'
    });

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-warning text-dark';
            case 'in-progress':
                return 'bg-primary';
            case 'completed':
                return 'bg-success';
            default:
                return 'bg-secondary';
        }
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (!newTask.title) return;

        setTasks([...tasks, {
            id: Date.now(),
            ...newTask,
            createdDate: new Date().toISOString()
        }]);
        setNewTask({
            title: '',
            description: '',
            dueDate: '',
            person: '',
            attachments: [],
            status: 'pending'
        });
    };

    const handleFileChange = (e) => {
        setNewTask({ ...newTask, attachments: Array.from(e.target.files) });
    };

    const clearAttachments = () => {
        setNewTask({ ...newTask, attachments: [] });
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <div className="dashboard-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <main className="dashboard-main">
                <Header
                    title="Tasks"
                    subtitle="Manage and organize your tasks"
                    onToggleSidebar={() => setIsSidebarOpen(true)}
                />

                <div className="dashboard-content">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="card shadow-sm task-form-section">
                                <div className="card-body">
                                    <h2 className="card-title mb-4">Add New Task</h2>
                                    <form onSubmit={handleAddTask} id="todoForm">
                                        <div className="mb-3">
                                            <label htmlFor="todoTitle" className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="todoTitle"
                                                value={newTask.title}
                                                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="todoDescription" className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                id="todoDescription"
                                                rows="3"
                                                value={newTask.description}
                                                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                            ></textarea>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="todoDueDate" className="form-label">Due Date</label>
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    id="todoDueDate"
                                                    value={newTask.dueDate}
                                                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="todoPerson" className="form-label">Assign to Person</label>
                                                <select
                                                    className="form-select"
                                                    id="todoPerson"
                                                    value={newTask.person}
                                                    onChange={(e) => setNewTask({...newTask, person: e.target.value})}
                                                >
                                                    <option value="">-- Select Person (Optional) --</option>
                                                    <option value="1">Mehrdad Javan</option>
                                                    <option value="2">Simon Elbrink</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Attachments</label>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    id="todoAttachments"
                                                    multiple
                                                    onChange={handleFileChange}
                                                />
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    type="button"
                                                    onClick={clearAttachments}
                                                >
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                            <div className="file-list" id="attachmentPreview">
                                                {newTask.attachments.map((file, index) => (
                                                    <span key={index} className="badge bg-secondary me-2">
                                                        {file.name}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button type="submit" className="btn btn-primary">
                                                <i className="bi bi-plus-lg me-2"></i>
                                                Add Task
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="card shadow-sm tasks-list mt-4">
                                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                                    <h5 className="card-title mb-0">Tasks</h5>
                                    <div className="btn-group">
                                        <button className="btn btn-outline-secondary btn-sm" title="Filter">
                                            <i className="bi bi-funnel"></i>
                                        </button>
                                        <button className="btn btn-outline-secondary btn-sm" title="Sort">
                                            <i className="bi bi-sort-down"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="list-group">
                                        {tasks.map((task) => (
                                            <div key={task.id} className="list-group-item list-group-item-action">
                                                <div className="d-flex w-100 justify-content-between align-items-start">
                                                    <div className="flex-grow-1">
                                                        <div className="d-flex justify-content-between">
                                                            <h6 className="mb-1">{task.title}</h6>
                                                            <small className="text-muted ms-2">
                                                                Created: {new Date(task.createdDate).toLocaleDateString()}
                                                            </small>
                                                        </div>
                                                        <p className="mb-1 text-muted small">{task.description}</p>
                                                        <div className="d-flex align-items-center flex-wrap">
                                                            <small className="text-muted me-2">
                                                                <i className="bi bi-calendar-event"></i>
                                                                {' '}Due: {new Date(task.dueDate).toLocaleString()}
                                                            </small>
                                                            {task.person && (
                                                                <span className="badge bg-info me-2">
                                                                    <i className="bi bi-person"></i> {task.person}
                                                                </span>
                                                            )}
                                                            {task.attachments.length > 0 && (
                                                                <span className="badge bg-secondary me-2">
                                                                    <i className="bi bi-paperclip"></i>
                                                                    {' '}{task.attachments.length} attachments
                                                                </span>
                                                            )}
                                                            <span className={`badge ${getStatusBadgeClass(task.status)} me-2`}>
                                                                {task.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group ms-3">
                                                        <button className="btn btn-outline-success btn-sm" title="Complete">
                                                            <i className="bi bi-check-lg"></i>
                                                        </button>
                                                        <button className="btn btn-outline-primary btn-sm" title="Edit">
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            title="Delete"
                                                            onClick={() => handleDeleteTask(task.id)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Task;