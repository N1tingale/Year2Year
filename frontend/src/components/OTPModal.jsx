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
  resendOTP,
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-20"
        >
          <div className="modal-box text-center bg-base rounded-lg shadow-xl p-8">
            <h3 className="font-bold text-2xl mb-4">
              Enter your one-time password
            </h3>
            <p className="text-lg mb-4">Sent to {email}</p>
            <MuiOtpInput
              sx={{
                input: {
                  border: "none",
                },
              }}
              className="w-4/6 mx-auto text-xl"
              value={otp}
              onChange={handleChange}
              validateChar={validateChar}
            />
            <div className="flex justify-center mt-4">
              {!correctOtp && (
                <Link to="/login">
                  <button className="btn bg-white text-gray-800 mr-4">
                    Go Back
                  </button>
                </Link>
              )}
              <button
                className="btn btn-primary text-white"
                onClick={() => resendOTP(email)}
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
