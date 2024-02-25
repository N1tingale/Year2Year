export default function Input({
  type,
  name,
  placeholder,
  setState,
  onClick,
  register,
  validation,
  errorMessage,
  children,
}) {
  return (
    <>
      <label className="bg-primaryColor rounded-3xl input input-bordered flex items-center my-2 gap-2 pr-0">
        <input
          type={type}
          className="bg-primaryColor placeholder:text-gray-400 text-gray-200 rounded-3xl grow"
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
          {...register(name, validation)}
        />
        {children && (
          <button
            type="button"
            onClick={onClick}
            className=" bg-white w-1/4 rounded-3xl h-full flex items-center justify-center"
          >
            {children}
          </button>
        )}
      </label>
      {errorMessage && (
        <p className="text-red-500 text-xs mt-1 ml-2">{errorMessage}</p>
      )}
    </>
  );
}
