import { RxAvatar } from "react-icons/rx";
import Modal from "./Modal";
export default function ChatCard({ tutorName, message }) {
  return (
    <div className="bg-white p-4 m-2 rounded-3xl border-2 border-black">
      <Modal tutorName={tutorName}>
        <div className="flex items-center">
          <RxAvatar className="w-12 h-12 mx-1" />
          <div>
            <h1 className="text-xl font-bold text-left">{tutorName}</h1>
            <p>{message}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}