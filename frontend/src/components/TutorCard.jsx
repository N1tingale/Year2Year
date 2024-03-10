import { RxAvatar } from "react-icons/rx";
import { IoIosChatboxes } from "react-icons/io";
import Modal from "./Modal";

export default function TutorCard({ tutor, index }) {
  return (
    <div className="shadow-xl rounded-xl p-4">
      <div className="flex items-center">
        <RxAvatar size={50} />
        <p className="ml-4">
          {tutor.first_name} {tutor.last_name}
        </p>
      </div>

      <Modal tutorName={`${tutor.first_name} ${tutor.last_name}`} index={index}>
        <button className="btn btn-primary mt-4">
          Contact <IoIosChatboxes size={20} />
        </button>
      </Modal>
    </div>
  );
}
