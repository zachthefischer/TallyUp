import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Dashboard from './pages/Dashboard';
import ClubFinanceManager from './components/ClubFinanceManager';

import './App.css'
import NavBar from './components/Navbar';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
          {/* Public Routes: No Navbar */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Protected Routes: With Navbar */}
          <Route path="/" element={
            <>
              <div className="min-h-screen bg-gray-100">
                <NavBar />
                <ClubFinanceManager />
              </div>
            </>
          } />
       </Routes>
    </>
 );
}

export default App
