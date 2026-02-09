import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import {Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Style/RegisterPage.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role:''});
    const [confirmPass, setConfirmPass] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        if(e.target.name === "confirmPassword") setConfirmPass(e.target.value);   
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            if(formData.password === confirmPass){
                await registerUser(formData);
                setFormData({ username: '', email: '', password: '', role:''});
                toast.success(`Registration successful! You can now login.`, {autoClose: 800,hideProgressBar: true});
                setTimeout(() => navigate('/login'), 300);
            }
            else{
                toast.error(`Password mismatch.`, {autoClose: 800,hideProgressBar: true});
            }
           
        } catch (err) {
            toast.error(`Registration failed.`, {autoClose: 800, hideProgressBar: true});
            const msg = err.response?.data;
            setError(typeof msg === 'string' ? msg : msg?.message || 'Registration failed');
        }
    };

    return (
        <div className="customContainer">
            <div className="customForm-container">
                <h2 className="customHeading">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="customInput-group">
                        <label htmlFor="username" className="customInput-label">User</label>
                        <input 
                        type="text"
                        name="username"
                        placeholder="Type your username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="customInput-field"
                        autoComplete="off"
                        />
                    </div>
                    <div className="customInput-group">
                        <label htmlFor="password" className="customInput-label">Password</label>
                        <div className="customPassword-wrapper">
                                <input
                                    type={isShow ? "text" : "password"}
                                    name="password"
                                    placeholder="Type your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="customInput-field"
                                    autoComplete="new-password"
                                />

                                <span className="toggle-eye" onClick={() => setIsShow(!isShow)}>
                                {isShow ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                </span>
                            </div>
                        
                    </div>
                    <div className="customInput-group">
                        <label htmlFor="password" className="customInput-label">Confirm Password</label>
                        <div className="customPassword-wrapper">
                                <input
                                    type={isShow ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Type your confirmPassword"
                                    value={confirmPass}
                                    onChange={handleChange}
                                    required
                                    className="customInput-field"
                                    autoComplete="new-password"
                                />

                                <span className="toggle-eye" onClick={() => setIsShow(!isShow)}>
                                {isShow ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                                </span>
                            </div>
                    </div>
                    <div className="customInput-group">
                        <label htmlFor="email" className="customInput-label">Email</label>
                        <input 
                        type="email"
                        name="email"
                        placeholder="Type your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="customInput-field"
                        autoComplete="new-password"
                        />
                    </div>
                    <div className="customInput-group"> 
                        <select
                            name="role"
                            id="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Role</option>
                            <option value="USER">User </option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">Register</button>
                        Already User! 
                    <Link className="signup-text" to="/login">
                        Login Now
                    </Link>
                    {error && <p style={{color:'red'}}>{error}</p>}
                    {success && <p style={{color:'green'}}>{success}</p>}
                </form>
            </div>
        </div>
    );       
};

export default RegisterPage;