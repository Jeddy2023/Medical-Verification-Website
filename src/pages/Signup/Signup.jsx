import React, { useState } from 'react';
import { z } from 'zod';
import './signup.css';
import { api } from '../../api/axios';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Zod schema for form validation
const signupSchema = z.object({
    name: z.string().min(2, { message: 'Company name must be at least 2 characters long.' }),
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
});

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'MANUFACTURER'
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});

        // Validate the formData using the zod schema
        const result = signupSchema.safeParse(formData);

        if (!result.success) {
            const formattedErrors = result.error.format();
            setErrors({
                name: formattedErrors.name?._errors[0], // Change to 'name'
                email: formattedErrors.email?._errors[0],
                password: formattedErrors.password?._errors[0],
                confirmPassword: formattedErrors.confirmPassword?._errors[0],
            });
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);

            const { confirmPassword, ...dataToSend } = formData;

            const response = await api.post("/users", dataToSend);
            navigate('/auth/login');
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.error || 'Registeration failed, try again later')
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="login-container">
            <div className="login-left">
                <h1>Welcome back to Medic Verify</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Company Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="form-group password-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span onClick={togglePasswordVisibility} className="toggle-password">
                            {showPassword ? 'Hide' : 'Show'}
                        </span>
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>

                    <div className="form-group password-group">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <span onClick={toggleConfirmPasswordVisibility} className="toggle-password">
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </span>
                        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </div>

                    <Button type="submit" className="login-btn" color='#0911ff9a' w={'100%'} size='lg' loading={isLoading}>Register</Button>
                </form>

                <p className="signup-link">
                    Have an account Already? <a href="/auth/login">Login!</a>
                </p>
            </div>
            <div className="login-right">
                <img src="https://images.pexels.com/photos/5722881/pexels-photo-5722881.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Fluid Design" />
            </div>
        </div>
    );
};

export default Signup;
