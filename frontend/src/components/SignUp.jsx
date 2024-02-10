import Navbar from "./Navbar";

export default function SignUp() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-5xl font-semibold mb-2">Sign Up</h1>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Enter a student email</span>
          </div>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs placeholder:text-primaryColor-800"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Enter your first name</span>
          </div>
          <input
            type="text"
            placeholder="First name"
            className="input input-bordered w-full max-w-xs placeholder:text-primaryColor-800"
          />
        </label>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Enter your last name</span>
          </div>
          <input
            type="text"
            placeholder="Last name"
            className="input input-bordered w-full max-w-xs placeholder:text-primaryColor-800"
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Enter a password</span>
          </div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs placeholder:text-primaryColor-800"
          />
        </label>
        <button className="btn btn-primary mt-4">Sign Up</button>
      </div>
    </div>
  );
}
