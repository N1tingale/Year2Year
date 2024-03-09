import { RxAvatar, RxCross2 } from "react-icons/rx";
import { IoMdSend } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

export default function Modal({ children, tutorName, index }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");
  const [chatId, setChatId] = useState(1);

  const socketRef = useRef();

  // Runs once when the element is instantiated, to prevent constantly reconnecting to the socket
  useEffect(() => {
    socketRef.current = io("http://127.0.0.1:5000", {
      withCredentials: true,
    });
    socketRef.current.on("connect", () => {
      console.log("Socket connected");
    });

    // Sets up message listening when the component is mounted
    if (socketRef.current) {
      socketRef.current.on("message", (data) => {
        console.log("Incoming message: ", data);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      socketRef.current.on("chat", (data) => {
        console.log("Incoming chat request", data);
      });
    }

    fetchMessages();
  }, []);

  // Fetches messages from the backend to display chat history
  const fetchMessages = () => {
    axios
      .get(`http://127.0.0.1:5000/get-messages/${chatId}`)
      .then((response) => {
        if (response.data) {
          setMessages(response.data.messages);
        } else {
          console.error("Invalid response format:", response);
        }
      })
      .catch((error) => console.error("Error fetching messages:", error));
  };

  // This function should emit a chat request based on the sender and recipient id
  const connectToChat = () => {
    // The value is hardcoded to be 2 for now, but should be fetched at some point from the backend
    const recipientId = 2;

    socketRef.current.emit("chat", {
      student_id: userType === "student" ? userId : recipientId,
      tutor_id: userType === "tutor" ? userId : recipientId,
    });
  };

  // Send message function, emits a message to the backend and updates the frontend UI
  const sendMessage = () => {
    if (message.length == 0) {
      return;
    }
    const current_timestamp = new Date().toISOString();
    socketRef.current.emit("message", {
      chat_id: chatId,
      sender_id: userId,
      content: message,
      timestamp: current_timestamp,
    });
    console.log("Message sent:", {
      chat_id: chatId,
      sender_id: userId,
      content: message,
      timestamp: current_timestamp,
    });
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender_id: userId,
        content: message,
        timestamp: current_timestamp,
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
        document.getElementById(`my_modal_${index}`).showModal();
        connectToChat();
      }}
    >
      <dialog id={`my_modal_${index}`} className="modal">
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
                className={`chat ${msg.sender_id === userId ? "chat-end" : "chat-start"
                  }`}
              >
                <div className="chat-image avatar">
                  <RxAvatar size={45} />
                </div>
                <div className="chat-header">Sender id: {msg.sender_id}</div>
                <div
                  className={`chat-bubble ${msg.sender_id === userId
                      ? "bg-primaryColor text-white"
                      : "bg-white text-primaryColor"
                    }`}
                >
                  {msg.content}
                </div>
                <time className="text-xs opacity-50">
                  {new Date(msg.timestamp.slice(0, -3)).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>
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
