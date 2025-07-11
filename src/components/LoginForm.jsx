import React, {useState} from 'react';
import './LoginForm.css';

const LoginForm = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
    };

    return (
        <div className="col-12 col-md-8 login-form-container">
            <div className="login-form-wrapper">
                <div className="mobile-brand d-md-none">
                    <i className="bi bi-card-checklist"></i>
                    <h4>To-do App</h4>
                </div>

                <div className="login-header">
                    <h1>
                        <i className="bi bi-check2-square"></i>
                        <span>Login</span>
                    </h1>
                    <p>Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-group">
                            <i className="bi bi-envelope input-icon"></i>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                            <i className="bi bi-lock input-icon"></i>
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                <i className={`bi bi-eye${isPasswordVisible ? '-slash' : ''}`}></i>
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-button">
                        <span>Sign In</span>
                        <i className="bi bi-arrow-right"></i>
                    </button>
                </form>

                <div className="mobile-footer d-md-none">
                    <p>© 2025 To-do App. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;