import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatCard from "./ChatCard";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import ChatCardSkeleton from "./ChatCardSkeleton";

export default function Profile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState([]);

  const [authenticated, setAuthenticated] = useState(false);
  const [description, setDescription] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("id") == null) {
      setTimeout(() => navigate("/login"), 2500);
    } else {
      setAuthenticated(true);
      if (localStorage.getItem("userType") === "tutor") {
        axios
          .get(`http://127.0.0.1:5000/tutors/${localStorage.getItem("id")}`)
          .then((res) => {
            setDescription(res.data.tutor.description);
            if (
              res.data.tutor.description ==
              "There is no description available for this tutor."
            ) {
              setDescription("");
            }
          })
          .catch((err) => console.log(err));
      }
    }

    axios
      .get("http://127.0.0.1:5000/get-chats", {
        params: {
          user_id: localStorage.getItem("id"),
          user_type: localStorage.getItem("userType"),
        },
      })
      .then((res) => {
        setChats(res.data.chats);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleEditDescription = () => {
    setIsEditingDescription(!isEditingDescription);
  };

  async function handleSaveDescription() {
    try {
      const res = await axios.post(`http://127.0.0.1:5000/edit-description`, {
        user_id: localStorage.getItem("id"),
        description: description,
      });
      console.log(res);
      setIsEditingDescription(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Navbar />
      {authenticated ? (
        <div className="w-2/3 mx-auto mt-2 rounded-xl flex justify-between divider-vertical">
          <div className="rounded-xl shadow-2xl flex flex-col w-5/12 p-4">
            <div className="flex justify-center items-center rounded-xl border-2 border-black m-2 bg-white w-1/3">
              <h1 className="text-3xl font-extrabold p-4 px-16">Profile</h1>
            </div>

            <div className="flex flex-col items-center rounded-xl border-2 border-black m-2 bg-white w-1/3s p-2">
              <h1 className="text-xl font-bold p-1 w-full">Your Name</h1>
              <p className="text-lg font-normal p-1 w-full">
                {localStorage.getItem("first_name") +
                  " " +
                  localStorage.getItem("last_name")}
              </p>
              <h1 className="text-xl font-bold p-1 w-full">Your Email</h1>
              <p className="text-lg font-normal p-1 w-full">
                {localStorage.getItem("email")}
              </p>
            </div>
            {localStorage.getItem("userType") == "tutor" && (
              <div className="flex flex-col items-center rounded-xl border-2 border-black m-2 bg-white w-1/3s p-2">
                <div className="justify-between flex w-full mb-2">
                  <h1 className="text-xl font-bold p-2">Description</h1>
                  <button
                    className={`rounded-3xl bg-${
                      isEditingDescription ? "primaryColor" : "secondaryColor"
                    } text-${
                      isEditingDescription ? "white" : "black"
                    } border border-black capitalize p-1 py-0.5 hover:bg-${
                      isEditingDescription ? "secondaryColor" : "primaryColor"
                    } hover:text-${isEditingDescription ? "black" : "white"}`}
                    onClick={
                      isEditingDescription
                        ? handleSaveDescription
                        : handleEditDescription
                    }
                  >
                    {isEditingDescription ? "Save" : "Edit"}
                  </button>
                </div>
                <div className="w-full bg-secondaryColor rounded-xl p-1">
                  <textarea
                    className="textarea textarea-bordered h-24 text-base w-full bg-secondaryColor border-none resize-none"
                    style={{ outline: "none" }}
                    placeholder="Write a description so students can know more about you."
                    value={description}
                    readOnly={!isEditingDescription}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}
          </div>
          <div className="rounded-xl shadow-2xl flex flex-col w-5/12 p-4">
            <div className="flex justify-center items-center rounded-xl border-2 border-black m-2 bg-white w-1/3">
              <h1 className="text-3xl font-extrabold p-4">Chats</h1>
            </div>
            <div className="p-2 rounded-xl my-2 border-2 border-black bg-secondaryColor">
              <h1 className="text-xl font-bold p-2">Chat preview</h1>
              <div className="my-2 flex flex-col overflow-y-auto max-h-96">
                {!isLoading
                  ? chats.map((chat, index) => (
                      <ChatCard
                        recipientId={
                          localStorage.getItem("userType") == "student"
                            ? chat.tutor_id
                            : chat.student_id
                        }
                        tutorName={`Tutor id ${chat.tutor_id}`}
                        message={"Lorem ipsum dolor sit amet"}
                        key={index}
                        index={index}
                        chatId={chat.id}
                      />
                    ))
                  : [...Array(5)].map((element, index) => (
                      <ChatCardSkeleton key={index} />
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
