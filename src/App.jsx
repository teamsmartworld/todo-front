import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Task from './components/Task';
import NotFound from "./components/NotFound.jsx";  // Import Task component

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/tasks" element={<Task />} />
            {/* Add other routes as needed */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;