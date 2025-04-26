import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ClubFinanceManager from './components/ClubFinanceManager';

import './App.css'
import NavBar from './components/Navbar';
import AuthPage from './pages/AuthPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
          {/* Public Routes: No Navbar */}
<<<<<<< HEAD
          <Route path="/auth" element={<AuthPage />} />
=======
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
>>>>>>> 159c039e7fb762b4a67cd1c8f2c5fa5c337bdb88

          {/* Protected Routes: With Navbar */}
          <Route path="/dashboard" element={
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
