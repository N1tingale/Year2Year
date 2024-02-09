export default function Card({ title, text }) {
  return (
    <div className="card bg-base-100 mx-4 shadow-xl outline outline-2 outline-primary">
      <div className="card-body p-6">
        <p className="text-2xl font-bold whitespace-nowrap">
          <p className="font-extrabold">{title}</p>
          {text}
        </p>
      </div>
    </div>
  );
}
