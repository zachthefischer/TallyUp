// component/NavBar.js

import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-6 justify-center">
        <li><NavLink to="/" className="text-white">Home</NavLink></li>
        <li><NavLink to="/about" className="text-white">About</NavLink></li>
        <li><NavLink to="/profile" className="text-white">Profile</NavLink></li>
      </ul>
    </nav>
  );
};

export default NavBar;