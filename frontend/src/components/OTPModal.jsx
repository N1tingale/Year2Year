import { useState } from "react";
import { MuiOtpInput } from "mui-one-time-password-input";

export default function OTPModal({ email, setReset }) {
  const [otp, setOtp] = useState("");

  const handleChange = (newValue) => {
    setOtp(newValue);
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

  const handleComplete = () => {
    // Send data to be verified
    setOtp("");
    setReset(true);
    document.getElementById("otp_modal").close();
  };

  const validateChar = (char) => {
    return /^\d+$/.test(char);
  };

  return (
    <dialog id="otp_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Enter your one time password</h3>
        <p className="py-4">Send to {email}</p>
        <MuiOtpInput
          sx={{
            input: {
              border: "none",
            },
          }}
          className="w-4/6"
          value={otp}
          onChange={handleChange}
          onComplete={handleComplete}
          validateChar={validateChar}
        />
        <div className="modal-action justify-start">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
