import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Task from "./components/Task.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Dashboard />
    </StrictMode>,
)
