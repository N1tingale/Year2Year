import React, { useState } from "react";
import { IoIosChatboxes } from "react-icons/io";
import { FaInfoCircle, FaStar } from "react-icons/fa";
import Modal from "./Modal";
import DescriptionModal from "./DescriptionModal";
import ReviewModal from "./ReviewModal";

export default function TutorCard({ tutor, index }) {
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  return (
    <div className="shadow-2xl rounded-xl p-4">
      <div className="flex items-center mb-4">
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
        <p className="ml-4 font-semibold text-lg">
          {tutor.first_name} {tutor.last_name}
        </p>
      </div>

      <div className="flex flex-col space-y-4">
        <Modal
          recipientId={tutor.id}
          recipientName={`${tutor.first_name} ${tutor.last_name}`}
          recipientProfileColour={tutor.profile_colour}
          index={index}
        >
          <button className="btn btn-primary">
            <IoIosChatboxes className="mr-2" size={20} />
            Contact
          </button>
        </Modal>

        <button
          className="btn btn-primary"
          onClick={() => setShowDescriptionModal(!showDescriptionModal)}
        >
          <FaInfoCircle className="mr-2" size={20} />
          Description
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setShowReviewModal(!showReviewModal)}
        >
          <FaStar className="mr-2" size={20} />
          Reviews
        </button>
      </div>

      {showDescriptionModal && (
        <DescriptionModal
          tutor={tutor}
          index={index}
          close={() => setShowDescriptionModal(false)}
        />
      )}

      {showReviewModal && (
        <ReviewModal
          tutor={tutor}
          index={index}
          close={() => setShowReviewModal(false)}
        />
      )}
    </div>
  );
}
