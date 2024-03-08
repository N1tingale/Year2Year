import { RxAvatar, RxCross2 } from "react-icons/rx";
import { IoMdSend } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

export default function Modal({ children, tutorName, key }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem("id");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io("http://127.0.0.1:5000", {
      withCredentials: true,
    });
    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });
  }, []);

  if (socketRef.current != undefined) {
    socketRef.current.on("message", (data) => {
      console.log(data);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    socketRef.current.on("chat", (data) => {
      console.log(data);
    });
  }

  const connectToChat = () => {
    socketRef.current.emit("chat", {
      student_id: userId,
      tutor_id: 1,
    });
  };

  const sendMessage = () => {
    if (message.length == 0) {
      return;
    }
    const chatId = 5;
    socketRef.current.emit("message", {
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
    <div
      onClick={() => {
        document.getElementById(`my_modal_${key}`).showModal();
        connectToChat();
      }}
    >
      <dialog id={`my_modal_${key}`} className="modal">
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
                className={`chat ${
                  msg.sender_id === userId ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <RxAvatar size={45} />
                </div>
                <div className="chat-header">Sender id: {msg.sender_id}</div>
                <div
                  className={`chat-bubble bg-primaryColor ${
                    msg.sender_id != userId
                      ? "bg-white text-primaryColor"
                      : "bg-primaryColor text-white"
                  }`}
                >
                  {msg.content}
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
