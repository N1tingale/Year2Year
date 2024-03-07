import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="flex text-primaryColor justify-center">
      <div className="navbar bg-base-100 justify-evenly w-10/12 border-b border-primary">
        <Link
          className={`text-xl font-semibold ${
            !localStorage.getItem("id") ? "ml-52" : "ml-0"
          }`}
          to="/"
        >
          Home
        </Link>
        <Link className="text-xl font-semibold" to="/profile">
          Profile
        </Link>
        <Link className="text-xl font-semibold" to="/tutors-list">
          Tutors
        </Link>
        {!localStorage.getItem("id") ? (
          <>
            {" "}
            <Link className="text-xl font-semibold" to="/login">
              Log In
            </Link>
            <Link className="text-xl font-semibold mr-52" to="/signup">
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="text-xl font-semibold"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}
