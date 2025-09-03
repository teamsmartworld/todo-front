import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="text-center">
                <h1 className="display-1 text-danger">403</h1>
                <h2>Access Denied</h2>
                <p className="text-muted">You don't have permission to access this resource.</p>
                <button 
                    className="btn btn-primary" 
                    onClick={() => navigate('/dashboard/tasks')}
                >
                    Go to Tasks
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;