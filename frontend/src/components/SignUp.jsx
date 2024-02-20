import Navbar from "./Navbar";
import Footer from "./Footer";
import Input from "./Input";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const onPasswordClick = () => {
    setShowPassword((state) => !state);
  };

  const onReEnterPasswordClick = () => {
    setShowReEnterPassword((state) => !state);
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-col justify-center items-center m-4">
        <h1 className="text-5xl font-semibold mb-2 text-primaryColor">
          Sign Up
        </h1>
        <p className="text-2xl font-semibold text-primaryColor">
          MADE BY STUDENTS.
        </p>
        <p className="text-2xl font-semibold text-primaryColor">
          DESIGNED FOR STUDENTS.
        </p>
        <p className="text-lg text-primaryColor">
          Your learning trip starts here!
        </p>
        <div className="w-80 mt-2">
          <Input type={"email"} placeholder={"Email"} setState={setEmail} />
          <Input
            type={"text"}
            placeholder={"First name"}
            setState={setFirstName}
          />
          <Input
            type={"text"}
            placeholder={"Last name"}
            setState={setLastName}
          />

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

          <Input
            type={showReEnterPassword ? "text" : "password"}
            placeholder={"Re-enter Password"}
            setState={setReenterPassword}
            onClick={onReEnterPasswordClick}
          >
            {showReEnterPassword ? (
              <FaEye className="text-primaryColor h-6 w-6" />
            ) : (
              <FaEyeSlash className="text-primaryColor h-6 w-6" />
            )}
          </Input>

          <button className="btn bg-white mt-1 rounded-3xl w-full">
            Sign Up
          </button>
        </div>
        <small className="mt-1 underline">
          <Link to="/login">HAVE AN ACCOUNT?</Link>
        </small>
      </div>
      <Footer />
    </div>
  );
}
