import Card from "./Card";
import Navbar from "./Navbar";

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
        <Card title={"SIGN UP USING"} text={"YOUR UNIVERSITY EMAIL"} />
        <Card title={"PICK THE MODULES"} text={"YOU NEED HELP WITH"} />
        <Card title={"SCHEDULE A MEETING"} text={"WITH YOUR NEW TUTOR"} />
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <p className="text-4xl">Still Waiting?</p>
        <h1 className="text-4xl font-bold mt-1">
          Embark On Your Learning Journey With Us!
        </h1>
        <p className="text-xl mt-1">Don't Miss Out on Success:</p>
        <p className="text-xl font-bold">Book Your Tutor Now!</p>
        <button className="btn btn-primary mt-4">Sign Up</button>
      </div>
    </div>
  );
}
