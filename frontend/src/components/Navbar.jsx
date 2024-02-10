import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div className="flex text-primaryColor justify-center">
      <div className="navbar bg-base-100 justify-evenly w-10/12 border-b border-primary">
        <Link className="text-xl font-semibold ml-52" to="/">
          Home
        </Link>
        <Link className="text-xl font-semibold" to="/profile">
          Profile
        </Link>
        <Link className="text-xl font-semibold" to="/login">
          Log In
        </Link>
        <Link className="text-xl font-semibold mr-52" to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
