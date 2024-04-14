import React, { useState, useEffect, useRef } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiCloseLine as RxCross2 } from "react-icons/ri";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatCard from "./ChatCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatCardSkeleton from "./ChatCardSkeleton";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const [isFooterRelative, setIsFooterRelative] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const [description, setDescription] = useState("");
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedModules, setSelectedModules] = useState([]);
  const [showModuleDropdown, setShowModuleDropdown] = useState(false);
  const [firstName, setFirstName] = useState(
    localStorage.getItem("first_name") || ""
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("last_name") || ""
  );
  const [email, setEmail] = useState("");
  const [lastMessages, setLastMessages] = useState([]);
  const [year, setYear] = useState("");

  let allowedModules = [
    "COMP12111",
    "COMP15111",
    "COMP13212",
    "COMP15212",
    "COMP16321",
    "COMP16412",
    "COMP11120",
    "COMP11212",
  ];

  useEffect(() => {
    const storedFirstName = localStorage.getItem("first_name") || "";
    const storedLastName = localStorage.getItem("last_name") || "";
    setFirstName(storedFirstName);
    setLastName(storedLastName);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("id") == null) {
      setTimeout(() => navigate("/login"), 2500);
    } else {
      setAuthenticated(true);
      if (localStorage.getItem("userType") === "tutor") {
        axios
          .get(
            `https://year2year.onrender.com:5000/tutors/${localStorage.getItem(
              "id"
            )}`
          )
          .then((res) => {
            setDescription(res.data.tutor.description || "");
            setSelectedModules(res.data.tutor.modules || []);
            setYear(res.data.tutor.year);
          })
          .catch((err) => console.log(err));
      }
    }
  }, []);

  useEffect(() => {
    axios
      .get("https://year2year.onrender.com:5000/get-chats", {
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

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        setIsFooterRelative(containerHeight > windowHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoading]);

  const handleEditDescription = () => {
    setIsEditingDescription(!isEditingDescription);
  };

  useEffect(() => {
    for (const chat of chats) {
      axios
        .get(`https://year2year.onrender.com:5000/get-messages/${chat.id}`)
        .then((response) => {
          if (response.data && response.data.messages.length > 0) {
            let content =
              response.data.messages[response.data.messages.length - 1].content;
            if (content.length > 40) {
              content = content.slice(0, 40) + "...";
            }
            setLastMessages((prev) => [...prev, content]);
          } else {
            setLastMessages((prev) => [...prev, ""]);
            console.error(`No messages found for chat with id ${chat.id}`);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [chats]);

  const handleSaveDescription = async () => {
    try {
      const res = await axios.post(
        `https://year2year.onrender.com:5000/edit-description`,
        {
          user_id: localStorage.getItem("id"),
          description: description,
        }
      );
      setIsEditingDescription(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveName = async () => {
    try {
      const new_first_name = firstName.trim();
      const new_last_name = lastName.trim();
      const nameRegex = /^[a-zA-Z\s-]+$/;
      if (
        !new_first_name.trim().match(nameRegex) ||
        !new_last_name.trim().match(nameRegex)
      ) {
        toast.error("Please enter a valid full name", {
          style: {
            background: "#ffeccc",
          },
        });
        setFirstName(localStorage.getItem("first_name"));
        setLastName(localStorage.getItem("last_name"));
        return;
      }

      await axios.post(`https://year2year.onrender.com:5000/edit-name`, {
        user_id: localStorage.getItem("id"),
        first_name: new_first_name,
        last_name: new_last_name,
      });
      localStorage.setItem("first_name", new_first_name);
      localStorage.setItem("last_name", new_last_name);
      setIsEditingName(false);
    } catch (err) {
      console.error(err);
    }
  };

  const addSelectedModule = async (module) => {
    if (selectedModules.includes(module)) {
      toast.error("You have already selected this module", {
        style: {
          background: "#ffeccc",
        },
      });
    } else {
      try {
        await axios.post("https://year2year.onrender.com:5000/edit-modules", {
          user_id: localStorage.getItem("id"),
          modules: [...selectedModules, module],
        });
        setSelectedModules((prevModules) => [...prevModules, module]);
      } catch (err) {
        console.error("Error adding module:", err);
      }
    }
    setShowModuleDropdown(false);
  };

  const removeSelectedModule = async (moduleToRemove) => {
    if (selectedModules.length === 1) {
      toast.error("You must have at least one module selected", {
        style: {
          background: "#ffeccc",
        },
      });
      return;
    }
    try {
      await axios.post("https://year2year.onrender.com:5000/edit-modules", {
        user_id: localStorage.getItem("id"),
        modules: selectedModules.filter((module) => module !== moduleToRemove),
      });

      setSelectedModules((prevModules) =>
        prevModules.filter((module) => module !== moduleToRemove)
      );
      setShowModuleDropdown(false);
    } catch (error) {
      console.error("Error removing module:", error);
    }
  };

  return (
    <>
      <Navbar />
      {authenticated ? (
        <div
          className="h-fit container mx-auto w-5/6 py-4 px-6"
          ref={containerRef}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl shadow-2xl p-4">
              <div className="inline-block rounded-xl border-2 border-black mb-2 bg-white">
                <h1 className="text-3xl font-extrabold p-4">Profile</h1>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h1 className="text-xl font-bold">Name</h1>
                  <button
                    className={`rounded-2xl ${
                      isEditingName
                        ? "bg-primary text-white"
                        : "bg-secondary text-black"
                    } border border-black px-3 py-1 capitalize hover:bg-${
                      isEditingName
                        ? "secondary hover:text-black"
                        : "primaryColor hover:text-white"
                    } `}
                    onClick={
                      isEditingName
                        ? () => {
                            handleSaveName();
                            setIsEditingName(false);
                          }
                        : () => setIsEditingName(true)
                    }
                  >
                    {isEditingName ? "Save" : "Edit"}
                  </button>
                </div>
                {isEditingName ? (
                  <div className="bg-secondary rounded-md flex items-center">
                    <input
                      type="text"
                      id="first_name"
                      className="w-full p-2 bg-white rounded-l-md border-none focus:bg-secondary"
                      value={firstName}
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      type="text"
                      id="last_name"
                      className="w-full p-2 bg-white rounded-r-md border-l-2 focus:bg-secondary"
                      value={lastName}
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="bg-secondary rounded-md flex items-center">
                    <p className="w-full p-2 bg-secondary rounded-xl border-none focus:outline-none">
                      {`${firstName} ${lastName}`}
                    </p>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <h1 className="text-xl font-bold">Email</h1>
                <p className="bg-secondary p-2 rounded-md">
                  {localStorage.getItem("email")}
                </p>
              </div>

              {localStorage.getItem("userType") === "tutor" && (
                <div className="mb-4">
                  <h1 className="text-xl font-bold">Year</h1>
                  <p className="bg-secondary p-2 rounded-md">{year}</p>
                </div>
              )}

              {localStorage.getItem("userType") === "tutor" && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h1 className="text-xl font-bold">Description</h1>
                    <button
                      className={`rounded-2xl ${
                        isEditingDescription
                          ? "bg-primary text-white"
                          : "bg-secondary text-black"
                      } border border-black px-3 py-1 capitalize hover:bg-${
                        isEditingDescription
                          ? "secondary hover:text-black"
                          : "primaryColor hover:text-white"
                      } `}
                      onClick={
                        isEditingDescription
                          ? handleSaveDescription
                          : handleEditDescription
                      }
                    >
                      {isEditingDescription ? "Save" : "Edit"}
                    </button>
                  </div>
                  <div
                    className={`rounded-md ${
                      isEditingDescription ? "bg-white" : "bg-secondary"
                    }`}
                  >
                    <textarea
                      className={`w-full p-2 rounded-xl border-none resize-none focus:outline-none ${
                        isEditingDescription ? "bg-white" : "bg-secondary"
                      }`}
                      placeholder="Write a description so students can know more about you."
                      value={description}
                      readOnly={!isEditingDescription}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              )}

              {localStorage.getItem("userType") === "tutor" && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h1 className="text-xl font-bold">Modules</h1>
                  </div>
                  <div className="bg-secondary rounded-md p-2">
                    {selectedModules.length > 0 && (
                      <div className="flex flex-wrap">
                        {selectedModules.map((module) => (
                          <div
                            key={module}
                            className="bg-white text-primary rounded-md m-1 p-2"
                          >
                            {module}
                            <button
                              type="button"
                              onClick={() => removeSelectedModule(module)}
                              className="text-red-500 ml-1 hover:text-red-700"
                            >
                              &#10006;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="p-2 relative">
                      <input
                        id="modules"
                        name="modules"
                        type="text"
                        placeholder="Modules"
                        className="w-full p-3 rounded-3xl bg-primaryColor text-white"
                        readOnly
                        onClick={() =>
                          setShowModuleDropdown(!showModuleDropdown)
                        }
                      />
                      {showModuleDropdown && (
                        <div className="absolute bottom-full left-0 bg-white border rounded-md">
                          {allowedModules.map((module) => (
                            <div
                              key={module}
                              className="p-2 w-80 cursor-pointer hover:bg-secondary"
                              onClick={() => addSelectedModule(module)}
                            >
                              {module}
                            </div>
                          ))}
                        </div>
                      )}
                      {!showModuleDropdown ? (
                        <RiArrowDropDownLine
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white h-6 w-6 cursor-pointer"
                          onClick={() =>
                            setShowModuleDropdown(!showModuleDropdown)
                          }
                        />
                      ) : (
                        <RxCross2
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white h-6 w-6 cursor-pointer"
                          onClick={() =>
                            setShowModuleDropdown(!showModuleDropdown)
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-xl shadow-2xl p-4">
              <div className="inline-block rounded-xl border-2 border-black mb-2 bg-white">
                <h1 className="text-3xl font-extrabold p-4">Chats</h1>
              </div>

              <div className="p-2 rounded-md my-2 border-2 border-black bg-secondary">
                <h1 className="text-xl font-bold mb-2">Chat preview</h1>
                <div className="flex flex-col overflow-y-auto max-h-96">
                  {!isLoading
                    ? chats.map((chat, index) => (
                        <ChatCard
                          recipientId={
                            localStorage.getItem("userType") === "student"
                              ? chat.tutor_id
                              : chat.student_id
                          }
                          message={lastMessages[index]}
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
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          You have to be authenticated to view the profile page, redirecting to
          login...
        </div>
      )}
      <Footer
        relative={
          localStorage.getItem("userType") == "tutor" ? true : isFooterRelative
        }
      />
    </>
  );
}
