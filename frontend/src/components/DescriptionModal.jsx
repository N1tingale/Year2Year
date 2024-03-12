import { RxCross2 } from "react-icons/rx";

export default function DescriptionModal({
  tutorName,
  description,
  modules,
  close,
}) {
  return (
    <div className="fixed inset-0 flex items-center z-20 justify-center bg-opacity-50 bg-black">
      <div className="modal-box max-w-screen-lg mx-auto p-4 rounded-2xl shadow-xl">
        <div className="bg-primaryColor text-white p-4 flex justify-between rounded-xl text-left">
          <h2 className="text-3xl font-bold">{tutorName}</h2>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={close}>
            <RxCross2 className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-secondary p-4 text-center">
          <div className="mb-4">
            <p className="text-2xl font-bold">Description</p>
            <p className="text-lg mt-2 text-gray-700">{description}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">Modules</p>
            <p className="text-lg mt-2 text-gray-700">{modules.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
