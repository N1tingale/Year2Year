import Navbar from "./Navbar";
export default function Login() {
  return (
    <>
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
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Enter your password</span>
          </div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <button className="btn btn-primary mt-4">Log in</button>
      </div>
    </>
  );
}
