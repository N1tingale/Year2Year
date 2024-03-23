import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OTPModal({
  email,
  setReset,
  correctOtp,
  setIsOtpCorrect,
  showOTPModal,
}) {
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(showOTPModal);

  const handleChange = (enteredOtp) => {
    setOtp(enteredOtp);
    if (enteredOtp.length === 4) {
      handleComplete(enteredOtp);
    }
  };

  const handleComplete = (enteredOtp) => {
    if (correctOtp) {
      if (enteredOtp === correctOtp) {
        setIsOtpCorrect(true);
        setShowModal(false);
      } else {
        setOtp(""); // Clear OTP field
        console.error("Incorrect OTP");
      }
    } else {
      axios
        .post("http://127.0.0.1:5000/verify-otp", {
          email: email,
          otp: enteredOtp,
        })
        .then((res) => {
          console.log(res);
          setReset(true);
          setShowModal(false);
        })
        .catch((err) => {
          console.error("Error verifying OTP:", err);
        });
    }
  };

  const validateChar = (char) => {
    return /^\d+$/.test(char);
  };

  return (
    <>
      {showModal && (
        <div
          id="otp_modal"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="modal-box text-center bg-base rounded-xl shadow-xl p-8">
            <h3 className="font-bold text-lg">Enter your one-time password</h3>
            <p className="py-4">Sent to {email}</p>
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
            {!correctOtp && (
              <Link to="/login">
                <button className="btn bg-primaryColor text-white mt-4">
                  Go Back
                </button>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
