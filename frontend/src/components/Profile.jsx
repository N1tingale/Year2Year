import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatCard from "./ChatCard";
export default function Profile() {
  return (
    <>
      <Navbar />
      <div className="w-2/3 mx-auto mt-2 rounded-xl flex justify-between">
        <div className="rounded-xl shadow-2xl flex items-center justify-center">
          Profile goes here
        </div>
        <div className="rounded-xl shadow-2xl flex flex-col w-5/12 p-4">
          <div className="flex justify-center items-center rounded-xl border-2 border-black m-2 bg-white w-1/3">
            <h1 className="text-3xl font-extrabold p-4">Chats</h1>
          </div>
          <div className="p-2 rounded-xl my-2 border-2 border-black bg-secondaryColor">
            <h1 className="text-xl font-bold p-2">Chat preview</h1>
            <div className="my-2 flex flex-col">
              <ChatCard
                tutorName={"Tutor 1"}
                message={"Lorem ipsum dolor sit amet"}
              />
              <ChatCard
                tutorName={"Tutor 2"}
                message={"Lorem ipsum dolor sit amet"}
              />
              <ChatCard
                tutorName={"Tutor 3"}
                message={"Lorem ipsum dolor sit amet"}
              />
              <ChatCard
                tutorName={"Tutor 4"}
                message={"Lorem ipsum dolor sit amet"}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
