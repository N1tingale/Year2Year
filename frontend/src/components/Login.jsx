import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";
import Input from "./Input";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const onPasswordClick = () => {
    setShowPassword((state) => !state);
  };

  const sendLogInData = () => {
    axios
      .post("http://127.0.0.1:5000/login", {
        email: email,
        password: password,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="overflow-hidden h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-20">
        <h1 className="text-5xl font-semibold mb-2 text-primaryColor">
          Log In
        </h1>
        <p className="text-2xl font-semibold text-primaryColor">
          MADE BY STUDENTS.
        </p>
        <p className="text-2xl font-semibold text-primaryColor">
          DESIGNED FOR STUDENTS.
        </p>
        <div className="w-80">
          <Input type={"email"} placeholder={"Email"} setState={setEmail} />
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={"Password"}
            setState={setPassword}
            showPassword={showPassword}
            onClick={onPasswordClick}
          >
            {showPassword ? (
              <FaEye className="text-primaryColor h-6 w-6" />
            ) : (
              <FaEyeSlash className="text-primaryColor h-6 w-6" />
            )}
          </Input>
          <button
            onClick={sendLogInData}
            className="btn bg-white mt-1 rounded-3xl w-full"
          >
            Log In
          </button>
        </div>
        <small className="mt-1 underline">
          <Link to="/login">DON'T HAVE AN ACCOUNT?</Link>
        </small>
        <small className="mt-1 underline">
          <Link to="/login">FORGOT PASSWORD?</Link>
        </small>
      </div>
      <Footer />
    </div>
  );
}
