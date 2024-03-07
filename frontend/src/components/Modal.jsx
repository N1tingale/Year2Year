import { RxAvatar, RxCross2 } from "react-icons/rx";
import { IoMdSend } from "react-icons/io";
import { useState, useEffect } from "react";
import io from "socket.io-client";

export default function Modal({ children, tutorName }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem("id");

  const socket = io("http://127.0.0.1:5001", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Socket connected");
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });

  useEffect(() => {
    socket.on("message", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    const chatId = 5;
    socket.emit("message", {
      chat_id: chatId,
      sender_id: userId,
      content: message,
      timestamp: new Date().toISOString(),
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender_id: userId,
        content: message,
      },
    ]);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div onClick={() => document.getElementById("my_modal_1").showModal()}>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-screen-lg mx-auto p-4">
          <div className="bg-primaryColor text-white p-4 flex justify-between rounded-2xl text-left text-3xl font-bold mb-4">
            {tutorName}
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">
                <RxCross2 className="w-6 h-6" />
              </button>
            </form>
          </div>

          <div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center chat ${
                  msg.sender_id === userId ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <RxAvatar className="w-12 h-12" />
                </div>
                <div
                  className={`chat-bubble bg-primaryColor ${
                    msg.sender_id != userId
                      ? "bg-white text-primaryColor"
                      : "bg-primaryColor text-white right-0"
                  }`}
                >
                  {msg.sender_id}: {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="relative w-full">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                type="text"
                placeholder="Write a message..."
                className="mt-4 text-white input input-bordered w-full max-w-screen-lg bg-primaryColor pr-12"
              />
              <button
                onClick={sendMessage}
                className="absolute right-2 top-2 h-full px-3 flex items-center text-white"
              >
                <IoMdSend className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </dialog>
      {children}
    </div>
  );
}
