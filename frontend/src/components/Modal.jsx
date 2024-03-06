import { RxAvatar, RxCross2 } from "react-icons/rx";

export default function Modal({ children, tutorName }) {
  return (
    <button onClick={() => document.getElementById("my_modal_1").showModal()}>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box max-w-screen-lg mx-auto p-4">
          <div className="bg-primaryColor text-white p-4 flex justify-between rounded-2xl text-left text-3xl font-bold mb-4">
            {tutorName}
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">
                <RxCross2 className="w-6 h-6" />
              </button>
            </form>
          </div>
          <div className="chat chat-start">
            <div className="chat-image">
              <RxAvatar className="w-12 h-12" />
            </div>
            <div className="chat-bubble bg-primaryColor">Lorem ipsum</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <RxAvatar className="w-12 h-12" />
            </div>
            <div className="chat-bubble bg-primaryColor">Dolor sit amet</div>
          </div>
          <input
            type="text"
            placeholder="Write a message..."
            className="mt-4 text-white input input-bordered w-full max-w-screen-lg bg-primaryColor"
          />
          <div className="modal-action"></div>
        </div>
      </dialog>
      {children}
    </button>
  );
}
