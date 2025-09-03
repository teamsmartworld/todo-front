
import React, { useState, useEffect } from 'react';
import './Task.css';
import Sidebar from './Sidebar';
import Header from "./Header.jsx";
import { taskService } from '../services/taskService';

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        assignedPersonId: ''
    });
    const [isOffline, setIsOffline] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const data = await taskService.getAllTasks();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newTask = await taskService.createTask(formData);
            console.log('Created task:', newTask);
            setTasks(prev => [...prev, newTask]);
            setFormData({ title: '', description: '', dueDate: '', assignedPersonId: '' });
        } catch (error) {
            console.error('Error creating task:', error);
            setIsOffline(true);
            // Fallback: add task locally with temporary ID
            const tempTask = {
                id: Date.now(),
                ...formData,
                status: 'PENDING',
                createdAt: new Date().toISOString(),
                isLocal: true // Mark as local-only
            };
            setTasks(prev => [...prev, tempTask]);
            setFormData({ title: '', description: '', dueDate: '', assignedPersonId: '' });
        }
    };

    const handleDelete = async (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
        try {
            await taskService.deleteTask(id);
        } catch (error) {
            console.error('Error deleting task:', error);
            fetchTasks();
        }
    };

    const handleToggleStatus = async (id) => {
        setTasks(prev => prev.map(task => 
            task.id === id 
                ? { ...task, status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' }
                : task
        ));
        try {
            const updatedTask = await taskService.toggleTaskStatus(id);
            setTasks(prev => prev.map(task => 
                task.id === id ? updatedTask : task
            ));
        } catch (error) {
            console.error('Error toggling task status:', error);
            fetchTasks();
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task.id);
        setEditFormData({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate || '',
            assignedPersonId: task.assignedPersonId || ''
        });
    };

    const handleSaveEdit = async (id) => {
        try {
            const updatedTask = await taskService.updateTask(id, editFormData);
            setTasks(prev => prev.map(task => 
                task.id === id ? updatedTask : task
            ));
            setEditingTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
            setTasks(prev => prev.map(task => 
                task.id === id ? { ...task, ...editFormData } : task
            ));
            setEditingTask(null);
        }
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        setEditFormData({});
    };

    return (
        <div className="dashboard-layout">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <main className="dashboard-main">
                <Header
                    title="Tasks"
                    subtitle="Manage and organize your tasks"
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                />

                <div className="dashboard-content">
                    <div className="row">
                        <div className="col-md-8 mx-auto">
                            <div className="card shadow-sm task-form-section">
                                <div className="card-body">
                                    <h2 className="card-title mb-4">Add New Task</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="todoTitle" className="form-label">Title</label>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                id="todoTitle" 
                                                value={formData.title}
                                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                required 
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="todoDescription" className="form-label">Description</label>
                                            <textarea 
                                                className="form-control" 
                                                id="todoDescription" 
                                                rows="3"
                                                value={formData.description}
                                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            ></textarea>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="todoDueDate" className="form-label">Due Date</label>
                                                <input 
                                                    type="datetime-local" 
                                                    className="form-control" 
                                                    id="todoDueDate"
                                                    value={formData.dueDate}
                                                    onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="todoPerson" className="form-label">Assign to Person</label>
                                                <select 
                                                    className="form-select" 
                                                    id="todoPerson"
                                                    value={formData.assignedPersonId}
                                                    onChange={(e) => setFormData({...formData, assignedPersonId: e.target.value})}
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
                                                <input type="file" className="form-control" id="todoAttachments" multiple />
                                                <button className="btn btn-outline-secondary" type="button">
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </div>
                                            <div className="file-list" id="attachmentPreview"></div>
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
                                    {loading ? (
                                        <div className="text-center">
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="list-group">
                                            {console.log('Current tasks:', tasks)}
                                            {tasks.length === 0 ? (
                                                <p className="text-muted text-center">No tasks found. Create your first task above!</p>
                                            ) : (
                                                tasks.map(task => (
                                                    <div key={task.id} className="list-group-item list-group-item-action">
                                                        {editingTask === task.id ? (
                                                            <div className="edit-form">
                                                                <div className="mb-2">
                                                                    <input 
                                                                        type="text" 
                                                                        className="form-control form-control-sm" 
                                                                        value={editFormData.title}
                                                                        onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                                                                        placeholder="Task title"
                                                                    />
                                                                </div>
                                                                <div className="mb-2">
                                                                    <textarea 
                                                                        className="form-control form-control-sm" 
                                                                        rows="2"
                                                                        value={editFormData.description}
                                                                        onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                                                                        placeholder="Description"
                                                                    ></textarea>
                                                                </div>
                                                                <div className="d-flex gap-2">
                                                                    <button 
                                                                        className="btn btn-success btn-sm" 
                                                                        onClick={() => handleSaveEdit(task.id)}
                                                                    >
                                                                        <i className="bi bi-check"></i> Save
                                                                    </button>
                                                                    <button 
                                                                        className="btn btn-secondary btn-sm" 
                                                                        onClick={handleCancelEdit}
                                                                    >
                                                                        <i className="bi bi-x"></i> Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="d-flex w-100 justify-content-between align-items-start">
                                                                <div className="flex-grow-1">
                                                                    <div className="d-flex justify-content-between">
                                                                        <h6 className="mb-1">{task.title}</h6>
                                                                        <small className="text-muted ms-2">Created: {new Date(task.createdAt).toLocaleDateString()}</small>
                                                                    </div>
                                                                    <p className="mb-1 text-muted small">{task.description}</p>
                                                                <div className="d-flex align-items-center flex-wrap">
                                                                    {task.dueDate && (
                                                                        <small className="text-muted me-2">
                                                                            <i className="bi bi-calendar-event"></i> Due: {new Date(task.dueDate).toLocaleDateString()}
                                                                        </small>
                                                                    )}
                                                                    {task.assignedPerson && (
                                                                        <span className="badge bg-info me-2">
                                                                            <i className="bi bi-person"></i> {task.assignedPerson}
                                                                        </span>
                                                                    )}
                                                                    <span className={`badge me-2 ${
                                                                        task.status === 'COMPLETED' ? 'bg-success' :
                                                                        task.status === 'IN_PROGRESS' ? 'bg-primary' : 'bg-warning text-dark'
                                                                    }`}>
                                                                        {task.status?.toLowerCase().replace('_', '-') || 'pending'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="btn-group ms-3">
                                                                <button 
                                                                    className="btn btn-outline-success btn-sm" 
                                                                    title="Toggle Status"
                                                                    onClick={() => handleToggleStatus(task.id)}
                                                                >
                                                                    <i className="bi bi-check-lg"></i>
                                                                </button>
                                                                <button 
                                                                    className="btn btn-outline-primary btn-sm" 
                                                                    title="Edit"
                                                                    onClick={() => handleEdit(task)}
                                                                >
                                                                    <i className="bi bi-pencil"></i>
                                                                </button>
                                                                <button 
                                                                    className="btn btn-outline-danger btn-sm" 
                                                                    title="Delete"
                                                                    onClick={() => handleDelete(task.id)}
                                                                >
                                                                    <i className="bi bi-trash"></i>
                                                                </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}

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