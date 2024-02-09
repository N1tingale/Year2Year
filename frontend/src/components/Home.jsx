import Navbar from "./Navbar";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center mt-4">
          Unlock your potential: book your tutor, <br /> master your subjects!
        </h1>
        <p className="mt-2 text-center prose">
          Don't Miss Out on Success: Sign Up and Book <br /> Your Tutor Now!
        </p>
        <button className="btn btn-primary rounded-3xl mt-2 px-6">
          Sign Up
        </button>
      </div>

      <div className="flex justify-evenly items-end mt-4">
        <div>
          <p className="border-b mb-6 w-36">How we work</p>
          <div className="card w-72 bg-base-100 shadow-xl outline outline-2 outline-white">
            <div className="card-body p-6">
              <p className="text-2xl font-bold">
                SIGN UP USING <br />
                YOUR <br />
                UNIVERSITY <br />
                EMAIL
              </p>
            </div>
          </div>
        </div>
        <div className="card w-72 bg-base-100 shadow-xl outline outline-2 outline-white">
          <div className="card-body p-6">
            <p className="text-2xl font-bold">
              PICK THE <br />
              MODULES YOU <br />
              YOU NEED HELP
              <br />
              WITH
            </p>
          </div>
        </div>
        <div className="card w-72 bg-base-100 shadow-xl outline outline-2 outline-white">
          <div className="card-body p-6">
            <p className="text-2xl font-bold">
              SCHEDULE A <br /> MEETING WITH <br />
              YOUR NEW <br />
              TUTOR
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <h1 className="text-4xl font-bold mx-4">
          Embark on Your Learning Journey with Us!
        </h1>
        <button className="btn btn-primary rounded-3xl mx-4 px-6">
          Book Now!
        </button>
      </div>
    </div>
  );
}
