import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OTPModal({ email, setReset }) {
  const [otp, setOtp] = useState("");

  const handleChange = (newValue) => {
    setOtp(newValue);
    console.log("OTP:", newValue);
    if (newValue.length === 4) {
      handleComplete(newValue);
    }
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

  const handleComplete = (newValue) => {
    // Send data to be verified
    console.log("OTP entered:", newValue);
    axios
      .post("http://127.0.0.1:5000/verify-otp", {
        email: email,
        otp: newValue,
      })
      .then((res) => {
        console.log(res);
        setReset(true);
        document.getElementById("otp_modal").close();
      })
      .catch((err) => {
        console.error("Error verifying OTP:", err);
        document.getElementById("otp_modal").showModal();
      });
  };

  const validateChar = (char) => {
    return /^\d+$/.test(char);
  };

  return (
    <dialog id="otp_modal" className="modal mx-auto justify-center">
      <div className="modal-box justify-center mx-auto text-center">
        <h3 className="font-bold text-lg">Enter your one time password</h3>
        <p className="py-4">Send to {email}</p>
        <MuiOtpInput
          sx={{
            input: {
              border: "none",
            },
          }}
          className="w-4/6 flex mx-auto justify-center"
          value={otp}
          onChange={handleChange}
          validateChar={validateChar}
        />
        <Link to="/login">
          <button className="btn bg-primaryColor text-white mt-4">
            Go Back
          </button>
        </Link>
      </div>
    </dialog>
  );
}
