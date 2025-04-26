import React, { useState } from "react";
import logo from "../assets/TallyUp Logo.png"; // Adjust the path to your logo image
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

interface AuthFormData {
    email: string;
    password: string;
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (isLoginMode) {
        console.log("Logging in:", email, password);
        // Add login logic here
    } else {
        console.log("Signing up:", email, password);
        // Add signup logic here
    }
    // Navigate to dashboard after login/signup
    navigate("/dashboard");
};

  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-[#082341]/90 to-[#396E7C]/80">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-lg w-full max-w-md p-10 pt-5 border-gray-200 border-1">
        
        {/* Top-centered Image */}
        <div className="flex justify-center">
          <img src={logo} alt="Logo" className="w-65" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">      
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {!isLoginMode && 
            <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>}
          

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


            {/* LOG IN/SIGN UP BUTTON */}
          <button
            type="submit"
            className="w-full py-2 px-4 mt-2 text-white bg-[#082341] delay-150 rounded-lg hover:-translate-y-[0.1] hover:scale-102 hover:shadow-md transition ease-in-out hover:bg-[#396E7C] duration-300">
            {isLoginMode ? "Log In" : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          onClick={() => console.log("Google Sign In")}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 text-gray-700 bg-white border border-gray-300 rounded-lg hover:-translate-y-[0.1] hover:scale-102 transition ease-in-out duration-300 hover:bg-gray-100"
        >
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="h-5 w-5" />
          Continue with Google
        </button>

        {/* Toggle between Sign Up and Log In */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              type="button" 
              onClick={toggleMode}
              className="text-blue-600 hover:text-blue-700 underline"
            >
              {isLoginMode ? "Create one" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
