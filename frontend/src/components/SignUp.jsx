import { useState, useRef, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Input from "./Input";
import { RxCross2 } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function SignUp() {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const [isFooterRelative, setIsFooterRelative] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  const [signUpAsTutor, setSignUpAsTutor] = useState(false);
  const [selectedModules, setSelectedModules] = useState([]);
  const [showModuleDropdown, setShowModuleDropdown] = useState(false);

  const handleModuleSelect = (selected) => {
    if (selectedModules.includes(selected)) {
      alert("Module already selected");
    } else {
      setSelectedModules((prevModules) => {
        const newModules = [...prevModules, selected];
        allowedModules = allowedModules.filter((module) => module !== selected);
        console.log(newModules);
        return newModules;
      });
    }
    setShowModuleDropdown(false);
  };
  const removeSelectedModule = (module) => {
    setSelectedModules((modules) => modules.filter((m) => m !== module));
    allowedModules.push(module);
  };

  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const onPasswordClick = () => {
    setShowPassword((state) => !state);
  };

  const onReEnterPasswordClick = () => {
    setShowReEnterPassword((state) => !state);
  };

  let allowedModules = [
    "COMP12111",
    "COMP15111",
    "COMP13212",
    "COMP15212",
    "COMP16321",
    "COMP16412",
    "COMP11120",
    "COMP11212",
  ];

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

  const onSubmit = (data, e) => {
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
    const path = signUpAsTutor ? "add-tutor" : "add-student";

    axios
      .post(`http://127.0.0.1:5000/${path}`, {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        modules: selectedModules,
        year: data.year,
        contact_number: data.contactNumber,
      })
      .then((res) => {
        if (res.data.student || res.data.tutor) {
          const userType = res.data.student ? res.data.student : res.data.tutor;
          for (const field in userType) {
            localStorage.setItem(field, userType[field]);
          }
        }

        navigate("/profile");
        console.log(res);
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.error || "An error occurred";
        setError("reenterPassword", {
          type: "manual",
          message: errorMessage,
        });
      });
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        setIsFooterRelative(containerHeight > windowHeight);
        console.log(
          `Container height:${containerHeight}, Window heigth:${windowHeight}, isFooterRelative: ${isFooterRelative}`
        );
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedModules, showModuleDropdown, errors, signUpAsTutor]);

  return (
    <div className="h-screen">
      <Navbar />
      <form
        ref={containerRef}
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center mt-4"
      >
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
            validation={{
              required: "Last name is required",
              maxLength: 35,
            }}
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
          {signUpAsTutor && (
            <div className="mt-4 relative">
              <div className="relative">
                <input
                  id="modules"
                  name="modules"
                  type="text"
                  placeholder="Modules"
                  className="w-full p-3 rounded-3xl bg-primaryColor text-white"
                  readOnly
                  onClick={() => setShowModuleDropdown((state) => !state)}
                />
                {showModuleDropdown && (
                  <div className="absolute top-full left-0 bg-white border rounded-md mt-1">
                    {allowedModules.map((module) => (
                      <div
                        key={module}
                        className="p-2 w-80 cursor-pointer hover:bg-gray-300"
                        onClick={() => handleModuleSelect(module)}
                      >
                        {module}
                      </div>
                    ))}
                  </div>
                )}
                {!showModuleDropdown ? (
                  <RiArrowDropDownLine
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white h-6 w-6 cursor-pointer"
                    onClick={() => setShowModuleDropdown((state) => !state)}
                  />
                ) : (
                  <RxCross2
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white h-6 w-6 cursor-pointer"
                    onClick={() => setShowModuleDropdown((state) => !state)}
                  />
                )}
              </div>
              <div className="text-red-500 text-sm">
                {selectedModules.length === 0 && "At least one module required"}
              </div>
              {selectedModules.length > 0 && (
                <div className="flex flex-wrap mx-auto rounded-3xl justify-center bg-white border mt-2 mb-4 ">
                  {selectedModules.map((module) => (
                    <div
                      key={module}
                      className="bg-white text-primary rounded-md m-1 p-2 items-center"
                    >
                      {module}
                      <button
                        type="button"
                        onClick={() => removeSelectedModule(module)}
                        className="text-red-500 ml-1 hover:text-red-700"
                      >
                        &#10006;
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <Input
                type={"text"}
                name={"year"}
                placeholder={"Year"}
                register={register}
                validation={{
                  required: "Year is required",
                  pattern: {
                    value: /^(2|3|4)$/,
                    message: "Invalid year group",
                  },
                }}
                errorMessage={errors.year?.message}
              />
              <Input
                type={"text"}
                name={"contactNumber"}
                placeholder={"Contact Number"}
                register={register}
                validation={{
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Invalid contact number",
                  },
                }}
                errorMessage={errors.contactNumber?.message}
              />
            </div>
          )}
          <button
            type="submit"
            className="btn bg-white mt-1 rounded-3xl w-full mt-2"
          >
            Sign Up As A {signUpAsTutor ? "Tutor" : "Student"}
          </button>
        </div>
        <small className="mt-1 underline">
          <Link to="/login">ALREADY HAVE AN ACCOUNT?</Link>
        </small>
        <small className="mt-1 underline">
          <Link to="/forgotpassword">FORGOT PASSWORD?</Link>
        </small>
        <small className="mt-1">
          <button
            onClick={() => setSignUpAsTutor((value) => !value)}
            className="underline"
          >
            {signUpAsTutor ? "SIGN UP AS STUDENT" : "SIGN UP AS TUTOR"}
          </button>
        </small>
      </form>
      <Footer relative={isFooterRelative} />
    </div>
  );
}
