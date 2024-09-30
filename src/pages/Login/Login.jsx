import React, { useContext, useState } from 'react';
import { z } from 'zod';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios'
import { UserContext } from '../../context/userContext';
import { Button } from '@mantine/core';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors = result.error.format();
      setErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const response = await api.post("/auth/login", formData);
      console.log(response);
      login(response?.data);
      navigate('/Manufacturer');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="login-container">
      <div className="login-form">
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <p>Welcome back! Please login to your account.</p>

        <form onSubmit={handleSubmit}>
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

          <Button type='submit' w={'100%'} color={'#0000cc'} loading={isLoading}>Login</Button>
        </form>
      </div>
    </main>
  );
};

export default Login;
