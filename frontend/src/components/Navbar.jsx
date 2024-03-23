import { Link, useNavigate, useLocation } from "react-router-dom";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex text-primaryColor justify-center">
      <div className="navbar bg-base-100 justify-evenly w-10/12 gap-4 border-b border-primary">
        <Link
          className={`text-xl font-semibold hover:font-bold rounded-2xl p-1 ${
            !localStorage.getItem("id") ? "ml-52" : "ml-0"
          }`}
          to="/"
          style={{ border: location.pathname === "/" ? "1px solid black" : "" }}
        >
          Home
        </Link>
        <Link
          className="text-xl font-semibold hover:font-bold rounded-2xl p-1"
          to="/faq"
          style={{
            border: location.pathname === "/faq" ? "1px solid black" : "",
          }}
        >
          FAQs
        </Link>
        {localStorage.getItem("id") && (
          <>
            <Link
              className="text-xl font-semibold hover:font-bold rounded-2xl p-1"
              to="/profile"
              style={{
                border:
                  location.pathname === "/profile" ? "1px solid black" : "",
              }}
            >
              Profile
            </Link>
            {localStorage.getItem("userType") === "student" && (
              <Link
                className="text-xl font-semibold hover:font-bold rounded-2xl p-1"
                to="/tutors-list"
                style={{
                  border: location.pathname.startsWith("/tutors-list")
                    ? "1px solid black"
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
            {" "}
            <Link
              className="text-xl font-semibold hover:font-bold rounded-2xl p-1"
              to="/login"
              style={{
                border: location.pathname === "/login" ? "1px solid black" : "",
              }}
            >
              Log In
            </Link>
            <Link
              className="text-xl font-semibold mr-52 hover:font-bold rounded-2xl p-1"
              to="/signup"
              style={{
                border:
                  location.pathname === "/signup" ? "1px solid black" : "",
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
            className="text-xl font-semibold hover:font-bold"
          >
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}
