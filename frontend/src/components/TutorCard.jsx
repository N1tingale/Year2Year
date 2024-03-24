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
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mr-2"
          style={{
            backgroundColor: tutor.profile_colour,
            borderRadius: "50%",
            minWidth: "48px",
            minHeight: "48px",
          }}
        >
          <span className="text-white text-lg font-bold">
            {tutor.first_name[0]}
          </span>
        </div>
        <p className="ml-4">
          {tutor.first_name} {tutor.last_name}
        </p>
      </div>

      <Modal
        recipientId={tutor.id}
        recipientName={`${tutor.first_name} ${tutor.last_name}`}
        recipientProfileColour={tutor.profile_colour}
        index={index}
      >
        <button className="btn btn-primary mt-4">
          Contact <IoIosChatboxes size={20} />
        </button>
      </Modal>

      <button
        className="btn btn-primary mt-4"
        onClick={() => {
          setShowDescriptionModal(!showDescriptionModal);
        }}
      >
        Description <FaInfoCircle size={20} />
      </button>

      {showDescriptionModal && (
        <DescriptionModal
          tutor={tutor}
          index={index}
          close={() => setShowDescriptionModal(!showDescriptionModal)}
        />
      )}
    </div>
  );
}
