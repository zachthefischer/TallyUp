import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import './App.css'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
          {/* Public Routes: No Navbar */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes: With Navbar */}
          <Route path="/dashboard" element={<Dashboard/> } />
       </Routes>
    </>
 );
}

export default App
