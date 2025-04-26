import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import Dashboard from './pages/Dashboard';
import ClubFinanceManager from './components/Dashboard';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
          {/* Public Routes: No Navbar */}
          {/* Protected Routes: With Navbar */}
          <Route path="/" element={
            <>
              <div className="min-h-screen bg-gray-100">
                <ClubFinanceManager />
              </div>
            </>
          } />
       </Routes>
    </>
 );
}

export default App
