import { Link } from "react-router-dom";
import "./Navbar.scss";
export default function Navbar() {
  return (
    <nav className="nav">
      <Link className="link" to="/home">
        Home
      </Link>
      <Link className="link" to="/profile">
        Profile
      </Link>
      <h1>Year2Year</h1>
      <Link className="link" to="/login">
        Log In
      </Link>
      <Link className="link" to="/signup">
        Sign Up
      </Link>
    </nav>
  );
}
