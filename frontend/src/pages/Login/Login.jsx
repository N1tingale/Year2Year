import "./Login.scss";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
export default function Login() {
  return (
    <div>
      <Navbar />
      <div className="login-content-container">
        <h1 className="header">Login page</h1>
        <div className="login-container">
          <input
            className="input-box"
            type="email"
            placeholder="Enter your email"
          />
          <input
            className="input-box"
            type="password"
            placeholder="Enter your password"
          />
          <button className="login-button">Log in</button>
          <small className="small-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
