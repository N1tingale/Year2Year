import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState } from "react";
import OTPModal from "./OTPModal";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Input from "./Input"; // Import your custom Input component
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);

  const [showResetPassword, setShowResetPassword] = useState(false);

  const navigate = useNavigate();

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const onPasswordClick = () => {
    setShowPassword((state) => !state);
  };

  const onReEnterPasswordClick = () => {
    setShowReEnterPassword((state) => !state);
  };

  const submitEmail = () => {
    if (email.length > 0) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        setErr(true);
      } else {
        axios
          .post("https://year2year.onrender.com/send-otp-to-existing-user", {
            email: email,
          })
          .then((res) => {
            setShowResetPassword(true);
          })
          .catch((err) => {
            toast.error("Something went wrong", {
              style: {
                background: "#ffeccc",
              },
            });
          });
      }
    }
  };

  const submitPassword = (data) => {
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

    axios
      .post("https://year2year.onrender.com/edit-password", {
        email: email,
        new_password: password,
      })
      .then((res) => {
        toast.success("Password updated successfully", {
          style: {
            background: "#ffeccc",
          },
        });
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex justify-center items-center h-4/6">
        <div className="flex flex-col w-80">
          {!showResetPassword ? (
            <>
              <h1 className="text-center text-4xl font-semibold text-primaryColor mb-3">
                Reset Password
              </h1>
              <label className="bg-primaryColor rounded-3xl input input-bordered flex items-center my-2 gap-2 pr-0">
                <input
                  value={email}
                  type="email"
                  className="bg-primaryColor placeholder:text-gray-400 text-gray-200 rounded-3xl grow"
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button
                onClick={submitEmail}
                className="btn bg-white mt-1 rounded-3xl"
              >
                Reset Password
              </button>
              {err && (
                <p className="text-red-500 text-xs mt-1 ml-2">
                  Invalid email address
                </p>
              )}
            </>
          ) : (
            <>
              <OTPModal
                email={email}
                setReset={setShowResetPassword}
                showOTPModal={true}
                resendOTP={submitEmail}
              />
              <form onSubmit={handleSubmit(submitPassword)}>
                <h1 className="text-center text-3xl font-semibold text-primaryColor mb-3">
                  Enter new password
                </h1>
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
                  className="w-full btn bg-white mt-1 rounded-3xl"
                >
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
