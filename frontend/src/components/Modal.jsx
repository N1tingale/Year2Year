import { RxAvatar, RxCross2 } from "react-icons/rx";
import { IoMdSend } from "react-icons/io";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { GoReport } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export default function Modal({
  children,
  recipientName,
  index,
  recipientId,
  recipientProfileColour,
  chId,
}) {
  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);

    let day;
    if (date.toDateString() === today.toDateString()) {
      day = "";
    } else if (date.toDateString() === yesterday.toDateString()) {
      day = "Yesterday, ";
    } else if (date.getTime() >= oneWeekAgo.getTime()) {
      day = date.toLocaleDateString("en-US", { weekday: "long" }) + ", ";
    } else {
      day = date.toLocaleDateString() + ", ";
    }

    const time = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day}${time}`;
  }

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");
  const userProfileColour = localStorage.getItem("profile_colour");
  const [chatId, setChatId] = useState(chId);
  const navigate = useNavigate();
  

  const endOfMessagesRef = useRef(null);
  const socketRef = useRef();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
        if (data.sender_id != userId) {
          setMessages((prevMessages) => [...prevMessages, data]);
        }
      });

      socketRef.current.on("chat", (data) => {
        console.log("Incoming chat request", data);
        setChatId(data.chat_id);
        fetchMessages(data.chat_id);
      });
    }

    if (chatId) {
      fetchMessages(chatId);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Fetches messages from the backend to display chat history
  const fetchMessages = (chatId) => {
    axios
      .get(`http://127.0.0.1:5000/get-messages/${chatId}`)
      .then((response) => {
        if (response.data) {
          console.log("Messages fetched:", response.data);
          setMessages(response.data.messages);
        } else {
          console.error("Invalid response format:", response);
        }
      })
      .catch((error) => console.error("Error fetching messages:", error));
  };

  // This function should emit a chat request based on the sender and recipient id
  const connectToChat = () => {
    socketRef.current.emit("chat", {
      student_id: userType == "student" ? userId : recipientId,
      tutor_id: userType == "tutor" ? userId : recipientId,
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
      recipient_id: recipientId,
      sender_type: userType,
      content: message,
      timestamp: current_timestamp,
    });
    console.log("Message sent:", {
      chat_id: chatId,
      sender_id: userId,
      recipient_id: recipientId,
      sender_type: userType,
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

  const launchReport = () => {
    navigate("/report-user/" + recipientId);
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
          <div className="sticky top-0 z-10">
            <div className="bg-primaryColor text-white p-4 flex justify-between rounded-2xl text-left text-3xl font-bold mb-4">
              {recipientName}
              <div className="flex items-center gap-8">
                <button onClick={launchReport}>
                  <GoReport className="w-6 h-6 hover:text-red-500" />
                </button>
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost">
                    <RxCross2 className="w-6 h-6" />
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div ref={chatContainerRef} className="chat-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat ${
                  msg.sender_id == userId ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-2"
                    style={{
                      backgroundColor:
                        msg.sender_id == userId
                          ? userProfileColour
                          : recipientProfileColour,
                      borderRadius: "50%",
                      minWidth: "48px",
                      minHeight: "48px",
                    }}
                  >
                    <span
                      className="text-white text-lg font-bold flex items-center justify-center"
                      style={{ width: "100%", height: "100%" }}
                    >
                      {msg.sender_id == userId
                        ? localStorage.getItem("first_name")?.[0]?.toUpperCase()
                        : recipientName?.[0]?.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="chat-header">
                  <time className="text-xs opacity-50 mx-1">
                    {formatDate(msg.timestamp)}
                  </time>
                </div>
                <div
                  className={`chat-bubble ${
                    msg.sender_id == userId
                      ? "bg-primaryColor text-white"
                      : "bg-white text-primaryColor"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div ref={endOfMessagesRef} className="sticky bottom-0 z-10">
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
        </div>
      </dialog>
      {children}
    </div>
  );
}
