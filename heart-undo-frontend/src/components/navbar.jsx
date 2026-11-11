import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-horizontal.png";

function Navbar() {
  return (
    <nav className="navbar glass" aria-label="Main">
      <Link className="navbar-brand" to="/" aria-label="Heart Undo home">
        <img src={logo} alt="Heart Undo" />
      </Link>
      <div className="navbar-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/predict">Predict</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;