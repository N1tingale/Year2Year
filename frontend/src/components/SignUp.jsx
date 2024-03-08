import Navbar from "./Navbar";
import Footer from "./Footer";
import Input from "./Input";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    getValues,
  } = useForm();

  const onPasswordClick = () => {
    setShowPassword((state) => !state);
  };

  const onReEnterPasswordClick = () => {
    setShowReEnterPassword((state) => !state);
  };

  const validatePassword = (value) => {
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter";
    if (!/\d/.test(value)) return "Password must contain at least one digit";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return "Password must contain at least one special character";

    return true;
  };

  const onSubmit = (data) => {
    const passwordValidationResult = validatePassword(data.password);

    if (passwordValidationResult !== true) {
      setError("password", {
        type: "manual",
        message: passwordValidationResult,
      });
      return;
    }

    const password = getValues("password");
    const reenterPassword = getValues("reenterPassword");

    if (password !== reenterPassword) {
      setError("reenterPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    console.log(data);

    axios
      .post("http://127.0.0.1:5000/add-student", {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.student) {
          for (const field in res.data.student) {
            localStorage.setItem(field, res.data.student[field]);
          }
        } else if (res.data.tutor) {
          for (const field in res.data.tutor) {
            localStorage.setItem(field, res.data.tutor[field]);
          }
        }

        navigate("/profile");
        console.log(res);
      })
      .catch((err) => {
        setError("reenterPassword", {
          type: "manual",
          message: err.data.message,
        });
      });
  };

  return (
    <div className="h-screen">
      <Navbar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" flex flex-col justify-center items-center mt-4">
          <h1 className="text-4xl font-semibold text-primaryColor">Sign Up</h1>
          <p className="text-xl font-semibold text-primaryColor">
            MADE BY STUDENTS.
          </p>
          <p className="text-xl font-semibold text-primaryColor">
            DESIGNED FOR STUDENTS.
          </p>
          <p className="text-lg text-primaryColor">
            Your learning trip starts here!
          </p>
          <div className="w-80">
            <Input
              type={"text"}
              name={"email"}
              placeholder={"Email"}
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              errorMessage={errors.email?.message}
            />
            <Input
              type={"text"}
              name={"firstName"}
              placeholder={"First name"}
              register={register}
              validation={{ required: "First name required", maxLength: 35 }}
              errorMessage={errors.firstName?.message}
            />
            <Input
              name={"lastName"}
              type={"text"}
              placeholder={"Last name"}
              register={register}
              validation={{ required: "Last name is required", maxLength: 35 }}
              errorMessage={errors.lastName?.message}
            />
            <Input
              name={"password"}
              type={showPassword ? "text" : "password"}
              placeholder={"Password"}
              showPassword={showPassword}
              onClick={onPasswordClick}
              register={register}
              validation={{ required: "Password required" }}
              errorMessage={errors.password?.message}
            >
              {showPassword ? (
                <FaEye className="text-primaryColor h-6 w-6" />
              ) : (
                <FaEyeSlash className="text-primaryColor h-6 w-6" />
              )}
            </Input>
            <Input
              name={"reenterPassword"}
              type={showReEnterPassword ? "text" : "password"}
              placeholder={"Re-enter Password"}
              onClick={onReEnterPasswordClick}
              register={register}
              validation={{ required: "Password is required" }}
              errorMessage={errors.reenterPassword?.message}
            >
              {showReEnterPassword ? (
                <FaEye className="text-primaryColor h-6 w-6" />
              ) : (
                <FaEyeSlash className="text-primaryColor h-6 w-6" />
              )}
            </Input>
            <button
              type="submit"
              className="btn bg-white mt-1 rounded-3xl w-full"
            >
              Sign Up
            </button>
          </div>
          <small className="mt-1 underline">
            <Link to="/login">HAVE AN ACCOUNT?</Link>
          </small>
        </div>
      </form>
      <Footer />
    </div>
  );
}
