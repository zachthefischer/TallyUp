import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './App.css'
import NavBar from './components/Navbar';
import AuthPage from './pages/AuthPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
          {/* Public Routes: No Navbar */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes: With Navbar */}
          <Route path="/dashboard" element={
            <>
              <div className="min-h-screen bg-gray-100">
                <NavBar />
                <div className="container mx-auto px-4 py-6">
                  <h1 className="text-center text-4xl">Home Page</h1>
                </div>
              </div>
            </>
          } />
       </Routes>
    </>
 );
}

export default App
