import Navbar from "./Navbar";
export default function Profile() {
  return (
    <>
      <Navbar />
      <h1 className="text-2xl font-semibold">Profile</h1>
      <h1 className="text-xl font-normal">Profile data: </h1>
      <h1 className="text-xl font-normal">First name: {localStorage.getItem("first_name")}</h1>
      <h1 className="text-xl font-normal">Last name: {localStorage.getItem("last_name")}</h1>
      <h1 className="text-xl font-normal">Email: {localStorage.getItem("email")}</h1>
      <h1 className="text-xl font-normal">Verified: {localStorage.getItem("emailVerified")}</h1>
    </>
  );
}
