import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="text-5xl font-bold text-center mt-4">
          UNLOCK YOUR POTENTIAL: BOOK YOUR TUTOR, <br /> MASTER YOUR SUBJECTS!
        </h1>
        <p className="text-xl mt-6">How It Works</p>
        <div className="flex text-xl">
          <p>It's</p>
          <p className="font-bold mx-1">Super Simple</p>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <div className="card bg-primaryColor text-white mx-4 shadow-xl outline-primary">
          <div className="card-body p-6">
            <p className="text-2xl font-semibold whitespace-nowrap">
              <p className="font-bold">SIGN UP USING</p>
              YOUR UNIVERSITY EMAIL
            </p>
          </div>
        </div>
        <div className="bg-white card mx-4 shadow-xl outline-primary">
          <div className="card-body p-6">
            <p className="text-2xl font-semibold whitespace-nowrap">
              <p className="font-bold">PICK THE MODULES</p>
              YOU NEED HELP WITH
            </p>
          </div>
        </div>
        <div className="card mx-4 bg-primaryColor text-white shadow-xl outline-primary">
          <div className="card-body p-6">
            <p className="text-2xl font-semibold whitespace-nowrap">
              <p className="font-bold">SCHEDULE A MEETING</p>
              WITH YOUR NEW TUTOR
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <p className="text-4xl">Still Waiting?</p>
        <h1 className="text-4xl font-bold mt-1">
          Embark On Your Learning Journey With Us!
        </h1>
        <p className="text-xl mt-1">Don't Miss Out on Success:</p>
        <p className="text-xl font-bold">Book Your Tutor Now!</p>
        <button className="shadow-xl btn btn-primary mt-4 rounded-3xl pr-0">
          Sign Up
          <button className="btn btn-circle bg-white outline outline-primaryColor hover:bg-white">
            <FaArrowRightLong className="h-5 w-5" />
          </button>
        </button>
      </div>
      <Footer />
    </div>
  );
}
