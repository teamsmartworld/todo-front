import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Task from '../components/Task';
import NotFound from "../components/NotFound";
import Unauthorized from "../components/Unauthorized";
import RoleProtectedRoute from "./RoleProtectedRoute.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Dashboard route - only for admin */}
            <Route path="/dashboard" element={
                <RoleProtectedRoute requiredRoles={['ROLE_ADMIN']}>
                    <Dashboard />
                </RoleProtectedRoute>
            } />

            {/* Tasks route - for both admin and user */}
            <Route path="/dashboard/tasks" element={
                <RoleProtectedRoute requiredRoles={['ROLE_USER', 'ROLE_ADMIN']}>
                    <Task />
                </RoleProtectedRoute>
            } />

            {/* Placeholder routes for sidebar items */}
            <Route path="/dashboard/calendar" element={
                <RoleProtectedRoute requiredRoles={['ROLE_USER', 'ROLE_ADMIN']}>
                    <div className="p-4"><h2>Calendar - Coming Soon</h2></div>
                </RoleProtectedRoute>
            } />
            
            <Route path="/dashboard/teams" element={
                <RoleProtectedRoute requiredRoles={['ROLE_ADMIN']}>
                    <div className="p-4"><h2>Teams - Coming Soon</h2></div>
                </RoleProtectedRoute>
            } />
            
            <Route path="/dashboard/reports" element={
                <RoleProtectedRoute requiredRoles={['ROLE_ADMIN']}>
                    <div className="p-4"><h2>Reports - Coming Soon</h2></div>
                </RoleProtectedRoute>
            } />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;