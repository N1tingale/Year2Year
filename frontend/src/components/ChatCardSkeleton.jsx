import { RxAvatar } from "react-icons/rx";
import Modal from "./Modal";
export default function ChatCardSkeleton() {
  return (
    <div className="bg-gray-300 animate-pulse p-4 m-2 rounded-3xl border hover:cursor-pointer">
      <div className="flex items-center">
        <RxAvatar className="w-12 h-12 mx-1" />
        <div>
          <h1 className=" bg-gray-400 p-3 rounded-3xl text-xl font-bold text-left">
            Loading...
          </h1>
        </div>
      </div>
    </div>
  );
}
