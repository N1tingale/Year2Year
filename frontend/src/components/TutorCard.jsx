import React, { useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { IoIosChatboxes } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import Modal from "./Modal";
import DescriptionModal from "./DescriptionModal";

export default function TutorCard({ tutor, index }) {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  return (
    <div className="shadow-2xl rounded-xl p-4">
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

      <button
        className="btn btn-primary mt-4"
        onClick={() => {
          setShowDescriptionModal(!showDescriptionModal);
          console.log(showDescriptionModal);
        }}
      >
        View Description <FaInfoCircle size={20} />
      </button>

      {showDescriptionModal && (
        <DescriptionModal
          tutorName={`${tutor.first_name} ${tutor.last_name}`}
          modules={tutor.modules}
          description={tutor.description}
          close={() => setShowDescriptionModal(!showDescriptionModal)}
        ></DescriptionModal>
      )}
    </div>
  );
}
