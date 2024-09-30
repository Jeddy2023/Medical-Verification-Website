import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './global.css';
// import Home from './pages/Home/Home';
import Manufacturer from './pages/Manufacturer/Manufacturer';
import HospitalPage from './pages/Manufacturer/Hospitals/Hospitals';
import Manufacturers from './pages/Admin/Manufacturers/Manufacturers';
import Profile from './pages/Manufacturer/Profile/Profile';
import Admin from './pages/Admin/Admin';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import HeroSection from './Components/HeroSection/HeroSection';

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/auth/register" element={<Signup />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/Manufacturer" element={<Manufacturer />} />
          <Route path="/Manufacturer/Hospitals" element={<HospitalPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/Manufacturer" element={<Manufacturer />} />
          <Route path="/Manufacturer/Profile" element={<Profile />} />
          <Route path="/admin/Manufacturers" element={<Manufacturers />} />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
