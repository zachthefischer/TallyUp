import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AuthPage from './pages/AuthPage';
import TestPage from './pages/TestPage';
import './App.css'
import Header from './components/Header';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
          {/* Public Routes: No Navbar */}
          <Route path="/" element={<AuthPage />} />

          {/* Protected Routes: With Navbar */}
          <Route path="/dashboard" element={<Dashboard/> } />
          <Route path="/test" element={<TestPage/> } />
       </Routes>
    </>
 );
}

export default App
