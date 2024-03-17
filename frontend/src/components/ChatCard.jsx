import { RxAvatar } from "react-icons/rx";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import axios from "axios";
export default function ChatCard({ message, index, recipientId, chatId }) {
  const [recipientName, setRecipientName] = useState("");
  const [recipientImage, setRecipientImage] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const response = await axios
        .get(`http://127.0.0.1:5000/get-user-details/${recipientId}`)
        .catch((error) => {
          console.error("Error fetching user details");
        });
      setRecipientName(response.data.full_name);
      setRecipientImage(response.data.image);
    };
    fetchUserName();
  }, [recipientId]);
  return (
    <div className="bg-white p-4 m-2 rounded-3xl border-2 border-black hover:cursor-pointer hover:bg-gray-200">
      <Modal
        chId={chatId}
        recipientId={recipientId}
        recipientName={recipientName}
        recipientImage={recipientImage}
        key={index}
        index={index}
      >
        <div className="flex items-center">
          <RxAvatar className="w-12 h-12" />
          <div>
            <h1 className="text-xl font-bold text-left">{recipientName}</h1>
            <p>{message}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
