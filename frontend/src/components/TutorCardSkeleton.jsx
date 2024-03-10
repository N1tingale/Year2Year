import { RxAvatar } from "react-icons/rx";
import { IoIosChatboxes } from "react-icons/io";

export default function TutorCardSkeleton() {
  return (
    <div className="shadow-xl rounded-xl p-4 animate-pulse bg-gray-300">
      <div className="flex items-center">
        <RxAvatar size={50} />
        <div className="ml-4 skeleton h-8 w-28 bg-gray-300 rounded"></div>
      </div>

      <button className="btn btn-primary mt-4 opacity-50 text-gray-400 bg-gray-400 border-gray-400 cursor-not-allowed">
        Contact
      </button>
    </div>
  );
}
