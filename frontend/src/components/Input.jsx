export default function Input(props) {
  return (
    <label className="bg-primaryColor rounded-3xl input input-bordered flex items-center my-2 gap-2 pr-0">
      <input
        type={props.type}
        className="bg-primaryColor placeholder:text-gray-400 text-gray-200 rounded-3xl grow"
        placeholder={props.placeholder}
        onChange={(e) => props.setState(e.target.value)}
      />
      {props.children && (
        <button
          onClick={props.onClick}
          className=" bg-white w-1/4 rounded-3xl h-full flex items-center justify-center"
        >
          {props.children}
        </button>
      )}
    </label>
  );
}
