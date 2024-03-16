import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosChatboxes } from "react-icons/io";
import Modal from "./Modal";

export default function DescriptionModal({ tutor, close, index }) {
  const [descriptionText, setDescriptionText] = useState(tutor.description);
  useEffect(() => {
    if (descriptionText === "") {
      setDescriptionText("There is no description available for this tutor.");
    }
  }, [tutor.description]);
  return (
    <div className="fixed inset-0 flex items-center z-20 justify-center bg-opacity-50 bg-black">
      <div className="modal-box max-w-screen-lg mx-auto p-4 rounded-2xl shadow-xl">
        <div className="bg-primaryColor text-white p-4 flex justify-between rounded-xl text-left">
          <h2 className="text-3xl font-bold">
            {tutor.first_name + " " + tutor.last_name}
          </h2>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={close}>
            <RxCross2 className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-secondary p-4 text-center">
          <div className="mb-4">
            <p className="text-2xl font-bold">Year</p>
            <p className="text-lg mt-2 text-gray-700">{tutor.year}</p>
          </div>
          <div className="mb-4">
            <p className="text-2xl font-bold">Description</p>
            <p className="text-lg mt-2 text-gray-700">{descriptionText}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">Modules</p>
            <p className="text-lg mt-2 text-gray-700">
              {tutor.modules.join(", ")}
            </p>
          </div>
          <div className="flex text-xl justify-center">
            <Modal
              recipientId={tutor.id}
              tutorName={`${tutor.first_name} ${tutor.last_name}`}
              index={index}
            >
              <button
                className="btn text-base btn-primary mt-4"
                onClick={close}
              >
                Contact <IoIosChatboxes size={20} />
              </button>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
