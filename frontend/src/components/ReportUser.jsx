import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function ReportUser() {
  const navigate = useNavigate();
  const { idBeingReported } = useParams();
  const [ableToReport, setAbleToReport] = useState(false);
  const [reportedName, setReportedName] = useState("");

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        if (!localStorage.getItem("id")) {
          console.log("User not logged in");
          navigate("/login");
          return;
        }

        if (localStorage.getItem("id") === idBeingReported) {
          console.log("User trying to report themselves");
          navigate("/profile");
          return;
        }

        const response = await axios
          .get(`http://127.0.0.1:5000/get-user-details/${idBeingReported}`)
          .catch((error) => {
            console.error("Error fetching user type:", error);
            navigate("/profile");
          });
        const userType = response.data.user_type;
        setReportedName(response.data.full_name);

        if (userType === localStorage.getItem("userType")) {
          console.log("User trying to report user of same type");
          navigate("/profile");
          return;
        }
        setAbleToReport(true);
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    };

    fetchUserType();
  }, [idBeingReported, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const type = event.target.type.value;
    const description = event.target.description.value;

    try {
      const res = await axios.post(`http://127.0.0.1:5000/create-report`, {
        student_id:
          localStorage.getItem("userType") === "student"
            ? localStorage.getItem("id")
            : idBeingReported,
        tutor_id:
          localStorage.getItem("userType") === "tutor"
            ? localStorage.getItem("id")
            : idBeingReported,
        user_reported: idBeingReported,
        report_type: type,
        description: description,
      });
      alert(
        "Report submitted successfully. We will review it shortly and make a decision regarding this user's account."
      );
      setTimeout(() => navigate("/profile"), 1000);
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-16 h-screen">
        {ableToReport ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center rounded-xl border-2 border-black m-2 bg-white">
              <h1 className="text-3xl font-extrabold p-4 px-16">
                Report {reportedName} (#{idBeingReported})
              </h1>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label htmlFor="reason">Reason for reporting:</label>
              <select
                id="type"
                name="reason"
                required
                className="bg-white py-4 rounded-lg border-2 px-2 border-primaryColor"
              >
                <option value="Spam">Spam</option>
                <option value="Inappropriate">Inappropriate</option>
                <option value="Other">Other</option>
              </select>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                className="resize-none border-2 border-primaryColor rounded-md p-2"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-primaryColor text-white p-2 rounded-3xl hover:bg-white hover:text-primaryColor hover:border-primaryColor border-2"
              >
                Report
              </button>
            </form>
          </div>
        ) : (
          <h1>
            You are not allowed to report this user. You will be redirected
            shortly.
          </h1>
        )}
      </div>
    </>
  );
}
