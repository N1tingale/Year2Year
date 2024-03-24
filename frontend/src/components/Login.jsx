import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Footer from "./Footer";
import Input from "./Input";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
  const [loginAsTutor, setLoginAsTutor] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onPasswordClick = () => {
    setShowPassword((state) => !state);
  };

  useEffect(() => {
    if (localStorage.getItem("id")) {
      navigate("/profile");
    }
  });

  const onSubmit = (data) => {
    console.log(data);

    const path = loginAsTutor ? "login-tutor" : "login-student";

    axios
      .post(`http://127.0.0.1:5000/${path}`, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res.data.student) {
          for (const field in res.data.student) {
            localStorage.setItem(field, res.data.student[field]);
            localStorage.setItem("userType", "student");
          }
        } else if (res.data.tutor) {
          for (const field in res.data.tutor) {
            localStorage.setItem(field, res.data.tutor[field]);
            localStorage.setItem("userType", "tutor");
          }
        }

        navigate("/profile");
        console.log(res);
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error) {
          setError("password", {
            type: "manual",
            message: err.response.data.error,
          });
        }
      });
  };

  return (
    <div className="overflow-hidden h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center mt-20">
        <h1 className="text-4xl font-semibold mb-2 text-primaryColor">
          Log In
        </h1>
        <p className="text-xl font-semibold text-primaryColor">
          MADE BY STUDENTS.
        </p>
        <p className="text-xl font-semibold text-primaryColor">
          DESIGNED FOR STUDENTS.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-80">
            <Input
              type={"text"}
              name={"email"}
              placeholder={loginAsTutor ? "Tutor email" : "Email"}
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
            <button
              type="submit"
              className="btn bg-white mt-1 rounded-3xl w-full"
            >
              Log In
            </button>
          </div>
        </form>
        <small className="mt-1 underline">
          <Link to="/signup">DON'T HAVE AN ACCOUNT?</Link>
        </small>
        <small className="mt-1 underline">
          <Link to="/forgotpassword">FORGOT PASSWORD?</Link>
        </small>
        <small className="mt-1">
          <button
            onClick={() => setLoginAsTutor((value) => !value)}
            className="underline"
          >
            {loginAsTutor ? "LOG IN AS STUDENT" : "LOG IN AS TUTOR"}
          </button>
        </small>
      </div>
      <Footer />
    </div>
  );
}
