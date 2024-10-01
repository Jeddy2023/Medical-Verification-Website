import React, { useContext, useState } from 'react';
import { z } from 'zod';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/axios';
import { UserContext } from '../../context/userContext';
import { Button } from '@mantine/core';
import toast from 'react-hot-toast';

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
      login(response?.data);
      if(formData.email == 'admin@gmail.com' && response?.data?.accessToken){
        navigate('/admin');
        return;
      } 
      navigate('/Manufacturer');
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.error || 'Login failed, try again later')
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Welcome to Medic Verify</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
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

          <Button type="submit" className="login-btn" color='#0911ff9a' w={'100%'} size='lg' loading={isLoading}>Login</Button>
        </form>

        <p className="signup-link">
          Don’t have an account? <a href="/auth/register">Sign Up!</a>
        </p>
      </div>
      <div className="login-right">
        <img src="https://images.pexels.com/photos/5722881/pexels-photo-5722881.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Fluid Design" />
      </div>
    </div>
  );
};

export default Login;
