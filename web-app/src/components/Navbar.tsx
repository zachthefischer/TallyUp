import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
      <li>
        <NavLink
            to="/"
            className={({ isActive }) => {
            return isActive ? "active-link" : "";
            }}
        >
            Home
        </NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

