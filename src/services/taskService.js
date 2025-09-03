const API_URL = 'http://localhost:9090/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('auth_token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const taskService = {
    getAllTasks: async () => {
        const response = await fetch(`${API_URL}/tasks`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to fetch tasks');
        return response.json();
    },

    createTask: async (task) => {
        const response = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(task)
        });
        if (!response.ok) throw new Error('Failed to create task');
        return response.json();
    },

    updateTask: async (id, task) => {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(task)
        });
        if (!response.ok) throw new Error('Failed to update task');
        return response.json();
    },

    deleteTask: async (id) => {
        const response = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to delete task');
    },

    toggleTaskStatus: async (id) => {
        const response = await fetch(`${API_URL}/tasks/${id}/toggle`, {
            method: 'PATCH',
            headers: getAuthHeaders()
        });
        if (!response.ok) throw new Error('Failed to toggle task status');
        return response.json();
    }
};