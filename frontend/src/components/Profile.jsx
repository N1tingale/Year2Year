import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatCard from "./ChatCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("id") == null) {
      setTimeout(() => navigate("/login"), 2500);
    } else {
      setAuthenticated(true);
    }
  }, []);

  return (
    <>
      <Navbar />
      {authenticated ? (
        <div className="w-2/3 mx-auto mt-2 rounded-xl flex justify-between divider-vertical">
          <div className="rounded-xl shadow-2xl flex flex-col w-5/12 p-4">
            <div className="flex justify-center items-center rounded-xl border-2 border-black m-2 bg-white w-1/3">
              <h1 className="text-3xl font-extrabold p-4">Profile</h1>
            </div>

            <div className="flex flex-col items-center rounded-xl border-2 border-black m-2 bg-white w-1/3s p-2">
              <h1 className="text-xl font-bold p-2">Your name</h1>

              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col items-center rounded-xl border-2 border-black m-2 bg-white w-1/3s p-2">
              <h1 className="text-xl font-bold p-2">About</h1>
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Bio"
              ></textarea>
            </div>
          </div>
          <div className="rounded-xl shadow-2xl flex flex-col w-5/12 p-4">
            <div className="flex justify-center items-center rounded-xl border-2 border-black m-2 bg-white w-1/3">
              <h1 className="text-3xl font-extrabold p-4">Chats</h1>
            </div>
            <div className="p-2 rounded-xl my-2 border-2 border-black bg-secondaryColor">
              <h1 className="text-xl font-bold p-2">Chat preview</h1>
              <div className="my-2 flex flex-col overflow-y-auto max-h-96">
                {[...Array(10)].map((elementInArray, index) => (
                  <ChatCard
                    tutorName={`Tutor ${index}`}
                    message={"Lorem ipsum dolor sit amet"}
                    key={index}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          You have to be authenticated to view the profile page, redirecting to
          login...
        </div>
      )}
      <Footer />
    </>
  );
}
