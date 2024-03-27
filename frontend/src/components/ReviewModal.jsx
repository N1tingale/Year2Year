import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { IoIosChatboxes } from "react-icons/io";
import Modal from "./Modal";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import StarRating from "./StarRating";
import EditableStarRating from "./EditableStarRating";

export default function ReviewModal({ tutor, close, index }) {
  const [reviews, setReviews] = useState([]);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [overallRating, setOverallRating] = useState(0);
  const [rating, setRating] = useState(2.5);

  useEffect(() => {
    console.log("Fetching reviews");
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/get-reviews/${tutor.id}`
        );
        setReviews(response.data);
        console.log("Reviews", response.data);
        if (response.data.length > 0) {
          let totalRating = 0;
          response.data.forEach((review) => {
            totalRating += review.rating;
          });
          const averageRating = totalRating / response.data.length;
          const roundedRating = Math.round(averageRating * 2) / 2;
          setOverallRating(roundedRating);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [tutor.id, showWriteReview]);

  const submitReview = async (event) => {
    event.preventDefault();
    const description = document.getElementById("description").value;
    if (description === "") {
      toast.error("Please enter a review", {
        style: {
          background: "#ffeccc",
        },
      });
      return;
    }

    try {
      await axios.post(`http://127.0.0.1:5000/add-review`, {
        tutor_id: tutor.id,
        student_id: localStorage.getItem("id"),
        description: description,
        rating: rating,
      });
      setShowWriteReview(false);
      document.getElementById("description").value = "";
      setRating(2.5);
      console.log("Review submitted");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center z-20 justify-center bg-opacity-50 bg-black">
      <div className="modal-box max-w-screen-lg mx-auto p-4 rounded-2xl shadow-xl">
        <div className="sticky top-0 z-10 bg-primaryColor text-white p-4 flex justify-between rounded-xl">
          <h2 className="text-3xl font-bold">
            {tutor.first_name + " " + tutor.last_name}
          </h2>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={close}>
            <RxCross2 className="w-6 h-6" />
          </button>
        </div>
        <div className="bg-secondary rounded-b-2xl p-4 text-center">
          {!showWriteReview && (
            <>
              {reviews.length > 0 ? (
                <>
                  <h1 className="text-2xl font-bold">
                    Overall Rating:
                    <StarRating rating={overallRating} size={"large"} />
                  </h1>
                  {reviews.map((reviewItem, reviewIndex) => (
                    <div
                      key={reviewIndex}
                      className="bg-secondary p-2 bg-white w-4/5 mx-auto flex flex-col rounded-2xl my-4 text-center"
                    >
                      <div className="mb-2 font-semibold">
                        {reviewItem.student_name}
                      </div>
                      <div className="mb-1">
                        <StarRating rating={reviewItem.rating} />
                      </div>
                      <div className="mb-2">
                        <p className="text-lg text-gray-700">
                          {reviewItem.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <h1 className="text-center mt-4 text-xl">No reviews found</h1>
              )}
              <button
                className="btn text-base btn-primary mt-4"
                onClick={() => setShowWriteReview(true)}
              >
                Write A Review <FaStar />
              </button>
            </>
          )}
          {showWriteReview && (
            <form className="rounded px-8 pt-6 pb-6">
              <div className="mb-4">
                <div className="mb-4 text-xl font-bold">Rating:</div>
                <EditableStarRating
                  rating={rating}
                  setRating={setRating}
                  id="rating"
                />
              </div>
              <div className="mb-6">
                <div className="mb-4 text-xl font-bold">Review:</div>
                <textarea
                  className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
                  id="description"
                  name="description"
                  placeholder="Your review"
                ></textarea>
              </div>
              <div className="flex items-center justify-center gap-4 mx-auto">
                <button
                  className="btn bg-primaryColor items-center uppercase text-white font-semibold py-3 px-4 flex gap-2 rounded-lg focus:outline-none focus:shadow-outline"
                  onClick={submitReview}
                >
                  Submit <FaStar />
                </button>
                <button
                  className="btn bg-primaryColor items-center text-white font-semibold py-3 px-4 gap-2 flex uppercase rounded-lg focus:outline-none focus:shadow-outline"
                  onClick={() => setShowWriteReview(false)}
                >
                  Cancel <RxCross2 size={20} />
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="flex text-xl justify-center">
          <Modal
            recipientId={tutor.id}
            tutorName={`${tutor.first_name} ${tutor.last_name}`}
            index={index}
          >
            <button className="btn text-base btn-primary mt-4" onClick={close}>
              Contact <IoIosChatboxes size={20} />
            </button>
          </Modal>
        </div>
      </div>
    </div>
  );
}
