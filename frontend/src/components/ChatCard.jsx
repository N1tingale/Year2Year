export default function ChatCard({ tutorName, message }) {
  return (
    <div className="bg-white p-4 m-2 rounded-3xl border-2 border-black">
      <h1 className="text-xl font-bold">{tutorName}</h1>
      <p>{message}</p>
    </div>
  );
}
