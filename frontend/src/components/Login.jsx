import { useState } from "react";
import Navbar from "./Navbar";
import axios from 'axios';
export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const sendLogInData = () =>  {
    axios.post('http://127.0.0.1:5000/login', {
      "email":email,
      "password":password
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div className="overflow-hidden h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-5xl font-semibold mb-2">Log In</h1>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Enter your student email</span>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs placeholder:text-primaryColor-800"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Enter your password</span>
          </div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs placeholder:text-primaryColor-800"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="btn btn-primary mt-4"  onClick={sendLogInData}>Log in</button>
      </div>
    </div>
  );
}
