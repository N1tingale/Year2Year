import axios from "axios";
import TutorReviewItem from "./TutorReviewItem";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams, useNavigate } from "react-router-dom";

export default function TutorReviews() {
  const { tutorId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [tutorDetails, setTutorDetails] = useState({});
  const [ableToReview, setAbleToReview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviewsAndTutorDetails = async () => {
      try {
        // Check user authentication
        if (!localStorage.getItem("id")) {
          console.log("User not logged in");
          navigate("/login");
          return;
        }

        // Check user type
        if (localStorage.getItem("userType") === "tutor") {
          console.log("Tutor trying to review another tutor");
          navigate("/profile");
          return;
        }

        // Fetch tutor details
        const tutorDetailsResponse = await axios.get(
          `http://127.0.0.1:5000/get-user-details/${tutorId}`
        );
        setTutorDetails(tutorDetailsResponse.data);

        // Fetch tutor reviews
        const reviewsResponse = await axios.get(
          `http://127.0.0.1:5000/get-reviews/${tutorId}`
        );
        setReviews(reviewsResponse.data);

        // Set ableToReview to true
        setAbleToReview(true);
      } catch (error) {
        console.error("Error fetching tutor reviews and details:", error);
        navigate("/profile");
      }
    };

    fetchReviewsAndTutorDetails();
  }, [tutorId, navigate]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-16 h-screen">
        {ableToReview ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center rounded-xl border-2 border-black m-2 bg-white">
              <h1 className="text-3xl font-extrabold p-4 px-16">
                {tutorDetails.full_name}'s Reviews
              </h1>
            </div>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <TutorReviewItem
                  key={index}
                  rating={review.rating}
                  description={review.description}
                />
              ))
            ) : (
              <h1 className="text-center mt-4 text-xl">No reviews found</h1>
            )}
          </div>
        ) : (
          <div>
            <h1>
              You are not able to review this tutor. You will be redirected
              shortly.
            </h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
