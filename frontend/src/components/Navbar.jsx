import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex text-primaryColor justify-center">
      <div className="navbar bg-base-100 justify-evenly w-10/12 gap-4 border-b border-primary">
        <Link
          className={`text-xl font-semibold hover:text-green-900 rounded-2xl p-1 ${
            !localStorage.getItem("id") ? "ml-52" : "ml-0"
          }`}
          to="/"
          style={{
            textDecoration: location.pathname === "/" ? "underline" : "",
          }}
        >
          Home
        </Link>
        <Link
          className="text-xl font-semibold hover:text-green-900 rounded-2xl p-1"
          to="/faq"
          style={{
            textDecoration: location.pathname === "/faq" ? "underline" : "",
          }}
        >
          FAQs
        </Link>
        {localStorage.getItem("id") && (
          <>
            <Link
              className="text-xl font-semibold hover:text-green-900 rounded-2xl p-1"
              to="/profile"
              style={{
                textDecoration:
                  location.pathname === "/profile" ? "underline" : "",
              }}
            >
              Profile
            </Link>
            {localStorage.getItem("userType") === "student" && (
              <Link
                className="text-xl font-semibold hover:text-green-900 rounded-2xl p-1"
                to="/tutors-list"
                style={{
                  textDecoration: location.pathname.startsWith("/tutors-list")
                    ? "underline"
                    : "",
                }}
              >
                Tutors
              </Link>
            )}
          </>
        )}
        {!localStorage.getItem("id") ? (
          <>
            <Link
              className="text-xl font-semibold hover:text-green-900 rounded-2xl p-1"
              to="/login"
              style={{
                textDecoration:
                  location.pathname === "/login" ? "underline" : "",
              }}
            >
              Log In
            </Link>
            <Link
              className="text-xl font-semibold mr-52 hover:text-green-900 rounded-2xl p-1"
              to="/signup"
              style={{
                textDecoration:
                  location.pathname === "/signup" ? "underline" : "",
              }}
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
            className="text-xl font-semibold hover:text-green-900"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}
